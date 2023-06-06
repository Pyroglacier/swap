import { DataType, ICreateCommand, NodeType } from '@argens1203/swap-model';

import { BackendNode } from '../../nodes/models';

export class CreateRelationshipNodeDto {
    constructor(input: CreateRelationshipNodeDtoInput) {
        this.from = input.from;
        this.to = input.to;
        this.priority = input.priority ?? 0;
    }

    from: string;

    to: string;

    priority: number;

    toBackendNode(): ICreateCommand<BackendNode>['data'] {
        const { from, priority, to } = this;
        const data = JSON.stringify({ from, to, priority });
        return {
            data,
            dataType: DataType.STRING,
        };
    }
}

type CreateRelationshipNodeDtoInput = {
    from: string;
    to: string;
    priority?: number;
};
