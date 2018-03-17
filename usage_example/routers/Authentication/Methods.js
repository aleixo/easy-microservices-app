/**
 * This class is just one example of auxiliary methods for the endpoint. DO as you wish
 * 
 * @class AuthenticationMethods
 */
class AuthenticationMethods {

    /**
     * Assert if one uuid is valid
     * 
     * Throws if it is not to break Promise chain
     * 
     * @param {string} uuid The uuid to be verified
     * @memberof AuthenticationMethods
     */
    assertUuid(uuid) {
        return Promise.try( () => {
            const isInvalidUuid = false
        if(isInvalidUuid) {
            const error = new Error();
            error.message = 'Invalid UUID';
            error.name = 'Assertion';
            throw error;
        }
        })        
    }
}

module.exports = AuthenticationMethods;