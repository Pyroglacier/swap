import { NodeType, DataType } from '@argens1203/swap-model';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { timeout } from '../../../utils';
import { initialEntityState } from '../../node-entity/slices/initial-state';
import { AppThunkDispatch } from '../../thunk.type';
import { setLoading } from '../../ui/slices/ui.slice';
import { QueryResponse } from '../api/responses';

import { processNodeHoc } from './process-node.thunk.hoc';

const initialState = { node: initialEntityState };

const getStore = () => {
    const mockStore = configureMockStore<typeof initialState, AppThunkDispatch>(
        [thunk]
    );
    const store = mockStore(initialState);
    return store;
};
// Using spied function modifies slice/actions which make them not return pure JS objects
// TODO: error cases
describe('prcoess node thunk hoc', () => {
    it('should start ui loading immediately', async () => {
        const api: () => Promise<QueryResponse[]> = async () => {
            await timeout();
            return [
                new QueryResponse({
                    success: true,
                    data: {
                        ref: 'ref',
                        data: 'data',
                        dataType: DataType.STRING,
                        nodeType: NodeType.ENTITY,
                    },
                }),
            ];
        };
        const processNodeThunk = processNodeHoc<void>(api);

        const store = getStore();
        await store.dispatch(processNodeThunk());

        const actions = store.getActions();

        expect(actions[0]).toEqual(setLoading(true));
        expect(actions[actions.length - 1]).toEqual(setLoading(false));
        expect(actions).toContainEqual(
            expect.objectContaining({
                payload: expect.objectContaining({
                    ref: 'ref',
                }),
            })
        );
    });
});
