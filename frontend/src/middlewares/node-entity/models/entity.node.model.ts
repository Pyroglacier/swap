import { DataType, NodeType } from '@argens1203/swap-model';

import { BackendNode } from '../../nodes/models';
import { INode } from '../../nodes/types';
import { removeEntity, upsertEntity } from '../slices';

export class EntityNode implements INode {
    constructor(input: EntityNodeInput) {
        const { ref, data, dataType } = input;
        this.ref = ref;
        this.data = data;
        this.dataType = dataType;
    }

    ref: string;

    data?: string;

    dataType?: string;

    preferredPresentation?: string = 'SKETCH';

    static fromBackend(n: BackendNode): EntityNode | null {
        const { ref, dataType = DataType.STRING, data = '', nodeType } = n;
        if (!ref) {
            return null;
        }
        if (nodeType !== NodeType.ENTITY) {
            return null;
        }
        return new EntityNode({ ref, dataType, data });
    }

    toUpsertDispatch() {
        return upsertEntity(this);
    }

    toRemoveDispatch() {
        return removeEntity(this.ref);
    }
}

type EntityNodeInput = {
    ref: string;
    data?: string;
    dataType?: DataType;
};
