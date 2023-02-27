import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Languages, WorkType} from "@shared/types/search-params.dto.interface";

@Component({
  selector: 'gh-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.less']
})
export class SearchFormComponent {
  readonly WorkType = WorkType;
  readonly languagesNames = Object.values(Languages);

  readonly pluralize = {
    other: '$',
  };

  form = new FormGroup({
    search: new FormControl(``, Validators.required),
    rateRange: new FormControl([1, 1]),
    networkSize: new FormControl(1),
    relationTypes: new FormControl([]),
    experience: new FormControl(),
    languages: new FormControl(),
    workType: new FormControl(`${WorkType.Office}`)
  });

  constructor() {
  }

  resetForm(): void {
    this.form.reset({
      search: '',
      rateRange: [1, 1],
      networkSize: 1,
      relationTypes: [],
      experience: 0,
      languages: [],
      workType: `${WorkType.Office}`
    });
  }

}
