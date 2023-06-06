import { IResponse, NodeType } from '@argens1203/swap-model';

export class Response implements IResponse {
    success!: boolean;

    ref?: string;

    nodeType!: NodeType;
}
