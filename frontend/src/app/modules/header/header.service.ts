import {Injectable} from '@angular/core';
import {BehaviorSubject, distinctUntilChanged} from "rxjs";
import {Title} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private title = new BehaviorSubject<string>('');
  title$ = this.title.pipe(distinctUntilChanged());

  constructor(private readonly titleService: Title) {
  }

  setTitle(title: string): void {
    this.title.next(title);
    this.titleService.setTitle(title);
  }
}
