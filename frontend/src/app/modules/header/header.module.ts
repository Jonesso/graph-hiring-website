import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header.component';
import {TuiButtonModule, TuiDataListModule, TuiHostedDropdownModule, TuiLinkModule, TuiSvgModule} from "@taiga-ui/core";
import {RouterModule} from "@angular/router";
import {MenuComponent} from './menu/menu.component';
import {TuiAvatarModule} from "@taiga-ui/kit";
import {FullNameModule} from "@shared/pipes/full-name/full-name.module";

const TUI_MODULES = [
  TuiLinkModule,
  TuiSvgModule,
  TuiButtonModule,
  TuiHostedDropdownModule,
  TuiAvatarModule,
  TuiDataListModule,
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
    FullNameModule,
  ]
})
export class HeaderModule {
}
