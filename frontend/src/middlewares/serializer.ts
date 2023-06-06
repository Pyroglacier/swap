import { Middleware } from '@reduxjs/toolkit';
import { serialize } from 'class-transformer';

import { RootState } from './store';

export const serializer: Middleware<Record<string, never>, RootState> =
    (store) => (next) => (action) => {
        const { payload, ...rest } = action;
        next({
            ...rest,
            payload: payload ? JSON.parse(serialize(payload)) : payload,
        });
    };
