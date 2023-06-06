import { NodeType, DataType, INode } from '@argens1203/swap-model';

export class BackendNode implements INode {
    constructor(input: Partial<BackendNode> = {}) {
        Object.assign(this, input);
    }

    ref!: string;

    nodeType!: NodeType;

    data?: string;

    dataType?: DataType;
}
