import { ChangeDetectionStrategy, Component, HostListener, Inject, Injector, Input } from '@angular/core';
import { IGraphDto } from '@shared/types/relations/graph.dto.interface';
import { IUserListItem } from '@shared/types/user/user-list-item.dto.interface';
import { IRelationshipDto } from '@shared/types/relations/relationship.dto.interface';
import { Edge, Node } from '@swimlane/ngx-graph';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { clone } from 'ramda';
import { ESCAPE } from '@angular/cdk/keycodes';
import { pluck, takeUntil, tap } from 'rxjs';
import { isNotNil } from '@shared/utils/is-not-nil/is-not-nil';
import { ProfileService } from '@modules/profile/profile.service';
import { GRAPH, Layout } from '@modules/search/search-result/search-result-graph/layout';
import {
  RelationsListDialogComponent
} from '@modules/search/search-result/search-result-list/user-card/relations-list-dialog/relations-list-dialog.component';
import { NodesByEdgePipe } from '@modules/search/search-result/search-result-graph/nodes-by-edge.pipe';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { TuiAlertService, TuiDialogService, TuiNotification } from '@taiga-ui/core';
import { NodeHTMLIdPipe } from '@modules/search/search-result/search-result-graph/node-html-id.pipe';
import { nodeOverlayFade } from '@modules/search/search-result/search-result-graph/node-overlay-fade.animation';

interface INgxGraph extends IGraphDto {
  nodes: (IUserListItem & Node)[];
  edges: (IRelationshipDto & Edge)[];
}

@Component({
  selector: 'gh-search-result-graph',
  templateUrl: './search-result-graph.component.html',
  styleUrls: ['./search-result-graph.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TuiDestroyService, NodeHTMLIdPipe, NodesByEdgePipe],
  animations: [nodeOverlayFade],
})
export class SearchResultGraphComponent {
  private _ngxGraph: INgxGraph | null = null;

  readonly layout = new Layout();
  readonly NODE_SIZE = GRAPH.NODE_SIZE;
  nodeWithOverlay: IUserListItem | null = null;

  showUserCard = false;

  @Input() set graph(newGraph: IGraphDto | null) {
    if (!newGraph) {
      this._ngxGraph = null;
      return;
    }

    const ngxGraph = clone(newGraph);
    ngxGraph.edges = newGraph.edges.map(edge => ({
      ...edge,
      source: edge.fromUserId,
      target: edge.toUserId
    }));
    this._ngxGraph = ngxGraph as INgxGraph;
  }

  get ngxGraph(): INgxGraph | null {
    return this._ngxGraph;
  }

  selectedUserId$ = this.profile.selectedUser$.pipe(
    tap(() => this.closeNodeOverlay()),
    isNotNil(),
    pluck('id'),
    takeUntil(this.destroy$),
  );

  constructor(
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(TuiAlertService) private readonly alertService: TuiAlertService,
    @Inject(Injector) private readonly injector: Injector,
    private readonly profile: ProfileService,
    private readonly nodesByEdge: NodesByEdgePipe,
    private readonly nodeHTMLId: NodeHTMLIdPipe,
    private readonly destroy$: TuiDestroyService) {
  }

  @HostListener('document:keydown', ['$event.keyCode'])
  hideNodeInfoOverlayOnEscape(keyCode: number): void {
    if (keyCode === ESCAPE) {
      this.closeNodeOverlay();
    }
  }

  openRelations(selectedEdge: IRelationshipDto): void {
    if (!this.ngxGraph) {
      this.showRelationsListOpeningError();
      return;
    }

    const [fromUser, toUser] = this.nodesByEdge.transform(selectedEdge, this.ngxGraph.nodes);
    const relations = this.findEdgeWithSameUsers(this.ngxGraph.edges, selectedEdge);
    if (!fromUser || !toUser || !relations.length) {
      this.showRelationsListOpeningError();
      return;
    }

    this.dialogService.open(
      new PolymorpheusComponent(RelationsListDialogComponent, this.injector),
      {
        data: {
          fromUser,
          toUser,
          relations,
          selectedRelation: selectedEdge,
        },
        dismissible: true,
      }
    ).pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  openNodeOverlay(node: IUserListItem): void {
    this.nodeWithOverlay = node;
    this.showUserCard = true;
  }

  closeNodeOverlay(): void {
    this.nodeWithOverlay = null;
    this.showUserCard = false;
  }

  hideNodeUserCardIfClickedOutside(event: MouseEvent): void {
    const nodeWithOverlayElement = event.composedPath().find(target =>
      this.nodeWithOverlay !== null
        ? (target as Element).id === this.nodeHTMLId.transform(this.nodeWithOverlay.id)
        : false
    );

    if (!nodeWithOverlayElement) {
      this.closeNodeOverlay();
    }
  }

  private showRelationsListOpeningError(): void {
    this.alertService.open('Cannot open relations list', {
      label: 'Something went wrong',
      status: TuiNotification.Error,
      autoClose: true,
      hasCloseButton: true
    })
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  private findEdgeWithSameUsers(edges: IRelationshipDto[], selectedEdge: IRelationshipDto): IRelationshipDto[] {
    return edges.filter(edge => edge.toUserId === selectedEdge.toUserId &&
      edge.fromUserId === selectedEdge.fromUserId ||
      edge.toUserId === selectedEdge.fromUserId &&
      edge.fromUserId === selectedEdge.toUserId);
  }
}
