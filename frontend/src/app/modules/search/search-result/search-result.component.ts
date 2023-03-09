import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {NgDompurifySanitizer} from "@tinkoff/ng-dompurify";
import {TUI_SANITIZER} from "@taiga-ui/core";

@Component({
  selector: 'gh-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.less'],
  providers: [
    {
      provide: TUI_SANITIZER,
      useClass: NgDompurifySanitizer,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResultComponent implements OnInit {
  @Input() withGraphView = true;

  readonly iconSrc = 'assets/icons/diagram.svg';

  activeItemIndex = 0;


  constructor() {
  }

  ngOnInit(): void {
  }

}
