import { INode } from '../nodes';
import { IResponse } from './response.interface';

export interface ICrudResponse<T extends INode> extends IResponse {
  nodeType: T['nodeType'];
}
