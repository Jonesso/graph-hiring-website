import { IGetRelationRequestsDto } from '@shared/types/relations/get-relation-requests.dto.interface';
import { RelationType } from '@shared/types/relations/relation-type.enum';

export const pendingRelationRequestsDtoMock: IGetRelationRequestsDto[] = [
  {
    requests: [
      {
        id: '1',
        declined: false,
        createdAt: '2022-07-30',
        toUserId: '1000',
        fromUserId: '123',
        type: RelationType.Teammates,
        startAt: '2021-01-01',
        endAt: '2022-07-12',
        comment: '',
        description: 'Worked together at the same company',
      }
    ],
    fromUser: {
      avatarSrc: 'https://taiga-ui.dev/assets/images/avatar.jpg',
      id: '123',
      email: 'test@test.email',
      firstName: 'John',
      lastName: 'Smith',
      hourlyRate: 45,
    },
    toUser: {
      avatarSrc: 'https://i.pravatar.cc/128?u=clussteer',
      id: '1000',
      email: 'clussteer@yahoo.com',
      firstName: 'Leo',
      lastName: 'Kadinsky',
      hourlyRate: 50,
    },
  },

  {
    requests: [
      {
        id: '2',
        declined: false,
        createdAt: '2022-08-12',
        toUserId: '2000',
        fromUserId: '234',
        type: RelationType.SubordinateTo,
        startAt: '2021-02-01',
        endAt: '2022-08-12',
        comment: '',
        description: 'Supervised by this person',
      }
    ],
    fromUser: {
      avatarSrc: 'https://taiga-ui.dev/assets/images/avatar.jpg',
      id: '123',
      email: 'test@test.email',
      firstName: 'John',
      lastName: 'Smith',
      hourlyRate: 45,
    },
    toUser: {
      avatarSrc: 'https://i.pravatar.cc/128?u=jackroberts',
      id: '2000',
      email: 'jackroberts@gmail.com',
      firstName: 'Jack',
      lastName: 'Roberts',
      hourlyRate: 70,
    },
  },

  {
    requests: [
      {
        id: '3',
        declined: false,
        createdAt: '2022-09-01',
        toUserId: '3000',
        fromUserId: '345',
        type: RelationType.Teammates,
        startAt: '2021-03-01',
        endAt: '2022-09-01',
        comment: '',
        description: 'Worked together in a startup',
      }
    ],
    fromUser: {
      avatarSrc: 'https://taiga-ui.dev/assets/images/avatar.jpg',
      id: '123',
      email: 'test@test.email',
      firstName: 'John',
      lastName: 'Smith',
      hourlyRate: 45,
    },
    toUser: {
      avatarSrc: 'https://i.pravatar.cc/128?u=johnstewart',
      id: '3000',
      email: 'johnstewart77@inbox.com',
      firstName: 'John',
      lastName: 'Stewart',
      hourlyRate: 45,
    },
  },
];
