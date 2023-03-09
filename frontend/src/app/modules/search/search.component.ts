import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'gh-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  constructor() {
  }
}
