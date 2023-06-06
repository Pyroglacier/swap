import { RelationshipNode } from '../models';

const initialLookup: { [ref: string]: RelationshipNode } = {};

const initialForwardQuery: {
    [attachedTo: string]: {
        [attaching: string]: string;
    };
} = {};

const initialBackwardQuery: {
    [attaching: string]: {
        [attachedTo: string]: string;
    };
} = {};

export const initialRelationshipState = {
    lookup: initialLookup,
    fowardQuery: initialForwardQuery,
    backwardQuery: initialBackwardQuery,
};

export type RelationshipSliceType = typeof initialRelationshipState;
