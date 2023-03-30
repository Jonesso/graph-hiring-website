import { Inject, Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '@shared/tokens/api-base-url.token';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
  constructor(@Inject(API_BASE_URL) private readonly apiBaseUrl: string) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes('assets') || request.url.includes('shared')) {
      return next.handle(request);
    }

    return next.handle(request.clone({url: `${this.apiBaseUrl}/${request.url}`}));
  }
}
