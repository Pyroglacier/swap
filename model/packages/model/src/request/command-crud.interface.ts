import { INode } from '../nodes';
import { ICommand } from './command.interface';

export interface ICrudCommand<T extends INode> extends ICommand {
  nodeType: T['nodeType'];
}
