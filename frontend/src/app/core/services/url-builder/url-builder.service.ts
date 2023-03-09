import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlBuilderService {
  url = '';

  toApi(): this {
    this.url += 'api';

    return this;
  }

  withPostfix(postfix: string): this {
    this.url += `/${postfix}`;

    return this;
  }

  public build(): string {
    return this.url;
  }
}
