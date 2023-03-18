import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { IRelationshipDto } from '@shared/types/relations/relationship.dto.interface';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { TuiDialogContext } from '@taiga-ui/core';
import { IUserDto } from '@shared/types/user/user.dto.interface';

export interface IRelationsListDialogData {
  fromUser: IUserDto;
  toUser: IUserDto;
  relations: IRelationshipDto[];
  selectedRelation?: IRelationshipDto;
  edit?: boolean;
}

@Component({
  selector: 'gh-relations-list-dialog',
  templateUrl: './relations-list-dialog.component.html',
  styleUrls: ['./relations-list-dialog.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RelationsListDialogComponent implements OnInit {

  constructor(@Inject(POLYMORPHEUS_CONTEXT)
              private readonly context: TuiDialogContext<any, IRelationsListDialogData>,) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    // TODO: implement edit existing relationships
    this.context.completeWith(null);
  }

  onCancel(): void {
    this.context.completeWith(null);
  }
}
