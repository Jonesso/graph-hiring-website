import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { TuiDialogContext } from '@taiga-ui/core';
import { IUserDto } from '@shared/types/user/user.dto.interface';

interface ICreateRelationDialogData {
  fromUser: IUserDto;
  toUser: IUserDto;
}

@Component({
  selector: 'gh-create-relation-dialog',
  templateUrl: './create-relation-dialog.component.html',
  styleUrls: ['./create-relation-dialog.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateRelationDialogComponent {

  get data(): ICreateRelationDialogData {
    return this.context.data;
  }

  constructor(@Inject(POLYMORPHEUS_CONTEXT)
              private readonly context: TuiDialogContext<any, ICreateRelationDialogData>,) {
  }

  onSubmit(): void {
    // TODO: implement request to create relation
    this.context.completeWith(null);
  }

  onCancel(): void {
    this.context.completeWith(null);
  }
}
