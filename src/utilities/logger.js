// Logger utility for production safety
const isProduction = import.meta.env.PROD;

export const logger = {
    error: (message, ...args) => {
        if (!isProduction) {
            console.error(message, ...args);
        }
    },
    warn: (message, ...args) => {
        if (!isProduction) {
            console.warn(message, ...args);
        }
    },
    log: (message, ...args) => {
        if (!isProduction) {
            console.log(message, ...args);
        }
    }
};