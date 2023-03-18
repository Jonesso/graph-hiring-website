import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged } from 'rxjs';
import { equals, mergeRight } from 'ramda';
import { ISearchParams } from '@modules/search/search-params/search-params.interface';
import { DEFAULT_SEARCH_PARAMS } from '@modules/search/search-params/default-search-params';

@Injectable({
  providedIn: 'root'
})
export class SearchParamsService {
  private readonly params = new BehaviorSubject<ISearchParams>(DEFAULT_SEARCH_PARAMS);
  readonly params$ = this.params.pipe(distinctUntilChanged((a, b) => equals(a, b)));

  patch(newParams: Partial<ISearchParams>): void {
    this.params.next(mergeRight(this.get(), newParams));
  }

  get(): ISearchParams {
    return this.params.value;
  }
}
