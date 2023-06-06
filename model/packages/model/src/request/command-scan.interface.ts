import { INode } from '../nodes';
import { Action } from './action.enum';
import { ICrudCommand } from './command-crud.interface';

export interface IScanCommand<T extends INode> extends ICrudCommand<T> {
  action: Action.SCAN;
}
