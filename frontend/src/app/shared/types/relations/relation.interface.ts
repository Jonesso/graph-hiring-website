import { RelationType } from './relation-type.enum';

export interface IRelation {
  type: RelationType;
  startAt: string;
  endAt: string | null;
  comment: string;
  description: string;
}
