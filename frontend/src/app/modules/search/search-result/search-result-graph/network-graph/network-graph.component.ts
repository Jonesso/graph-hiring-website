import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  NgZone,
  ViewEncapsulation
} from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { Edge, GraphComponent, Node } from '@swimlane/ngx-graph';
import { LayoutService } from '@swimlane/ngx-graph/lib/graph/layouts/layout.service';
import { select } from 'd3-selection';
import { easeSinInOut } from 'd3-ease';


@Component({
  selector: 'gh-network-graph',
  templateUrl: './network-graph.component.html',
  styleUrls: ['./network-graph.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('animationState', [
      transition(':enter', [style({opacity: 0}), animate('500ms 100ms', style({opacity: 1}))])
    ])
  ]
})
export class NetworkGraphComponent extends GraphComponent {

  constructor(private _el: ElementRef,
              public override zone: NgZone,
              public override cd: ChangeDetectorRef) {
    super(_el, zone, cd, null as unknown as LayoutService);
  }

  override redrawEdge(edge: Edge): void {
    this.calcDominantBaseline(edge);
    edge.oldLine = edge.line;
  }

  override redrawLines(_animate = this.animate): void {
    this.linkElements.map(linkEl => {
      const edge = this.graph.edges.find(lin => lin.id === linkEl.nativeElement.id);

      if (edge) {
        const linkSelection = select(linkEl.nativeElement).select('.line');
        linkSelection
          .attr('d', edge.oldLine)
          .transition()
          .ease(easeSinInOut)
          .duration(_animate ? 500 : 0)
          .attr('d', edge.line || '');

        const textPathSelection = select(this._el.nativeElement).select(`#EDGE${edge.id}`);
        textPathSelection
          .attr('d', edge.oldTextPath || '')
          .transition()
          .ease(easeSinInOut)
          .duration(_animate ? 500 : 0)
          .attr('d', edge.textPath || '');

        // @ts-ignore
        this.updateMidpointOnEdge(edge, edge.points);
      }
    });
  }

  override tick(): void {
    // Transposes view options to the node
    const oldNodes: Set<string> = new Set();
    this.graph.nodes.map(n => {
      // n.transform = this.getTranslateString(n);
      if (!n.data) {
        n.data = {};
      }
      oldNodes.add(n.id);
    });

    const oldClusters: Set<string> = new Set();
    (this.graph.clusters || []).map(n => {
      n.transform = this.getTranslateString(n);
      if (!n.data) {
        n.data = {};
      }
      oldClusters.add(n.id);
    });

    // Prevent animations on new nodes
    setTimeout(() => {
      this.oldNodes = oldNodes;
      this.oldClusters = oldClusters;
    }, 500);

    // Update the labels to the new positions
    const newLinks = [];
    // tslint:disable-next-line:forin
    for (const edgeLabelId in this.graph.edgeLabels) {
      const edgeLabel = this.graph.edgeLabels[edgeLabelId];

      const normKey = edgeLabelId.replace(/[^\w-]*/g, '');

      const isMultigraph =
        this.layout && typeof this.layout !== 'string' && this.layout.settings && this.layout.settings.multigraph;

      let oldLink = isMultigraph
        ? this._oldLinks.find(ol => `${ol.source}${ol.target}${ol.id}` === normKey)
        : this._oldLinks.find(ol => `${ol.source}${ol.target}` === normKey);

      const linkFromGraph = isMultigraph
        ? this.graph.edges.find(nl => `${nl.source}${nl.target}${nl.id}` === normKey)
        : this.graph.edges.find(nl => `${nl.source}${nl.target}` === normKey);

      if (!oldLink) {
        oldLink = linkFromGraph || edgeLabel;
      } else if (
        oldLink.data &&
        linkFromGraph &&
        linkFromGraph.data &&
        JSON.stringify(oldLink.data) !== JSON.stringify(linkFromGraph.data)
      ) {
        // Compare old link to new link and replace if not equal
        oldLink.data = linkFromGraph.data;
      }

      // @ts-ignore
      oldLink.oldLine = oldLink.line;

      const points = edgeLabel.points;

      const newLink = Object.assign({}, oldLink);
      newLink.line = oldLink?.line;
      newLink.points = points;

      // @ts-ignore
      this.updateMidpointOnEdge(newLink, points);

      const textPos = points[Math.floor((points.length) / 2)];
      if (textPos) {
        newLink.textTransform = `translate(${textPos.x || 0},${textPos.y || 0})`;
      }

      newLink.textAngle = 0;
      if (!newLink.oldLine) {
        newLink.oldLine = newLink.line;
      }

      this.calcDominantBaseline(newLink);
      newLinks.push(newLink);
    }

    this.graph.edges = newLinks;

    // Map the old links for animations
    if (this.graph.edges) {
      this._oldLinks = this.graph.edges.map(l => {
        const newL = Object.assign({}, l);
        newL.oldLine = l.line;
        return newL;
      });
    }

    this.updateMinimap();

    if (this.autoZoom) {
      this.zoomToFit();
    }

    if (this.autoCenter) {
      // Auto-center when rendering
      this.center();
    }

    requestAnimationFrame(() => this.redrawLines());
    this.cd.markForCheck();
  }

  override onZoom($event: WheelEvent, direction: 'in' | 'out'): void {
    if (this.enableTrackpadSupport && !$event.ctrlKey) {
      this.pan($event.deltaX * -1, $event.deltaY * -1);
      return;
    }
    const zoomFactor = 1 + (direction === 'in' ? this.zoomSpeed : -this.zoomSpeed);
    // Check that zoom wouldn't put us out of bounds
    const newZoomLevel = this.zoomLevel * zoomFactor;
    if (newZoomLevel <= this.minZoomLevel || newZoomLevel >= this.maxZoomLevel) {
      return;
    }

    if (!this.enableZoom) {
      return;
    }
    if (this.panOnZoom && $event) {
      // Absolute mouse X/Y on the screen
      const mouseX = $event.clientX;
      const mouseY = $event.clientY;

      // Transform the mouse X/Y into a SVG X/Y
      const svg = this._el.nativeElement.querySelector('svg');
      const svgGroup = svg.querySelector('g.chart');
      const point = svg.createSVGPoint();
      point.x = mouseX;
      point.y = mouseY;
      const svgPoint = point.matrixTransform(svgGroup.getScreenCTM().inverse());

      // Pan zoom
      this.pan(svgPoint.x, svgPoint.y, true);
      this.zoom(zoomFactor);
      this.pan(-svgPoint.x, -svgPoint.y, true);
    } else {
      this.zoom(zoomFactor);
    }
  }

  private getTranslateString = (n: Pick<Node, 'position' | 'dimension'>) =>
    `translate(${(n.position?.x || 0) - (n.dimension?.width || 0) / 2 || 0},
               ${(n.position?.y || 0) - (n.dimension?.height || 0) / 2 || 0})`;
}
