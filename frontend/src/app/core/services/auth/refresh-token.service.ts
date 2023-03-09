import {Inject, Injectable} from '@angular/core';
import {LOCAL_STORAGE} from '@ng-web-apis/common';

@Injectable({
  providedIn: 'root'
})
export class RefreshTokenService {
  private readonly storageKey: string = 'graphHiringWebsiteRefreshToken';

  constructor(@Inject(LOCAL_STORAGE) private readonly localStorage: Storage) {
  }

  get refreshToken(): string | null {
    return this.localStorage.getItem(this.storageKey);
  }

  set refreshToken(token: string | null) {
    if (token) {
      this.localStorage.setItem(this.storageKey, token);
    } else {
      this.clear();
    }
  }

  private clear(): void {
    this.localStorage.removeItem(this.storageKey);
  }
}
