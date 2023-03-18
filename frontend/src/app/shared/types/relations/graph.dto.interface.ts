import { IUserListItem } from '@shared/types/user/user-list-item.dto.interface';
import { IRelationshipDto } from '@shared/types/relations/relationship.dto.interface';

export interface IGraphDto {
  nodes: IUserListItem[];
  edges: IRelationshipDto[];
}
