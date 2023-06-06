import {
    ICreateCommand,
    IDeleteCommand,
    IQueryCommand,
    IScanCommand,
    INode,
} from '@argens1203/swap-model';

export type Command<T extends INode> =
    | ICreateCommand<T>
    | IScanCommand<T>
    | IDeleteCommand<T>
    | IQueryCommand<T>;
