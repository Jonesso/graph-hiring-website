import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { TuiAlertService, TuiDialogContext, TuiNotification } from '@taiga-ui/core';
import { IUserDto } from '@shared/types/user/user.dto.interface';
import { ICreateRelationDto } from '@shared/types/relations/create-relation.dto.interface';
import { ErrorService } from '@core/services/error.service';
import { RequestsService } from '@modules/requests/requests.service';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { takeUntil } from 'rxjs';

interface ICreateRelationDialogData {
  fromUser: IUserDto;
  toUser: IUserDto;
}

@Component({
  selector: 'gh-create-relation-dialog',
  templateUrl: './create-relation-dialog.component.html',
  styleUrls: ['./create-relation-dialog.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TuiDestroyService]
})
export class CreateRelationDialogComponent {
  icon = 'assets/icons/user-plus.svg';

  get data(): ICreateRelationDialogData {
    return this.context.data;
  }

  constructor(@Inject(POLYMORPHEUS_CONTEXT)
              private readonly context: TuiDialogContext<any, ICreateRelationDialogData>,
              @Inject(TuiAlertService) private readonly alertService: TuiAlertService,
              private readonly requestsService: RequestsService,
              private readonly errorService: ErrorService,
              private readonly destroy$: TuiDestroyService) {
  }

  onSubmit(createRelationDto: ICreateRelationDto): void {
    this.requestsService.createRelationRequest(createRelationDto).subscribe({
      next: () => {
        this.alertService.open(
          'Wait for other user to accept or decline it',
          {
            label: 'Relations request has been sent',
            status: TuiNotification.Info,
            autoClose: true,
            hasCloseButton: true
          }
        )
          .pipe(takeUntil(this.destroy$))
          .subscribe();

        this.context.completeWith(null);
      },
      error: () => this.errorService.showErrorNotification()
    });
  }

  onCancel(): void {
    this.context.completeWith(null);
  }
}
