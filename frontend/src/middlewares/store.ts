import {
    Action,
    ThunkAction,
    combineReducers,
    configureStore,
} from '@reduxjs/toolkit';
import logger from 'redux-logger';

import { ENTITY_SLICE_NAME } from './node-entity/constants/slice-name.const';
import { entityReducer } from './node-entity/slices/entity.slice';
import { RELATIONSHIP_SLICE_NAME } from './node-relationship/constants';
import { relationshipReducer } from './node-relationship/slice';
import { serializer } from './serializer';
import { uiReducer } from './ui/slices';

export const reducer = combineReducers({
    ui: uiReducer,
    [ENTITY_SLICE_NAME]: entityReducer,
    [RELATIONSHIP_SLICE_NAME]: relationshipReducer,
});
export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: false,
        })
            .concat(serializer)
            .concat(logger);
    },
});

export type RootState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
