import { logger } from '../../../utils';
import { BackendNode } from '../../nodes/models';
import { INode } from '../../nodes/types';
import { addRelationship, removeRelationship } from '../slice';

import { CreateRelationshipNodeDto } from './create-relationship-node.dto';

export class RelationshipNode
    extends CreateRelationshipNodeDto
    implements INode
{
    constructor(input: RelationshipNodeInput) {
        super(input);
        this.ref = input.ref;
    }

    ref: string;

    static fromBackend(backendNode: BackendNode): RelationshipNode | null {
        const { ref, data } = backendNode;
        let from;
        let to;
        let priority;
        try {
            if (data) {
                const parsed = JSON.parse(data);
                from = parsed.from;
                to = parsed.to;
                priority = parsed.priority;
            }
        } catch (e) {
            logger.error(e);
        }
        if (from && to && priority !== undefined && ref) {
            return new RelationshipNode({ ref, from, to, priority });
        }
        return null;
    }

    toUpsertDispatch() {
        return addRelationship(this);
    }

    toRemoveDispatch() {
        return removeRelationship({ ref: this.ref });
    }
}

type RelationshipNodeInput = {
    ref: string;
    from: string;
    to: string;
    priority: number;
};
