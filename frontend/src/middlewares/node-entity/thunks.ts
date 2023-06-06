import { processNodeHoc } from '../nodes/thunks';

import { createEntity as createEntityApi } from './create-entity';
import { deleteEntity as deleteEntityApi } from './delete-entity';
import { getEntities as getEntitiesApi } from './get-entities';

export const getAllEntities = processNodeHoc<void>(getEntitiesApi);

export const createEntity = processNodeHoc<string>(createEntityApi);

export const deleteEntity = processNodeHoc<string>(deleteEntityApi);
