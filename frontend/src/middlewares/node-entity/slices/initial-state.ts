import { EntityNode } from '../models';

const initialEntityLookup: {
    [id: string]: EntityNode;
} = {};

export const initialEntityState = {
    lookup: initialEntityLookup,
};
export type EntityState = typeof initialEntityState;
