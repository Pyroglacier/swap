import { PERSISTENT_STORAGE, StorageType } from '../config';

import { DatabaseStorage } from './database.storage';
import { PersistentStorage } from './interfaces';
import { WebLocalStorage } from './web-local-storage';

let Storage: PersistentStorage = DatabaseStorage;

switch (PERSISTENT_STORAGE) {
    case StorageType.LOCAL:
        Storage = WebLocalStorage;
        break;
    case StorageType.DATABASE:
    default:
        Storage = DatabaseStorage;
}

export { Storage };
