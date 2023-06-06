import { DataType, NodeType } from '@argens1203/swap-model';

import { Response } from '../nodes/api/types';
import { BackendNode } from '../nodes/models';
import { CommandBuilder } from '../nodes/utils';
import { Storage } from '../persistent';

export async function createEntity(
    sketch: string
): Promise<Response<BackendNode>[]> {
    const command = new CommandBuilder(NodeType.ENTITY)
        .createEntity({
            dataType: DataType.STRING,
            data: sketch,
        })
        .getCommand();
    return await Storage.submit(command);
}
