/**
 * Used to build one sucessfull response to be presented to the user
 * 
 * @class ServiceSuccess
 */
class ServiceSuccess {

    /**
     * Builds one result to be presented to the user with 200 response
     * @param {object} result The resulting object of the last operation before parsing the result to user
     */
    parsedResponse(result) {
        return {
            status: true,
            data: result
        }
    }
}

module.exports = ServiceSuccess;