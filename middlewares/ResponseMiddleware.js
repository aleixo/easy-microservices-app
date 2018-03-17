/**
 * This class defines all the error handling middleware to be used right before the response is rendered
 * 
 * @class ResponseMiddleware
 */
class ResponseMiddleware {

    /**
     * Creates an instance of ResponseMiddleware.
     * @memberof ResponseMiddleware
     */
    constructor(settings) {
        this.settings = settings;                      
    }

    /**
     * Handles the response and properly formats
     * the error to be sent in the response
     * @param context middleware own context
     * @returns {Function} One function wth the middleware implementation
     * @memberof ResponseMiddleware
     */
    responseParser(context) {
        return function (err, req, res, next) {
            if (err instanceof context.settings.ServiceError) {
                return res.status(err.code).send('CUSTOM ERROR ' + JSON.stringify(err[this.settings.serviceErrorParserMethodName]));
            }

            if (err) {
                return res.status(500).send('ERROR ' + JSON.stringify(err));
            }
            next();
        };
    }
}

module.exports = ResponseMiddleware;