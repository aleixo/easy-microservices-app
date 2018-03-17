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
    constructor() {
        this.ServiceError = require('../service').models.serviceError;
    }
    
    /**
     * Handles the response and properly formats
     * the error to be sent in the response
     * @param context middleware own context
     * @returns {Function} One function wth the middleware implementation
     * @memberof ResponseMiddleware
     */
    responseParser (context) {
        return function (err, req, res, next) {            
            if (err instanceof context.ServiceError) {
                return res.status(err.code).send('CUSTOM ERROR ' + JSON.stringify(err.parsedError));
            }

            if (err) {
              return res.status(500).send('ERROR ' + JSON.stringify(err));
            }
            return res.status(404).send();
        };
    }    
}

module.exports = ResponseMiddleware;
