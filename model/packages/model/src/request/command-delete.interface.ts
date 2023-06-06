import { INode } from '../nodes';
import { Action } from './action.enum';
import { ICrudCommand } from './command-crud.interface';

export interface IDeleteCommand<T extends INode> extends ICrudCommand<T> {
  action: Action.DELETE;
  data: {
    ref: T['ref'];
  };
}
