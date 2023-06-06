import { DataType, NodeType } from '@argens1203/swap-model';

import { Response } from '../nodes/api/types';
import { BackendNode } from '../nodes/models';
import { CommandBuilder } from '../nodes/utils';
import { Storage } from '../persistent';

import { CreateRelationshipNodeDto } from './models/create-relationship-node.dto';

export async function createRelationship(
    dto: CreateRelationshipNodeDto
): Promise<Response<BackendNode>[]> {
    const command = new CommandBuilder(NodeType.RELATIONSHIP)
        .createEntity(dto.toBackendNode())
        .getCommand();

    return await Storage.submit(command);
}
