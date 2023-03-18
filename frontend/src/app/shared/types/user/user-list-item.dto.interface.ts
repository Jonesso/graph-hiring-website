import { IUserDto } from './user.dto.interface';

export type IUserListItem = IUserDto & {
  relationsCount: number,
  relationsWithOriginCount: number,
  networkSize: number,
  intermediate: boolean
}
