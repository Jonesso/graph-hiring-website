import { IUserDto } from '@shared/types/user/user.dto.interface';

export type IRelationRequestUserDto = Pick<IUserDto,
  'firstName' | 'lastName' | 'id' | 'email' | 'hourlyRate' | 'avatarSrc'>;
