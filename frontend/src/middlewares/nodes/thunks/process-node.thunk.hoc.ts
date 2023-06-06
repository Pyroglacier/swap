import { logger, notEmpty } from '../../../utils';
import { AppThunkDispatch } from '../../thunk.type';
import { setError, setLoading } from '../../ui/slices';
import { Response } from '../api/types';
import { BackendNode } from '../models';
import { ResponseFactory } from '../utils';

type Api<T> = (input: T) => Promise<Response<BackendNode>[]>;

type CreateNodeThunk<T> = (
    input: T
) => (Dispatch: AppThunkDispatch) => Promise<void>;

type Handler = (input: Response<BackendNode>[]) => void;

export function processNodeHoc<T>(
    api: Api<T>,
    handlers: Handler[] = []
): CreateNodeThunk<T> {
    return function (input: T) {
        return async function (dispatch: AppThunkDispatch) {
            dispatch(setLoading(true));
            const r = await api(input)
                .catch((err) => {
                    logger.warn(err);
                    dispatch(setError(err.message));
                })
                .finally(() => {
                    dispatch(setLoading(false));
                })
                .then((responses) => {
                    if (!responses || responses.length === 0) {
                        dispatch(setError(`API Error - No valid response`));
                        logger.debug(input);
                        return [];
                    }
                    return responses
                        .map((resp) => ResponseFactory.getResponse(resp))
                        .filter(notEmpty);
                })
                .then((responses) => {
                    responses
                        .map((a) => a.toDispatch())
                        .flat(20) // Workaround for TS not recognizing Infinity
                        .forEach((a) => {
                            dispatch(a);
                        });
                    return responses;
                });
            await Promise.all(handlers.map((handler) => handler(r)));
        };
    };
}
