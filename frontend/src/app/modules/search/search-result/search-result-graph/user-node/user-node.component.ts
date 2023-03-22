import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IUserListItem } from '@shared/types/user/user-list-item.dto.interface';
import { Node } from '@swimlane/ngx-graph';
import { DEFAULT_AVATAR_URL } from '@shared/constants';

@Component({
  selector: '[ghUserNode]',
  templateUrl: './user-node.component.html',
  styleUrls: ['./user-node.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserNodeComponent {
  @Input() node!: IUserListItem & Node;
  @Input() isSelected = false;
  @Input() avatarUrl = DEFAULT_AVATAR_URL;

  @Input('aria-label') ariaLabel = '';
  @Input('aria-haspopup') ariaHasPopup = '';

  mouseMoveStartPoint = {x: 0, y: 0};
  private mouseMovedDistance = 0;

  @Output() readonly nodeClick = new EventEmitter<IUserListItem & Node>();

  emitNodeClick(selectedNode: IUserListItem & Node): void {
    if (this.mouseMovedDistance <= 15) {
      this.nodeClick.emit(selectedNode);
    }
    this.mouseMovedDistance = 0;
    this.mouseMoveStartPoint = {x: 0, y: 0};
  }

  onNodeMouseMove(event: MouseEvent): void {
    const dx = this.mouseMoveStartPoint.x || event.x - event.x;
    const dy = this.mouseMoveStartPoint.y || event.y - event.y;
    this.mouseMovedDistance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
  }
}
