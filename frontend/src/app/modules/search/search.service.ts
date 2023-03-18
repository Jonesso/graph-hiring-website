import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { IUserDto } from '@shared/types/user/user.dto.interface';
import { BehaviorSubject, distinctUntilChanged, finalize, Observable, of, tap } from 'rxjs';
import { userDtoMock } from '@shared/mocks/user-dto-mock';
import { IUserListItem } from '@shared/types/user/user-list-item.dto.interface';
import { ISearchParamsDto } from '@shared/types/search/search-params.dto.interface';
import { userListItemsDtoMock } from '@shared/mocks/user-list-items-dto-mock';

@Injectable({
  providedIn: 'root'
})
export class SearchService extends TuiDestroyService {
  private readonly result = new BehaviorSubject<IUserListItem[] | null>(null);
  readonly result$ = this.result.pipe(distinctUntilChanged());

  private readonly usersLoading = new BehaviorSubject(false);
  readonly usersLoading$ = this.usersLoading.pipe(distinctUntilChanged());

  constructor(private readonly http: HttpClient,) {
    super();
  }

  getUser(id: string): Observable<IUserDto> {
    this.usersLoading.next(true);

    return of(userDtoMock).pipe(
      finalize(() => this.usersLoading.next(false))
    );

    // TODO uncomment when backend's done
    // return this.http.get<IUserDto>(
    //   new UrlBuilderService()
    //     .toApi()
    //     .withPostfix(USERS_PATH)
    //     .withPostfix(id)
    //     .build(),
    // ).pipe(
    //   finalize(() => this.usersLoading.next(false))
    // );
  }

  getUsers(params: ISearchParamsDto): Observable<IUserListItem[]> {
    this.usersLoading.next(true);
    return of(userListItemsDtoMock).pipe(
      tap((items) => {
        this.result.next(items);
      }),
      finalize(() => this.usersLoading.next(false))
    );

    // TODO uncomment when backend's done
    // return this.http.get<IUserListItem[]>(
    //   new UrlBuilderService()
    //     .toApi()
    //     .withPostfix(USERS_PATH)
    //     .build(),
    //   {params: getParamsWithoutNilsAndEmptyStringsOrArrays(params)}
    // ).pipe(
    //   tap((items) => {
    //     this.result.next(items);
    //   }),
    //   finalize(() => this.usersLoading.next(false))
    // );
  }
}
