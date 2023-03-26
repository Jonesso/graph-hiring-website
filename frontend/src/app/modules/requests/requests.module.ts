import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestsComponent } from './requests.component';
import { RequestsTabComponent } from './requests-tab/requests-tab.component';
import { RouterModule } from '@angular/router';
import { TuiTabsModule } from '@taiga-ui/kit';
import { RequestsRoutingModule } from '@modules/requests/requests-routing.module';
import { TuiButtonModule, TuiNotificationModule, TuiScrollbarModule } from '@taiga-ui/core';
import { RelationsModule } from '@shared/components/relations/relations.module';
import { CdkScrollableModule } from '@angular/cdk/scrolling';
import { TuiLetModule } from '@taiga-ui/cdk';

const TUI_MODULES = [
  TuiTabsModule,
  TuiScrollbarModule,
  TuiButtonModule,
  TuiNotificationModule,
  TuiLetModule,
];

@NgModule({
  declarations: [
    RequestsComponent,
    RequestsTabComponent
  ],
  imports: [
    CommonModule,
    RequestsRoutingModule,
    RouterModule,
    RelationsModule,
    CdkScrollableModule,
    TUI_MODULES,
  ]
})
export class RequestsModule {
}
