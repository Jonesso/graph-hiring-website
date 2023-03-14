import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { IUserDto } from '@shared/types/user/user.dto.interface';
import { BehaviorSubject, distinctUntilChanged, finalize, Observable, of } from 'rxjs';
import { userDtoMock } from '@shared/mocks/user-dto-mock';

@Injectable({
  providedIn: 'root'
})
export class SearchService extends TuiDestroyService {

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
}
