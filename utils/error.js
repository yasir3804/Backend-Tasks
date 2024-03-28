// Custom error handler
export const createError = (statusCode = 500, message = 'An error occurred') => {
    const err = new Error(message);
    err.statusCode = statusCode; 
    throw err;
}
