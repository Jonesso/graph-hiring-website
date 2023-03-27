import { IRelationshipDto } from '@shared/types/relations/relationship.dto.interface';
import { RelationType } from '@shared/types/relations/relation-type.enum';

export const relationshipDtoMock: IRelationshipDto[] = [
  {
    id: '1',
    createdAt: '2023-03-11',
    fromUserId: '123',
    toUserId: '456',
    type: RelationType.StudiedWith,
    startAt: '2019-09-03',
    endAt: '2023-06-05',
    description: 'Studied at the same university',
  },
  // {
  //   id: '11',
  //   createdAt: '2023-03-11',
  //   fromUserId: '456',
  //   toUserId: '123',
  //   type: RelationType.StudiedWith,
  //   startAt: '2019-09-03',
  //   endAt: '2023-06-05',
  //   description: 'Studied at the same university',
  // },
  {
    id: '2',
    createdAt: '2022-10-11',
    fromUserId: '456',
    toUserId: '789',
    type: RelationType.SubordinateTo,
    startAt: '2022-10-11',
    endAt: '2027-01-01',
    description: 'Worked as a subordinate',
  },
  {
    id: '22',
    createdAt: '2022-10-11',
    fromUserId: '789',
    toUserId: '456',
    type: RelationType.Supervised,
    startAt: '2022-10-11',
    endAt: '2027-01-01',
    description: 'Supervised this person',
  },
  {
    id: '3',
    createdAt: '2022-04-05',
    fromUserId: '246',
    toUserId: '123',
    type: RelationType.Teammates,
    startAt: '2020-07-25',
    endAt: '2021-09-25',
    description: 'Worked together at Eventbrite',
  },
  // {
  //   id: '33',
  //   createdAt: '2022-04-05',
  //   fromUserId: '123',
  //   toUserId: '246',
  //   type: RelationType.Teammates,
  //   startAt: '2020-07-25',
  //   endAt: '2021-09-25',
  //   description: 'Worked together at Eventbrite',
  // },
];