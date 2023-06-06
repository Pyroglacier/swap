import { NodeType } from '@argens1203/swap-model';

import { Response } from '../nodes/api/types';
import { BackendNode } from '../nodes/models';
import { CommandBuilder } from '../nodes/utils';
import { Storage } from '../persistent';

export async function getEntities(): Promise<Response<BackendNode>[]> {
    const command = new CommandBuilder(NodeType.ENTITY)
        .scanEntity()
        .getCommand();
    return await Storage.submit(command);
}
