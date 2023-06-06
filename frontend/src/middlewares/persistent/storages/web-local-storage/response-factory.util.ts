import {
    ICreateResponse,
    IDeleteResponse,
    IQueryResponse,
    NodeType,
    Resolution,
} from '@argens1203/swap-model';

import { BackendNode } from '../../../nodes/models';

export class ResponseFactory {
    static toCreateResponse(data: BackendNode): ICreateResponse<BackendNode> {
        return {
            success: true,
            nodeType: data.nodeType,
            resolution: Resolution.CREATED,
            data,
        };
    }

    static toQueryResponse(data: BackendNode[]): IQueryResponse<BackendNode> {
        return {
            success: true,
            nodeType: data[0].nodeType,
            data,
        };
    }

    static toDeleteResponse(
        nodeType: NodeType,
        ref: BackendNode['ref']
    ): IDeleteResponse<BackendNode> {
        return {
            success: true,
            nodeType,
            resolution: Resolution.DELETED,
            data: { ref },
        };
    }

    static toScanResponse(data: BackendNode[]) {
        return {
            success: true,
            nodeType: data[0].nodeType,
            data,
        };
    }
}
