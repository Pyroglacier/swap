import { INode } from '../nodes';
import { Resolution } from './resolution.enum';
import { ICrudResponse } from './response-crud.interface';

export interface IDeleteResponse<T extends INode> extends ICrudResponse<T> {
  resolution: Resolution;
  data: {
    ref: T['ref'];
  };
}
