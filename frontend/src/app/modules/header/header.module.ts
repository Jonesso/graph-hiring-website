import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header.component';
import {TuiButtonModule, TuiLinkModule, TuiSvgModule} from "@taiga-ui/core";
import {RouterModule} from "@angular/router";
import {MenuComponent} from './menu/menu.component';

const TUI_MODULES = [
  TuiLinkModule,
  TuiSvgModule,
  TuiButtonModule
];

@NgModule({
  declarations: [
    HeaderComponent,
    MenuComponent
  ],
  exports: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TUI_MODULES,
  ]
})
export class HeaderModule {
}
