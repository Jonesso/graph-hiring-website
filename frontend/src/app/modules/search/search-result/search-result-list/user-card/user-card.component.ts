import { ChangeDetectionStrategy, Component, Inject, Injector, Input, OnInit } from '@angular/core';
import { IUserListItem } from '@shared/types/user/user-list-item.dto.interface';
import { DEFAULT_AVATAR_URL } from '@shared/constants';
import { AuthService } from '@core/services/auth/auth.service';
import { ProfileService } from '@modules/profile/profile.service';
import { ProfileGuard } from '@modules/profile/profile.guard';
import { forkJoin, Observable, of, switchMap, take, takeUntil, tap } from 'rxjs';
import { IUserDto } from '@shared/types/user/user.dto.interface';
import { isNotNil } from '@shared/utils/is-not-nil/is-not-nil';
import { RelationsService } from '@modules/search/relations.service';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { TuiDestroyService } from '@taiga-ui/cdk';
import {
  CreateRelationDialogComponent
} from '@modules/search/search-result/search-result-list/user-card/create-relation-dialog/create-relation-dialog.component';
import {
  RelationsListDialogComponent
} from '@modules/search/search-result/search-result-list/user-card/relations-list-dialog/relations-list-dialog.component';

@Component({
  selector: 'gh-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TuiDestroyService],
})
export class UserCardComponent implements OnInit {
  @Input() user!: IUserListItem;

  avatarSrc = DEFAULT_AVATAR_URL;

  constructor(public readonly auth: AuthService,
              public readonly profile: ProfileService,
              public readonly profileGuard: ProfileGuard,
              private readonly relations: RelationsService,
              @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
              @Inject(Injector) private readonly injector: Injector,
              private readonly destroy$: TuiDestroyService,
  ) {
  }

  ngOnInit(): void {
    if (this.user.avatarSrc) {
      this.avatarSrc = this.user.avatarSrc;
    }
  }

  openCreateRelationDialog(): void {
    this.auth.user$.pipe(
      take(1),
      tap(fromUser => this.dialogService.open(
          new PolymorpheusComponent(CreateRelationDialogComponent, this.injector),
          {
            label: 'Create relation',
            data: {fromUser, toUser: this.user},
            dismissible: true,
            size: 'auto',
          }
        ).pipe(takeUntil(this.destroy$))
          .subscribe()
      )
    ).subscribe();
  }

  openRelationsListDialog(): void {
    this.openRelationsDialog(this.profile.selectedUser$);
  }

  openEditRelationsDialog(): void {
    this.openRelationsDialog(this.auth.user$, true);
  }

  private openRelationsDialog(user$: Observable<IUserDto | null>, edit = false): void {
    user$.pipe(
      take(1),
      isNotNil(),
      switchMap(selectedUser => forkJoin([
        of(selectedUser),
        this.relations.getRelationsBetweenUsers(selectedUser.id, this.user.id)
      ]))
    ).subscribe(([selectedUser, relations]) => this.dialogService.open(
        new PolymorpheusComponent(RelationsListDialogComponent, this.injector),
        {
          label: `${selectedUser.firstName}'s and ${this.user.firstName}'s relations`,
          data: {
            fromUser: selectedUser,
            toUser: this.user,
            relations,
            edit
          },
          dismissible: true,
        }
      ).pipe(takeUntil(this.destroy$))
        .subscribe()
    );
  }

}
