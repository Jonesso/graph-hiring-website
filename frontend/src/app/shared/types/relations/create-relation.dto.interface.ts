import { IRelation } from '@shared/types/relations/relation.interface';

export interface ICreateRelationDto extends IRelation {
  toUserId: string;
  fromUserId: string;
}
