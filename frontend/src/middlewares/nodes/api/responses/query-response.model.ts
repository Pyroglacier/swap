import { IQueryResponse } from '@argens1203/swap-model';
import { classToPlain, plainToClass } from 'class-transformer';

import { logger } from '../../../../utils';
import { noOp } from '../../../node-entity/slices';
import { BackendNode } from '../../models';
import { Dispatchable } from '../../types';
import { NodeFactory } from '../../utils';

import { Response } from './response.model';

export class QueryResponse
    extends Response
    implements IQueryResponse<BackendNode>, Dispatchable
{
    constructor(input: Partial<QueryResponse> = {}) {
        super();
        Object.assign(this, input);
    }

    data!: BackendNode | BackendNode[];

    toDispatch() {
        if (Array.isArray(this.data)) {
            return this.data.map(QueryResponse.toDispatchSingle);
        }
        return QueryResponse.toDispatchSingle(this.data);
    }

    static toDispatchSingle(backendNode: BackendNode) {
        const node = NodeFactory.fromBackend(backendNode);
        return node ? node.toUpsertDispatch() : noOp();
    }

    toJson() {
        return classToPlain(this);
    }

    static fromJson(plain: Record<string, any>): QueryResponse | null {
        const queryResponse: QueryResponse = plainToClass(
            QueryResponse,
            plain
        ) as unknown as QueryResponse;
        if (!queryResponse?.data) {
            logger.error('Cannot deserialize response', plain);
            return null;
        }
        return queryResponse;
    }
}
