import { useAppSelector } from '../../hooks';
import { ENTITY_SLICE_NAME } from '../constants/slice-name.const';

export function useGetStuff(ref: string) {
    return useAppSelector(
        (state) => state[ENTITY_SLICE_NAME]?.lookup?.[ref] || null
    );
}
