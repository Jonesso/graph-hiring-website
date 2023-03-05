import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SearchResultComponent} from "./search-result.component";
import {TuiTabsModule} from "@taiga-ui/kit";
import {TuiScrollbarModule, TuiSvgModule} from "@taiga-ui/core";

const TUI_MODULES = [
  TuiTabsModule,
  TuiSvgModule,
  TuiScrollbarModule,
];

@NgModule({
  declarations: [SearchResultComponent],
  imports: [
    CommonModule,
    TUI_MODULES,
  ],
  exports: [SearchResultComponent]
})
export class SearchResultModule {
}
