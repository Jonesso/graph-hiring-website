import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { AuthService } from '@core/services/auth/auth.service';
import { takeUntil } from 'rxjs';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { IUserListItem } from '@shared/types/user/user-list-item.dto.interface';

@Component({
  selector: 'gh-search-result-list',
  templateUrl: './search-result-list.component.html',
  styleUrls: ['./search-result-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TuiDestroyService],
})
export class SearchResultListComponent implements OnInit {
  @Input() isLoading = false;

  @Input() users: IUserListItem[] | null | undefined = null;

  isUserUnauthorized = true;

  constructor(private readonly auth: AuthService,
              private readonly destroy$: TuiDestroyService,) {
  }

  ngOnInit(): void {
    this.auth.user$.pipe(
      takeUntil(this.destroy$),
    ).subscribe(user => this.isUserUnauthorized = !user);
  }

}
