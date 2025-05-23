/**
 * @function wrapAsync
 * @description Wraps an asynchronous function to handle errors
 * @param {function} fn - The asynchronous function to wrap
 * @returns {function} - A new function that calls the original function and catches any errors
 */
module.exports = (fn) => {
    return function (req, res, next) {
        fn(req, res, next).catch(next);
    };
};
