import { createSlice } from '@reduxjs/toolkit';

import { logger } from '../../../utils/logger';
import { MIN_PRIORITY } from '../constants';
import { RelationshipNode } from '../models';

import { initialRelationshipState } from './initial-state';

const relationshipSlice = createSlice({
    name: 'relationship',
    initialState: initialRelationshipState,
    reducers: {
        // Does not check relationship type. Do it in thunk
        addRelationship: (state, action) => {
            const { ref, from, to, priority = MIN_PRIORITY } = action.payload;
            logger.info('Adding relationship to slice');
            logger.info(action.payload);
            if (state.lookup[ref]) {
                logger.warn(
                    `Fail to add relationship - Relationship Ref: ${ref} already exists.`
                );
                return;
            }
            if (!ref || !from || !to) {
                logger.warn(`Fail to add relationship - Incorrect input`);
                return;
            }
            if (!state.fowardQuery[from]) {
                state.fowardQuery[from] = {};
            }
            state.fowardQuery[from][to] = ref;

            if (!state.backwardQuery[to]) {
                state.backwardQuery[to] = {};
            }
            state.backwardQuery[to][from] = ref;
            state.lookup[ref] = { ...action.payload, priority };
        },
        removeRelationship: (state, action) => {
            let { from, to, ref } = action.payload;
            logger.info('Removing relationship from slice');
            logger.info(action.payload);

            if (!(from || to) && !ref) {
                logger.warn('Fail to remove relationship - Incorrect input');
                return;
            }
            if (ref) {
                from = state.lookup[ref]?.from;
                to = state.lookup[ref]?.to;
            } else {
                ref = state.fowardQuery[from][to];
            }

            delete state.lookup[ref];
            delete state.fowardQuery[from][to];
            delete state.backwardQuery[to][from];
        },
    },
});

export const relationshipReducer = relationshipSlice.reducer;
export const { addRelationship, removeRelationship } =
    relationshipSlice.actions;
