import {Languages, WorkType} from '../search/search-params.dto.interface';

export interface IUserDto {
  avatarSrc: string;
  id: string;
  createdAt: string;
  email: string;
  firstName: string;
  lastName: string | null;
  phone: string | null;
  about: string | null;
  workType: WorkType | null;
  experience: number | null;
  languages: Languages[];
  keywords: string[];
  hourlyRate: number | null;
}
