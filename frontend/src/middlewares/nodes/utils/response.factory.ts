import { Resolution } from '@argens1203/swap-model';

import {
    CreateResponse,
    DeleteResponse,
    QueryResponse,
} from '../api/responses';
import { Response } from '../api/types';
import { BackendNode } from '../models';
import { Dispatchable } from '../types';

export class ResponseFactory {
    static getResponse(
        plain: Record<string, any> = {}
    ): (Dispatchable & Response<BackendNode>) | null {
        switch (plain.resolution) {
            case Resolution.DELETED:
                return DeleteResponse.fromJson(plain);
            case Resolution.CREATED:
                return CreateResponse.fromJson(plain);
            default:
                return QueryResponse.fromJson(plain);
        }
    }
}
