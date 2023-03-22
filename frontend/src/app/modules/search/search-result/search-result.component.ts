import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { TUI_SANITIZER } from '@taiga-ui/core';
import { combineLatest, debounceTime, map, switchMap, takeUntil } from 'rxjs';
import { ProfileService } from '@modules/profile/profile.service';
import { SearchService } from '@modules/search/search.service';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { SearchParamsService } from '@modules/search/search-params/search-params.service';
import { RelationsService } from '@modules/search/relations.service';

@Component({
  selector: 'gh-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.less'],
  providers: [
    {
      provide: TUI_SANITIZER,
      useClass: NgDompurifySanitizer,
    },
    TuiDestroyService,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResultComponent implements OnInit {
  @Input() withGraphView = false;

  readonly iconSrc = 'assets/icons/diagram.svg';

  activeItemIndex = 0;

  readonly usersList$ = this.profile.selectedUser$.pipe(
    switchMap(selectedUser => selectedUser !== null
      ? this.relations.result$
        .pipe(
          map(graph => graph?.nodes.filter(user => user.id !== selectedUser.id))
        )
      : this.search.result$
    )
  );

  readonly isLoading$ = this.profile.selectedUser$.pipe(
    switchMap(selectedUser => selectedUser !== null
      ? this.relations.isLoading$
      : this.search.usersLoading$
    )
  );

  constructor(public readonly profile: ProfileService,
              readonly search: SearchService,
              readonly relations: RelationsService,
              private readonly searchParamsService: SearchParamsService,
              private readonly destroy$: TuiDestroyService,) {
  }

  ngOnInit(): void {
    combineLatest([
      this.searchParamsService.params$,
      this.profile.selectedUser$
    ]).pipe(
      debounceTime(0),
      switchMap(([params, selectedUsed]) => selectedUsed !== null
        ? this.relations.getGraph({...params, fromUserId: selectedUsed.id})
        : this.search.getUsers(params)
      ),
      takeUntil(this.destroy$)
    ).subscribe();
  }

}
