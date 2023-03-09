import {IUserDto} from "@shared/types/user/user.dto.interface";

export type IPatchUserDto = Partial<Omit<IUserDto, 'id' | 'createdAt' | 'avatarSrc'>>;
