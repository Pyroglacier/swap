import { processNodeHoc } from '../nodes/thunks';

import { createRelationship as createRelationshipApi } from './create-relationship';
import { CreateRelationshipNodeDto } from './models/create-relationship-node.dto';

export const createRelationship = processNodeHoc<CreateRelationshipNodeDto>(
    createRelationshipApi
);
