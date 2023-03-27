import { IGetRelationRequestsDto } from '@shared/types/relations/get-relation-requests.dto.interface';
import { RelationType } from '@shared/types/relations/relation-type.enum';

export const declinedRelationRequestsDtoMock: IGetRelationRequestsDto[] = [
  {
    requests: [
      {
        id: '1',
        declined: true,
        createdAt: '2022-07-30',
        declinedBy: '111',
        toUserId: '111',
        fromUserId: '123',
        type: RelationType.Supervised,
        startAt: '2021-01-01',
        endAt: '2022-07-12',
        comment: '',
        description: 'Was my student',
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
      avatarSrc: 'https://i.pravatar.cc/128?u=janesmith',
      id: '111',
      email: 'chestnou@yahoo.eu',
      firstName: 'Max',
      lastName: 'Muster',
      hourlyRate: 45,
    },
  },

  {
    requests: [
      {
        id: '2',
        declined: true,
        createdAt: '2022-08-12',
        declinedBy: '222',
        toUserId: '222',
        fromUserId: '123',
        type: RelationType.Teammates,
        startAt: '2021-02-01',
        endAt: '2022-08-12',
        comment: '',
        description: 'Worked together at the same project',
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
      avatarSrc: 'https://i.pravatar.cc/128?u=alexbrown',
      id: '222',
      email: 'browneez@gmail.com',
      firstName: 'Alex',
      lastName: 'Brown',
      hourlyRate: 50,
    },
  },

  {
    requests: [
      {
        id: '3',
        declined: true,
        createdAt: '2022-09-01',
        declinedBy: '333',
        toUserId: '333',
        fromUserId: '123',
        type: RelationType.StudiedWith,
        startAt: '2021-03-01',
        endAt: '2022-09-01',
        comment: '',
        description: 'Studied together on the same frontend course',
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
      avatarSrc: 'https://i.pravatar.cc/128?u=chestnou',
      id: '333',
      email: 'janesmith@outlook.com',
      firstName: 'Jane',
      lastName: 'Smith',
      hourlyRate: 60,
    },
  },

  {
    requests: [
      {
        id: '4',
        declined: true,
        createdAt: '2023-03-03',
        declinedBy: '123',
        toUserId: '123',
        fromUserId: '444',
        type: RelationType.WorksWith,
        startAt: '2020-05-01',
        endAt: '2021-10-31',
        comment: '',
        description: 'Work together at Alibaba',
      }
    ],
    fromUser: {
      avatarSrc: 'https://randomuser.me/api/portraits/men/5.jpg',
      id: '999',
      email: 'test@test.email',
      firstName: 'David',
      lastName: 'Johnson',
      hourlyRate: 20,
    },
    toUser: {
      avatarSrc: 'https://taiga-ui.dev/assets/images/avatar.jpg',
      id: '123',
      email: 'test@test.email',
      firstName: 'John',
      lastName: 'Smith',
      hourlyRate: 45,
    },
  },
];
