import { INode } from '../nodes';
import { Resolution } from './resolution.enum';
import { ICrudResponse } from './response-crud.interface';

export interface ICreateResponse<T extends INode> extends ICrudResponse<T> {
  resolution: Resolution;
  data: T;
}
