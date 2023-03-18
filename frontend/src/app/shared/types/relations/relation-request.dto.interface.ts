import { IRelation } from './relation.interface';

export interface IRelationRequestDto extends IRelation {
  id: string;
  declined: boolean;
  createdAt: string;
  declinedBy?: string;
  toUserId: string;
  fromUserId: string;
}
