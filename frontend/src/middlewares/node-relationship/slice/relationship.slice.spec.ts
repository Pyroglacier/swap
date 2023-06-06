import { DataType } from '@argens1203/swap-model';
import { AnyAction } from '@reduxjs/toolkit';

import { MIN_PRIORITY } from '../constants';

import { initialRelationshipState } from './initial-state';
import {
    relationshipReducer as reducer,
    addRelationship,
    removeRelationship,
} from './relationship.slice';

describe('stuff slice', () => {
    it('should initialize', () => {
        expect(reducer(undefined, {} as AnyAction)).toEqual(
            initialRelationshipState
        );
    });

    describe('add relationship', () => {
        it('can add novel relationship', () => {
            const node = {
                ref: 'ref',
                from: 'from',
                to: 'to',
            };

            const state = reducer(
                initialRelationshipState,
                addRelationship(node)
            );
            expect(state.lookup.ref).toEqual(
                expect.objectContaining({ ...node })
            );
            expect(state.fowardQuery.from.to).toEqual('ref');
            expect(state.backwardQuery.to.from).toEqual('ref');
        });

        it('cannot add relationship repeatedly', () => {
            const node = {
                ref: 'ref',
                from: 'from',
                to: 'to',
            };
            const anotherNode = {
                ref: 'ref',
                from: 'another from',
                to: 'another to',
            };

            let state = reducer(
                initialRelationshipState,
                addRelationship(node)
            );
            state = reducer(state, addRelationship(anotherNode));

            expect(state.lookup.ref).toEqual(
                expect.objectContaining({ ...node })
            );
            expect(state.fowardQuery.from.to).toEqual('ref');
            expect(state.backwardQuery.to.from).toEqual('ref');
        });

        it('has a default priority of min-priority', () => {
            const node = {
                ref: 'ref',
                from: 'from',
                to: 'to',
            };

            const state = reducer(
                initialRelationshipState,
                addRelationship(node)
            );
            expect(state.lookup.ref).toEqual(
                expect.objectContaining({ priority: MIN_PRIORITY })
            );
        });
    });

    describe('remove relationship', () => {
        it('can remove relationship', () => {
            const node = {
                ref: 'ref',
                from: 'from',
                to: 'to',
            };

            let state = reducer(
                initialRelationshipState,
                addRelationship(node)
            );
            state = reducer(state, removeRelationship({ ref: 'ref' }));

            expect(state.lookup).not.toHaveProperty('ref');
            expect(state.fowardQuery.from).not.toHaveProperty('to');
            expect(state.backwardQuery.to).not.toHaveProperty('from');
        });
    });
});
