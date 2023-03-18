import { IRelationshipDto } from '@shared/types/relations/relationship.dto.interface';
import { RelationType } from '@shared/types/relations/relation-type.enum';

export const userListItemsDtoMock: IRelationshipDto[] = [
  {
    id: '123',
    createdAt: '2023-03-11',
    fromUserId: '123',
    toUserId: '666',
    type: RelationType.StudiedWith,
    startAt: '2019-09-03',
    endAt: '2023-06-05',
    description: 'Studied at the same university',
  },
  {
    id: '123',
    createdAt: '2022-10-11',
    fromUserId: '123',
    toUserId: '1000',
    type: RelationType.SubordinateTo,
    startAt: '2022-10-11',
    endAt: '2027-01-01',
    description: 'Worked as a subordinate',
  },

];
