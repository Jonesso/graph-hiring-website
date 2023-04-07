import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Languages, WorkType } from '@shared/types/search/search-params.dto.interface';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { RelationType } from '@shared/types/relations/relation-type.enum';
import { debounceTime, map, takeUntil } from 'rxjs';
import { filter } from 'rxjs/operators';
import { SearchParamsService } from '@modules/search/search-params/search-params.service';
import { FORM_DEBOUNCE_TIME } from '@shared/constants';
import { ProfileService } from '@modules/profile/profile.service';
import { RelationsService } from '@modules/search/relations.service';

@Component({
  selector: 'gh-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TuiDestroyService]
})
export class SearchFormComponent implements OnInit {
  readonly WorkType = WorkType;
  readonly languagesNames = Object.values(Languages);
  readonly RelationType = RelationType;

  readonly pluralize = {
    other: '$',
  };

  form = new FormGroup({
    search: new FormControl('', Validators.required),
    rateRange: new FormControl([1, 1000]),
    networkSize: new FormControl(1),
    relationTypes: new FormControl([]),
    experience: new FormControl(),
    languages: new FormControl([Languages.English]),
    workType: new FormControl(`${WorkType.Onsite}`)
  });

  constructor(
    public readonly profile: ProfileService,
    public readonly relations: RelationsService,
    private readonly searchParams: SearchParamsService,
    private readonly destroy$: TuiDestroyService) {
  }

  ngOnInit() {
    this.resetForm();

    this.form.valueChanges.pipe(
      filter(() => this.form.valid),
      debounceTime(FORM_DEBOUNCE_TIME),
      map(formValue => ({
        search: formValue.search,
        rateRange: formValue.rateRange,
        networkSize: formValue.networkSize,
        relationTypes: formValue.relationTypes,
        experience: formValue.experience,
        languages: formValue.languages,
        workType: formValue.workType
      })),
      takeUntil(this.destroy$)
    ).subscribe(val => this.searchParams.patch(val));
  }

  resetForm(): void {
    this.form.reset({
      search: '',
      rateRange: [1, 1000],
      networkSize: 1,
      relationTypes: [],
      experience: 0,
      languages: [Languages.English],
      workType: `${WorkType.Onsite}`
    });
  }

  patchNetworkSizeValue(newValue: number): void {
    this.form.get('networkSize')?.patchValue(newValue);
  }
}
