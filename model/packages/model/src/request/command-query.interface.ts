import { INode } from '../nodes';
import { Action } from './action.enum';
import { ICrudCommand } from './command-crud.interface';

// TODO: more query methods
export interface IQueryCommand<T extends INode> extends ICrudCommand<T> {
  action: Action.QUERY;
  data: {
    ref: T['ref'];
  };
}
