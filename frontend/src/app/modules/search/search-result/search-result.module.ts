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
import { SearchResultGraphComponent } from './search-result-graph/search-result-graph.component';
import { NetworkGraphComponent } from './search-result-graph/network-graph/network-graph.component';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { OverlayModule } from '@angular/cdk/overlay';
import { A11yModule } from '@angular/cdk/a11y';
import { UserNodeComponent } from './search-result-graph/user-node/user-node.component';
import { NodeHTMLIdPipe } from './search-result-graph/node-html-id.pipe';
import { NodesByEdgePipe } from './search-result-graph/nodes-by-edge.pipe';
import { IsBidirectionalModule } from '@shared/pipes/is-bidirectional/is-bidirectional.module';
import { RelationTypeModule } from '@shared/pipes/relation-type/relation-type.module';
import { RelationsModule } from '@shared/components/relations/relations.module';

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
  declarations: [
    SearchResultComponent,
    SearchResultListComponent,
    UserCardComponent,
    CreateRelationDialogComponent,
    RelationsListDialogComponent,
    SearchResultGraphComponent,
    NetworkGraphComponent,
    UserNodeComponent,
    NodeHTMLIdPipe,
    NodesByEdgePipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgxGraphModule,
    OverlayModule,
    A11yModule,
    FullNameModule,
    IsBidirectionalModule,
    RelationTypeModule,
    RelationsModule,
    TUI_MODULES,
  ],
  exports: [SearchResultComponent]
})
export class SearchResultModule {
}
