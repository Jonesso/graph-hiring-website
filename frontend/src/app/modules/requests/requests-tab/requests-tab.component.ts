import { ChangeDetectionStrategy, Component, Inject, ViewChild } from '@angular/core';
import { RelationRequestType } from '@modules/requests/relation-request-type.enum';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { RelationsFacade } from '@shared/components/relations/relations.facade';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestsService } from '@modules/requests/requests.service';
import { map, Observable, pluck, switchMap, take, takeUntil } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { AuthService } from '@core/services/auth/auth.service';
import { isNotNil } from '@shared/utils/is-not-nil/is-not-nil';
import { IGetRelationRequestsDto } from '@shared/types/relations/get-relation-requests.dto.interface';
import { IRelationshipDto } from '@shared/types/relations/relationship.dto.interface';
import { CdkScrollable } from '@angular/cdk/overlay';
import { ErrorService } from '@core/services/error.service';
import { IUpdateRelationRequestDto } from '@shared/types/relations/update-relation-request.dto.interface';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';

@Component({
  selector: 'gh-requests-tab',
  templateUrl: './requests-tab.component.html',
  styleUrls: ['./requests-tab.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TuiDestroyService],
})
export class RequestsTabComponent {
  readonly RelationRequestType = RelationRequestType;

  selectedRelationsBlockIndex: number | null = null;

  @ViewChild(CdkScrollable, {static: true})
  relationRequestsContainer: CdkScrollable | null = null;

  constructor(
    @Inject(TuiAlertService) private readonly alertService: TuiAlertService,
    public readonly route: ActivatedRoute,
    public readonly relationsFacade: RelationsFacade,
    public readonly requestsService: RequestsService,
    public readonly auth: AuthService,
    private readonly router: Router,
    private readonly errorService: ErrorService,
    private readonly destroy$: TuiDestroyService,) {

    this.route.params.pipe(
      map(params => params['requestType']),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.selectedRelationsBlockIndex = null;
      this.relationsFacade.select(null);
    });

  }

  onRelationRequestSelect(relationsBlockIndex: number,
                          {toUser, fromUser}: IGetRelationRequestsDto,
                          relation: IRelationshipDto,
                          el: HTMLElement): void {
    this.relationsFacade.select(relation);

    if (this.selectedRelationsBlockIndex === relationsBlockIndex) {
      return;
    }

    if (this.relationRequestsContainer) {
      const styles = getComputedStyle(el);
      const openedHeight = parseInt(styles.getPropertyValue('--opened-height'), 10);
      const closedHeight = parseInt(styles.getPropertyValue('--closed-height'), 10);
      const openedClosedHeightDelta = openedHeight - closedHeight;
      const offsetTop = this.selectedRelationsBlockIndex !== null && relationsBlockIndex > this.selectedRelationsBlockIndex
        ? el.offsetTop - openedClosedHeightDelta
        : el.offsetTop;
      this.relationRequestsContainer.scrollTo({
        top: offsetTop + openedHeight / 2 - (el.parentElement?.offsetHeight || 0) / 2,
        behavior: 'smooth'
      });
    }

    this.selectedRelationsBlockIndex = relationsBlockIndex;
  }

  onRelationRequestChange(updateDto: IUpdateRelationRequestDto): void {
    this.selectedRequestId$.pipe(
      switchMap(requestId => this.requestsService.update(requestId, updateDto)),
      takeUntil(this.destroy$),
    ).subscribe({
      next: () => {
        this.showSuccessNotification('Request has been updated');

        this.router.navigate(['.'], {relativeTo: this.route});
      },
      error: () => this.errorService.showErrorNotification()
    });
  }

  onDeclineClick(): void {
    this.selectedRequestId$.pipe(
      switchMap(requestId => this.requestsService.decline(requestId)),
      takeUntil(this.destroy$),
    ).subscribe(({
      next: () => {
        this.showSuccessNotification('Request has been declined');

        this.selectedRelationsBlockIndex = null;

        this.router.navigate(['.'], {relativeTo: this.route});
      },
      error: () => this.errorService.showErrorNotification()
    }));
  }

  onReopenClick(): void {
    this.selectedRequestId$.pipe(
      switchMap(requestId => this.requestsService.reopen(requestId)),
      takeUntil(this.destroy$),
    ).subscribe({
      next: () => {
        this.showSuccessNotification('Request has been reopened');

        this.router.navigate(['.'], {relativeTo: this.route});
      },
      error: () => this.errorService.showErrorNotification()
    });
  }

  onCreateRelationClick(): void {
    this.selectedRequestId$.pipe(
      switchMap(requestId => this.requestsService.accept(requestId)),
      takeUntil(this.destroy$),
    ).subscribe({
      next: () => {
        this.showSuccessNotification('Relationship has been created');

        this.router.navigate(['.'], {relativeTo: this.route});
      },
      error: () => this.errorService.showErrorNotification()
    });
  }

  private get selectedRequestId$(): Observable<string> {
    return this.relationsFacade.selected$.pipe(
      take(1),
      isNotNil(),
      pluck('id')
    );
  }

  private showSuccessNotification(notificationText: string): void {
    this.alertService.open(
      notificationText,
      {
        status: TuiNotification.Info,
        autoClose: true,
        hasCloseButton: true
      }
    )
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }
}
