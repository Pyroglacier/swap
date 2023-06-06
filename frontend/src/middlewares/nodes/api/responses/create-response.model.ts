import { ICreateResponse, Resolution } from '@argens1203/swap-model';
import { classToPlain, plainToClass } from 'class-transformer';

import { logger } from '../../../../utils';
import { noOp } from '../../../node-entity/slices';
import { BackendNode } from '../../models';
import { Dispatchable } from '../../types';
import { NodeFactory } from '../../utils';

import { Response } from './response.model';

export class CreateResponse
    extends Response
    implements ICreateResponse<BackendNode>, Dispatchable
{
    constructor(input: Partial<CreateResponse> = {}) {
        super();
        Object.assign(this, input);
    }

    resolution!: Resolution;

    data!: BackendNode;

    toDispatch() {
        const node = NodeFactory.fromBackend(this.data);
        return node ? node.toUpsertDispatch() : noOp();
    }

    toJson() {
        return classToPlain(this);
    }

    static fromJson(plain: Record<string, any>): CreateResponse | null {
        const createResponse: CreateResponse = plainToClass(
            CreateResponse,
            plain
        ) as unknown as CreateResponse;
        if (!createResponse?.resolution || !createResponse?.data) {
            logger.error('Cannot deserialize response', plain);
            return null;
        }
        return createResponse;
    }
}
