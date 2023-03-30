import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  distinctUntilChanged,
  mapTo,
  Observable,
  of,
  pluck,
  ReplaySubject,
  switchMap,
  tap,
  throwError
} from 'rxjs';
import { IUserDto } from '@shared/types/user/user.dto.interface';
import { ISigninDto } from '@shared/types/auth/sign-in.dto.interface';
import { IRefreshTokenDto } from '@shared/types/auth/refresh-token.dto.interface';
import { UrlBuilderService } from '@core/services/url-builder/url-builder.service';
import { RefreshTokenService } from '@core/services/auth/refresh-token.service';
import { AUTH_PATH, LOG_OUT_PATH, REFRESH_PATH, SIGN_IN_PATH, SIGN_UP_PATH } from '@shared/routes/auth';
import { ISignupDto } from '@shared/types/auth/sign-up.dto.interface';
import { userDtoMock } from '@shared/mocks/user-dto-mock';

const defaultRedirectUrl = '';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly redirectUrl$ = new BehaviorSubject<string>(defaultRedirectUrl);

  readonly user$: Observable<IUserDto | null>;
  readonly _currentUser = new ReplaySubject<IUserDto | null>(1);

  constructor(private readonly http: HttpClient,
              private readonly router: Router,
              private readonly tokenService: RefreshTokenService) {
    this.user$ = this._currentUser.pipe(distinctUntilChanged());
  }

  loadUser(): Observable<IUserDto | null> {
    return of(userDtoMock).pipe(
      tap(user => this._currentUser.next(user)),
    );

    // TODO uncomment when backend's done
    // return this.http.get<IUserDto>(
    //   new UrlBuilderService()
    //     .toApi()
    //     .withPostfix(USERS_PATH)
    //     .withPostfix(CURRENT_USER_PATH)
    //     .build(),
    // ).pipe(
    //   catchError(() => of(null)),
    //   tap(user => this._currentUser.next(user))
    // );
  }

  signIn(data: ISigninDto): Observable<IUserDto | null> {
    return this.http.post<IRefreshTokenDto>(
      new UrlBuilderService()
        .toApi()
        .withPostfix(AUTH_PATH)
        .withPostfix(SIGN_IN_PATH)
        .build(),
      data
    ).pipe(
      pluck('refreshToken'),
      tap(refreshToken => this.tokenService.refreshToken = refreshToken),
      switchMap(() => this.loadUser()),
      tap(() => this.router.navigateByUrl(this.redirectUrl$.value))
    );
  }

  signUp(data: ISignupDto): Observable<IUserDto> {
    return this.http.post<IUserDto>(
      new UrlBuilderService()
        .toApi()
        .withPostfix(AUTH_PATH)
        .withPostfix(SIGN_UP_PATH)
        .build(),
      data
    );
  }

  logOut(): void {
    if (this.tokenService.refreshToken !== null) {
      this.http.delete(
        new UrlBuilderService()
          .toApi()
          .withPostfix(AUTH_PATH)
          .withPostfix(LOG_OUT_PATH)
          .build(),
      ).subscribe();
    }

    this.tokenService.refreshToken = null;
    this._currentUser.next(null);

    // prevent reload if that is startup navigation
    if (this.router.navigated) {
      // save current url in case of token expiration to navigate to last route after sign in retry
      this.redirectUrl$.next(this.router.url);
      // navigate to same url to restart guards
      this.router.navigate([this.router.url]);
    }
  }

  updateToken(): Observable<void> {
    if (this.tokenService.refreshToken === null) {
      return throwError(new Error('No saved refresh token'));
    }

    return this.http.post<IRefreshTokenDto>(
      new UrlBuilderService()
        .toApi()
        .withPostfix(AUTH_PATH)
        .withPostfix(REFRESH_PATH)
        .build(),
      {refreshToken: this.tokenService.refreshToken}
    ).pipe(
      pluck('refreshToken'),
      tap(refreshToken => this.tokenService.refreshToken = refreshToken),
      mapTo(undefined)
    );
  }
}
