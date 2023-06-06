import { AnyAction } from '@reduxjs/toolkit';

export interface Dispatchable {
    toDispatch: () => AnyAction | AnyAction[];
}
