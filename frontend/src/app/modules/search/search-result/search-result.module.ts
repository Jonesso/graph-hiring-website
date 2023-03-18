import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchResultComponent } from './search-result.component';
import { TuiAvatarModule, TuiBadgeModule, TuiTabsModule } from '@taiga-ui/kit';
import { TuiButtonModule, TuiHintModule, TuiLoaderModule, TuiScrollbarModule, TuiSvgModule } from '@taiga-ui/core';
import { SearchResultListComponent } from './search-result-list/search-result-list.component';
import { UserCardComponent } from './search-result-list/user-card/user-card.component';
import { FullNameModule } from '@shared/pipes/full-name/full-name.module';
import { RouterModule } from '@angular/router';
import { TuiLetModule } from '@taiga-ui/cdk';
import {
  CreateRelationDialogComponent
} from './search-result-list/user-card/create-relation-dialog/create-relation-dialog.component';
import {
  RelationsListDialogComponent
} from './search-result-list/user-card/relations-list-dialog/relations-list-dialog.component';

const TUI_MODULES = [
  TuiTabsModule,
  TuiSvgModule,
  TuiScrollbarModule,
  TuiLoaderModule,
  TuiBadgeModule,
  TuiAvatarModule,
  TuiLetModule,
  TuiButtonModule,
  TuiHintModule,
];

@NgModule({
  declarations: [SearchResultComponent, SearchResultListComponent, UserCardComponent, CreateRelationDialogComponent, RelationsListDialogComponent],
  imports: [
    CommonModule,
    RouterModule,
    FullNameModule,
    TUI_MODULES,
  ],
  exports: [SearchResultComponent]
})
export class SearchResultModule {
}
