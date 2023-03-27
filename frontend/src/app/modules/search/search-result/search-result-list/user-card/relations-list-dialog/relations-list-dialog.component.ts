import { ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { IRelationshipDto } from '@shared/types/relations/relationship.dto.interface';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { TuiDialogContext } from '@taiga-ui/core';
import { RelationsComponent } from '@shared/components/relations/relations.component';
import { TuiDestroyService, TuiValidationError } from '@taiga-ui/cdk';
import { RelationsFacade } from '@shared/components/relations/relations.facade';
import { combineLatest, debounceTime, map, Observable, switchMap, take, takeUntil, tap } from 'rxjs';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { isNotNil } from '@shared/utils/is-not-nil/is-not-nil';
import { ICreateRelationDto } from '@shared/types/relations/create-relation.dto.interface';
import { RelationsService } from '@modules/search/relations.service';
import { IRelationRequestUserDto } from '@shared/types/relations/relation-request-user.dto.interface';

export interface IRelationsListDialogData {
  fromUser: IRelationRequestUserDto;
  toUser: IRelationRequestUserDto;
  relations: IRelationshipDto[];
  selectedRelation?: IRelationshipDto;
  edit?: boolean;
}

@Component({
  selector: 'gh-relations-list-dialog',
  templateUrl: './relations-list-dialog.component.html',
  styleUrls: ['./relations-list-dialog.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TuiDestroyService],
})
export class RelationsListDialogComponent implements OnInit {
  @ViewChild(RelationsComponent, {static: true})
  relationsComponent!: RelationsComponent;
  isFormEqualsToInitial$: Observable<boolean> | null = null;

  icon = 'assets/icons/arrow-right-circle.svg';

  get data(): IRelationsListDialogData {
    return this.context.data;
  }

  constructor(@Inject(POLYMORPHEUS_CONTEXT)
              private readonly context: TuiDialogContext<any, IRelationsListDialogData>,
              public readonly relationsFacade: RelationsFacade,
              private readonly relationsService: RelationsService,
              private readonly destroy$: TuiDestroyService,) {
    if (this.data.selectedRelation) {
      this.relationsFacade.select(this.data.selectedRelation);
    }
  }

  ngOnInit(): void {
    this.relationsComponent.form.get('comment')?.setValidators([this.commentValidator]);

    this.isFormEqualsToInitial$ = combineLatest([
      this.relationsFacade.selected$,
      this.relationsComponent.form.valueChanges.pipe(debounceTime(300))
    ]).pipe(
      map(([initialValue]) => {
        const currentValue = this.relationsComponent.form.getRawValue();
        return !!initialValue &&
          initialValue.description === currentValue.description &&
          initialValue.startAt === (currentValue.startAt instanceof Date ? currentValue.startAt.toISOString() : currentValue.startAt) &&
          (initialValue.endAt || null) === (currentValue.endAt instanceof Date ? currentValue.endAt.toISOString() : currentValue.endAt) &&
          initialValue.type === currentValue.type;
      }),
      takeUntil(this.destroy$),
    );
  }

  onSubmit(formValue: ICreateRelationDto): void {
    if (this.relationsComponent.form.invalid) {
      return;
    }

    this.relationsFacade.selected$.pipe(
      isNotNil(),
      take(1),
      switchMap(selected => this.relationsService.updateRelation(selected.id, formValue)),
      tap(updatedRelation => {
        this.relationsFacade.select(updatedRelation);
        const spliceIndex = this.data.relations.findIndex(rel => rel.id === updatedRelation.id);
        if (spliceIndex !== -1) {
          this.data.relations.splice(spliceIndex, 1, updatedRelation);
        }
      }),
    ).subscribe();

    this.closeDialog();
  }

  onCancel(): void {
    this.closeDialog();
  }

  private closeDialog(): void {
    this.relationsFacade.select(null);
    this.context.completeWith(null);
  }

  private readonly commentValidator = (
    field: AbstractControl,
  ): ValidationErrors | null =>
    !field.value
      ? new TuiValidationError('You have to notify another participant about these changes')
      : null;
}
