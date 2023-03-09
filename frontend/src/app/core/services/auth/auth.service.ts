import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {
  BehaviorSubject,
  catchError,
  distinctUntilChanged,
  Observable,
  of,
  pluck,
  ReplaySubject,
  switchMap,
  tap
} from "rxjs";
import {IUserDto} from "@shared/types/user/user.dto.interface";
import {ISigninDto} from "@shared/types/auth/sign-in.dto.interface";
import {IRefreshTokenDto} from "@shared/types/auth/refresh-token.dto.interface";
import {UrlBuilderService} from "@core/services/url-builder/url-builder.service";
import {RefreshTokenService} from "@core/services/auth/refresh-token.service";
import {CURRENT_USER_PATH, USERS_PATH} from "@shared/routes/users";
import {AUTH_PATH, SIGN_IN_PATH, SIGN_UP_PATH} from "@shared/routes/auth";
import {ISignupDto} from "@shared/types/auth/sign-up.dto.interface";

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
    return this.http.get<IUserDto>(
      new UrlBuilderService()
        .toApi()
        .withPostfix(USERS_PATH)
        .withPostfix(CURRENT_USER_PATH)
        .build(),
    ).pipe(
      catchError(() => of(null)),
      tap(user => this._currentUser.next(user))
    );
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
      data);
  }
}
