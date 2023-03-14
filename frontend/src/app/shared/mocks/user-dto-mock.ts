import { IUserDto } from '@shared/types/user/user.dto.interface';
import { Languages, WorkType } from '@shared/types/search/search-params.dto.interface';

export const userDtoMock: IUserDto = {
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
};
