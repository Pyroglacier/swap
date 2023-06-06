import { NodeType } from '@argens1203/swap-model';

import { EntityNode } from '../../node-entity/models';
import { RelationshipNode } from '../../node-relationship/models';
import { BackendNode } from '../models';
import { INode } from '../types';

export class NodeFactory {
    static fromBackend(backendNode: BackendNode): INode | null {
        switch (backendNode.nodeType) {
            case NodeType.RELATIONSHIP:
                return RelationshipNode.fromBackend(backendNode);
            case NodeType.ENTITY:
                return EntityNode.fromBackend(backendNode);
            default:
                return null;
        }
    }
}
