/**
 * @class ExpressError
 * @extends {Error}
 * @description Custom error class for handling Express errors
 */
class ExpressError extends Error {
    /**
     * @constructor
     * @param {number} statusCode - The HTTP status code of the error
     * @param {string} message - The error message
     */
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

module.exports = ExpressError;
