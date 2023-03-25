import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { TuiDay, TuiDayRange, TuiDestroyService } from '@taiga-ui/cdk';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RelationType } from '@shared/types/relations/relation-type.enum';
import { IRelationRequestUserDto } from '@shared/types/relations/relation-request-user.dto.interface';
import { IRelationshipDto } from '@shared/types/relations/relationship.dto.interface';
import { Subject } from 'rxjs';
import { ICreateRelationDto } from '@shared/types/relations/create-relation.dto.interface';
import { IRelation } from '@shared/types/relations/relation.interface';
import { DEFAULT_AVATAR_URL } from '@shared/constants';
import { CdkScrollable } from '@angular/cdk/overlay';

@Component({
  selector: 'gh-relations',
  templateUrl: './relations.component.html',
  styleUrls: ['./relations.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TuiDestroyService],
})
export class RelationsComponent implements OnInit {
  RelationType = RelationType;
  DEFAULT_AVATAR_URL = DEFAULT_AVATAR_URL;

  periodControl = new FormControl(null);

  form = new FormGroup({
    type: new FormControl(null, Validators.required),
    startAt: new FormControl(null, Validators.required),
    endAt: new FormControl(null),
    description: new FormControl(''),
    comment: new FormControl('')
  });

  @Input() fromUser!: IRelationRequestUserDto;
  @Input() toUser!: IRelationRequestUserDto;
  @Input() @HostBinding('class.show-form') showForm = false;
  @Input() showComment = true;

  @Input() set disabled(isDisabled: boolean) {
    if (isDisabled) {
      this.form.disable();
      this.periodControl.disable();
    } else {
      this.form.enable();
      this.periodControl.enable();
    }
  }

  _selectedRelationId?: string;
  @Input() set selectedRelationId(relationId: string | undefined) {
    this._selectedRelationId = relationId;
    this.updateFormWithSelectedRelation();
  }

  private _relations: IRelationshipDto[] = [];
  @Input() set relations(newRequests: IRelationshipDto[]) {
    this._relations = newRequests;
    this.updateFormWithSelectedRelation();
  }

  get relations(): IRelationshipDto[] {
    return this._relations;
  }

  @Output() readonly formSubmit = new Subject<ICreateRelationDto>();
  @Output() readonly relationSelect = new EventEmitter<IRelationshipDto>();

  @ViewChild('arrowsWrapper', {read: CdkScrollable, static: true}) arrowsWrapper: CdkScrollable | null = null;

  ngOnInit() {
    if (this.showForm) {
      this.patchFormDatesIntoPeriodControl();
    }
  }

  onRelationSelect(request: IRelationshipDto, arrowWrapperEl: HTMLElement): void {
    this.form.reset(request, {emitEvent: false});
    this.relationSelect.next(request);

    this.patchFormDatesIntoPeriodControl();

    if (!this.arrowsWrapper) {
      console.error('Something went wrong: can not scroll to clicked relation');
    } else {
      this.arrowsWrapper.scrollTo({
        top: arrowWrapperEl.offsetTop + arrowWrapperEl.offsetHeight / 2 - (arrowWrapperEl.parentElement?.offsetHeight || 0) / 2,
        behavior: 'smooth'
      });
    }
  }

  onSubmit(): void {
    this.patchDateRangeIntoForm();

    if (this.toUser) {
      this.formSubmit.next({
        ...(this.form.value as IRelation),
        fromUserId: this.fromUser.id,
        toUserId: this.toUser.id,
      });
    }
  }

  private updateFormWithSelectedRelation(): void {
    const selectedRequest = this._relations.find(rel => rel.id === this._selectedRelationId);
    if (selectedRequest) {
      this.form.reset(selectedRequest, {emitEvent: false});
    }
  }

  patchDateRangeIntoForm(): void {
    const periodControlObject = JSON.parse(JSON.stringify(this.periodControl.value));
    const fromValue = periodControlObject.from;
    const toValue = periodControlObject.to;

    this.form.patchValue({
      startAt: fromValue,
      endAt: toValue,
    });
  }

  patchFormDatesIntoPeriodControl(): void {
    const formValues = this.form.value;
    const fromValue = formValues.startAt;
    const toValue = formValues.endAt;

    this.periodControl.patchValue(new TuiDayRange(TuiDay.jsonParse(fromValue), TuiDay.jsonParse(toValue)));
  }
}
