import { Languages, WorkType } from '@shared/types/search/search-params.dto.interface';
import { IUserListItem } from '@shared/types/user/user-list-item.dto.interface';

export const userListItemsDtoMock: IUserListItem[] = [
  {
    avatarSrc: 'https://taiga-ui.dev/assets/images/avatar.jpg',
    id: '123',
    createdAt: '2023-03-11',
    email: 'test@test.email',
    firstName: 'John',
    lastName: 'Smith',
    phone: '88005553535',
    about: 'Frontend developer, Angular enthusiast, Taiga UI creator and maintainer.',
    workType: WorkType.Hybrid,
    experience: 2,
    languages: [Languages.English, Languages.German, Languages.Russian],
    keywords: ['IT', 'Frontend', 'JavaScript', 'TypeScript', 'Angular'],
    hourlyRate: 45,
    relationsCount: 20,
    relationsWithOriginCount: 4,
    networkSize: 3,
    intermediate: false,
  },
  {
    avatarSrc: 'https://i.pravatar.cc/128?u=user%60',
    id: '456',
    createdAt: '2023-03-14',
    email: 'example@example.email',
    firstName: 'Jane',
    lastName: 'Doe',
    phone: '88005553535',
    about: 'Full-stack developer, ReactJS enthusiast, Material UI creator and maintainer.',
    workType: WorkType.Remote,
    experience: 4,
    languages: [Languages.English, Languages.Spanish, Languages.French],
    keywords: ['IT', 'Full-stack', 'JavaScript', 'ReactJS', 'Material UI'],
    hourlyRate: 60,
    relationsCount: 30,
    relationsWithOriginCount: 8,
    networkSize: 2,
    intermediate: false,
  },
  {
    avatarSrc: 'https://i.pravatar.cc/789?u=userr',
    id: '789',
    createdAt: '2023-03-15',
    email: 'user@example.email',
    firstName: 'Alex',
    lastName: 'Johnson',
    phone: '555-555-5555',
    about: 'Backend developer, NodeJS enthusiast, ExpressJS creator and maintainer.',
    workType: WorkType.Onsite,
    experience: 6,
    languages: [Languages.English, Languages.Chinese, Languages.Arabic],
    keywords: ['IT', 'Backend', 'JavaScript', 'NodeJS', 'ExpressJS'],
    hourlyRate: 80,
    relationsCount: 50,
    relationsWithOriginCount: 12,
    networkSize: 4,
    intermediate: true,
  },
  {
    avatarSrc: 'assets/default-user-avatar.svg',
    id: '246',
    createdAt: '2023-03-16',
    email: 'jane.doe@example.email',
    firstName: 'Chloe',
    lastName: 'Morgan',
    phone: '123-456-7890',
    about: 'UI/UX designer, Figma enthusiast.',
    workType: WorkType.Remote,
    experience: 8,
    languages: [Languages.English, Languages.French, Languages.Japanese],
    keywords: ['Design', 'UI/UX', 'Figma', 'Material Design'],
    hourlyRate: 20,
    relationsCount: 100,
    relationsWithOriginCount: 20,
    networkSize: 3,
    intermediate: false,
  }
];
