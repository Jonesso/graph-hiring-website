import { RelationType } from '../relations/relation-type.enum';

export enum Languages {
  English = 'English',
  French = 'French',
  German = 'German',
  Spanish = 'Spanish',
  Chinese = 'Chinese',
  Russian = 'Russian',
  Hindi = 'Hindi',
  Arabic = 'Arabic',
  Japanese = 'Japanese',
}

export enum WorkType {
  Onsite = 'Onsite',
  Remote = 'Remote',
  Hybrid = 'Hybrid'
}

export interface ISearchParamsDto {
  search?: string;
  rateRange?: number[];
  networkSize?: number;
  relationTypes?: RelationType[];
  experience?: number;
  languages?: Languages[];
  workType?: WorkType | null;
  fromUserId?: string;
}
