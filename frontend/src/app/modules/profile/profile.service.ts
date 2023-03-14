import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, Observable, tap } from 'rxjs';
import { IUserDto } from '@shared/types/user/user.dto.interface';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '@core/services/auth/auth.service';
import { IPatchUserDto } from '@shared/types/user/patch-user.dto.interface';
import { CURRENT_USER_PATH, USERS_PATH } from '@shared/routes/users';
import { UrlBuilderService } from '@core/services/url-builder/url-builder.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private readonly selectedUser = new BehaviorSubject<IUserDto | null>(null);
  readonly selectedUser$ = this.selectedUser.pipe(distinctUntilChanged());

  constructor(private readonly http: HttpClient, private readonly auth: AuthService) {
  }

  update(patchUserDto: IPatchUserDto): Observable<IUserDto> {
    return this.http.patch<IUserDto>(
      new UrlBuilderService()
        .toApi()
        .withPostfix(USERS_PATH)
        .withPostfix(CURRENT_USER_PATH)
        .build(),
      patchUserDto
    ).pipe(
      tap(user => this.auth._currentUser.next(user))
    );
  }

  setSelectedUser(user: IUserDto | null): void {
    this.selectedUser.next(user);
  }
}
