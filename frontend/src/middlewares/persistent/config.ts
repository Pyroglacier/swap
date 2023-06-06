export const StorageType = {
    DATABASE: 'DATABASE',
    LOCAL: 'LOCAL',
};

export const PERSISTENT_STORAGE =
    process.env.PERSISTENT_STORAGE ?? StorageType.LOCAL;
