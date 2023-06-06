import { INode } from '../node.interface';
import { DataType } from './data-type.enum';

export interface IEntityNode extends INode {
  ref: string;
  dataType: DataType;
  data: string;
}
