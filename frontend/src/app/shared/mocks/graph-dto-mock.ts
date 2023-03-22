import { IGraphDto } from '@shared/types/relations/graph.dto.interface';
import { relationshipDtoMock } from '@shared/mocks/relationship-dto-mock';
import { userListItemsDtoMock } from '@shared/mocks/user-list-items-dto-mock';

export const graphDtoMock: IGraphDto =
  {
    nodes: userListItemsDtoMock,
    edges: relationshipDtoMock,
  };
