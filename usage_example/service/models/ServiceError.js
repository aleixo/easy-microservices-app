/**
 * This class gives the funtionality of handling all the services errors
 * 
 * @class ServiceError
 * @extends {Error}
 */
class ServiceError extends Error{

    /**
     * Creates an instance of ServiceError.
     * @memberof ServiceError
     */
    constructor() {
        super();
        this.errorTypes = {            
            UNAUTHORIZED: {
                CODE: 401
            },
            FORBIDEN: {
                CODE: 403
            },
            NOT_FOUND: {
                CODE: 404
            },
            INTERNAL_SERVER_ERROR: {
                CODE: 500
            }
        };

        this.errorType = {};
    }
    /**
     * Returns the configured instance error code or defaults to 500
     * 
     * @readonly
     * @memberof ServiceError
     */
    get code() {
        return this.errorType.CODE || this.errorTypes.INTERNAL_SERVER_ERROR.CODE
    }

    /**
     * Gets the error correctly parsed to be presented to user
     * 
     * @readonly
     * @memberof ServiceError
     */
    get parsedError() {
        return {
            status: false,
            code: this.code
        }
    }
}

module.exports = ServiceError;