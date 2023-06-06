import {
    ICreateResponse,
    IDeleteResponse,
    INode,
    IQueryResponse,
    IScanResponse,
} from '@argens1203/swap-model';

export type Response<T extends INode> =
    | ICreateResponse<T>
    | IScanResponse<T>
    | IQueryResponse<T>
    | IDeleteResponse<T>;
