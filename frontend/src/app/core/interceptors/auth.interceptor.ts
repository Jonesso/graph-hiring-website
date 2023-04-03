import { Inject, Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AUTH_PATH, REFRESH_PATH, SIGN_IN_PATH } from '@shared/routes/auth';
import { AuthService } from '@core/services/auth/auth.service';
import { StatusCodes } from 'http-status-codes';
import { API_BASE_URL } from '@shared/tokens/api-base-url.token';
import { RefreshTokenService } from '@core/services/auth/refresh-token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private readonly retryBlacklist = [
    `${this.baseApiUrl}/api/${AUTH_PATH}/${REFRESH_PATH}`,
    `${this.baseApiUrl}/api/${AUTH_PATH}/${SIGN_IN_PATH}`
  ];

  constructor(
    @Inject(API_BASE_URL) private readonly baseApiUrl: string,
    private readonly tokenService: RefreshTokenService,
    private readonly auth: AuthService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes('assets')) {
      return next.handle(request);
    }

    const bearerToken = this.tokenService.refreshToken ? `Bearer ${this.tokenService.refreshToken}` : '';
    const reqWithCredentials = request.clone({
      withCredentials: true,
      setHeaders: {
        Authorization: bearerToken
      }
    });

    return next.handle(reqWithCredentials).pipe(
      catchError((res: HttpResponse<unknown>) => {
        if (res.status === StatusCodes.UNAUTHORIZED && res.url && !this.retryBlacklist.includes(res.url)) {
          return this.auth.updateToken().pipe(
            switchMap(() => next.handle(reqWithCredentials))
          );
        }

        return throwError(res);
      })
    );
  }
}
