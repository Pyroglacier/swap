import { BackendNode } from '../models';

export type Entity = BackendNode;

export type Inner = Omit<Entity, 'ref'>;
