import { INode } from '../nodes';
import { ICrudResponse } from './response-crud.interface';

export interface IQueryResponse<T extends INode> extends ICrudResponse<T> {
  data: T | T[];
}
