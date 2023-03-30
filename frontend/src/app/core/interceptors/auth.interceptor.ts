import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { environment } from '@env';
import { AUTH_PATH, REFRESH_PATH, SIGN_IN_PATH } from '@shared/routes/auth';
import { AuthService } from '@core/services/auth/auth.service';
import { StatusCodes } from 'http-status-codes';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private readonly retryBlacklist = [
    `${environment.baseApiUrl}/${AUTH_PATH}/${REFRESH_PATH}`,
    `${environment.baseApiUrl}/${AUTH_PATH}/${SIGN_IN_PATH}`
  ];

  constructor(private readonly auth: AuthService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes('assets')) {
      return next.handle(request);
    }

    const reqWithCredentials = request.clone({withCredentials: true});
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
