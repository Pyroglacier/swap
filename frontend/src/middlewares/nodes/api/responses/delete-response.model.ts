import { IDeleteResponse, NodeType, Resolution } from '@argens1203/swap-model';
import { classToPlain, plainToClass } from 'class-transformer';

import { logger } from '../../../../utils';
import { noOp, removeEntity } from '../../../node-entity/slices';
import { BackendNode } from '../../models';
import { Dispatchable } from '../../types';
import { NodeFactory } from '../../utils';

import { RefObject } from './ref-object.model';
import { Response } from './response.model';

export class DeleteResponse
    extends Response
    implements IDeleteResponse<BackendNode>, Dispatchable
{
    constructor(input: Partial<DeleteResponse> = {}) {
        super();
        Object.assign(this, input);
    }

    resolution!: Resolution;

    data!: RefObject;

    toDispatch() {
        const node = NodeFactory.fromBackend({
            ...this.data,
            nodeType: this.nodeType,
        });
        return node ? node.toRemoveDispatch() : noOp();
    }

    toJson() {
        return classToPlain(this);
    }

    static fromJson(plain: Record<string, any>): DeleteResponse | null {
        logger.info(plain);
        const deleteResponse = plainToClass(
            DeleteResponse,
            plain
        ) as unknown as DeleteResponse;
        if (!deleteResponse?.resolution || !deleteResponse?.data) {
            logger.error('Cannot deserialize response', plain);
            return null;
        }
        return deleteResponse;
    }
}
