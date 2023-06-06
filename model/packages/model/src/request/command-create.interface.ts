import { INode } from '../nodes';
import { Action } from './action.enum';
import { ICrudCommand } from './command-crud.interface';

// TODO: create multiple
export interface ICreateCommand<T extends INode> extends ICrudCommand<T> {
  action: Action.CREATE;
  data: Omit<T, 'ref' | 'nodeType'>;
}
