import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { IUserDto } from '@shared/types/user/user.dto.interface';
import { BehaviorSubject, catchError, distinctUntilChanged, finalize, Observable, of, tap } from 'rxjs';
import { IUserListItem } from '@shared/types/user/user-list-item.dto.interface';
import { ISearchParamsDto } from '@shared/types/search/search-params.dto.interface';
import { USERS_PATH } from '@shared/routes/users';
import { UrlBuilderService } from '@core/services/url-builder/url-builder.service';
import { ErrorService } from '@core/services/error.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService extends TuiDestroyService {
  private readonly result = new BehaviorSubject<IUserListItem[] | null>(null);
  readonly result$ = this.result.pipe(distinctUntilChanged());

  private readonly usersLoading = new BehaviorSubject(false);
  readonly usersLoading$ = this.usersLoading.pipe(distinctUntilChanged());

  constructor(private readonly http: HttpClient,
              private readonly errorService: ErrorService) {
    super();
  }

  getUser(id: string): Observable<IUserDto> {
    this.usersLoading.next(true);

    return this.http.get<IUserDto>(
      new UrlBuilderService()
        .toApi()
        .withPostfix(USERS_PATH)
        .withPostfix(id)
        .build(),
    ).pipe(
      finalize(() => this.usersLoading.next(false))
    );
  }

  getUsers(params: ISearchParamsDto): Observable<IUserListItem[]> {
    this.usersLoading.next(true);

    return this.http.post<IUserListItem[]>(
      new UrlBuilderService()
        .toApi()
        .withPostfix(USERS_PATH)
        .build(),
      params
    ).pipe(
      tap((items) => {
        this.result.next(items);
      }),
      catchError((err) => {
        this.errorService.showErrorNotification(err.error?.message || 'Something went wrong. Try again several minutes later.');
        return of([]);
      }),
      finalize(() => this.usersLoading.next(false))
    );
  }
}
