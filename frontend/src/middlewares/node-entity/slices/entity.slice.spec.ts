import { DataType } from '@argens1203/swap-model';
import { AnyAction } from '@reduxjs/toolkit';

import { entityReducer as reducer, upsertEntity } from './entity.slice';
import { initialEntityState } from './initial-state';

describe('stuff slice', () => {
    it('should initialize', () => {
        expect(reducer(undefined, {} as AnyAction)).toEqual(initialEntityState);
    });

    describe('upsert stuff', () => {
        it('can upsert non-existent stuff', () => {
            const node = {
                ref: 'ref',
                data: 'data',
                dataType: DataType.STRING,
            };

            const state = reducer(initialEntityState, upsertEntity(node));
            expect(state.lookup.ref).toEqual(
                expect.objectContaining({ ...node })
            );
        });

        it('can upsert onto existent stuff', () => {
            const node = {
                ref: 'ref',
                data: 'data',
                dataType: DataType.STRING,
            };
            const update = {
                ref: 'ref',
                data: 'another data',
                dataType: DataType.DATE,
            };

            let state = reducer(initialEntityState, upsertEntity(node));
            state = reducer(state, upsertEntity(update));
            expect(state.lookup.ref).toEqual(
                expect.objectContaining({
                    ref: 'ref',
                    data: 'another data',
                    dataType: DataType.DATE,
                })
            );
        });

        it('would not destroy exisitng stuff', () => {
            const node = {
                ref: 'foo',
                data: 'data',
                dataType: DataType.STRING,
            };
            const anotherNode = {
                ref: 'ref',
                data: 'another data',
                dataType: DataType.DATE,
            };

            let state = reducer(initialEntityState, upsertEntity(node));
            state = reducer(state, upsertEntity(anotherNode));
            expect(state.lookup.foo).toEqual(
                expect.objectContaining({ ...node })
            );
        });

        it('idempotency', () => {
            const node = {
                ref: 'ref',
                data: 'data',
                dataType: DataType.STRING,
            };
            const update = {
                ref: 'ref',
                data: 'another data',
                dataType: DataType.DATE,
            };

            let state = reducer(initialEntityState, upsertEntity(node));
            state = reducer(state, upsertEntity(update));
            state = reducer(state, upsertEntity(update));
            expect(state.lookup.ref).toEqual(
                expect.objectContaining({
                    ref: 'ref',
                    data: 'another data',
                    dataType: DataType.DATE,
                })
            );
        });
    });
});
