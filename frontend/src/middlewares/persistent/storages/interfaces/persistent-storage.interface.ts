import { Command, Response } from '../../../nodes/api/types';
import { Entity } from '../../../nodes/types';

export interface PersistentStorage {
    submit: (input: Command<Entity>[]) => Promise<Response<Entity>[]>;
}
