export const timeout = (ms = 100) =>
    // eslint-disable-next-line no-promise-executor-return
    new Promise((resolve) => setTimeout(resolve, ms));
