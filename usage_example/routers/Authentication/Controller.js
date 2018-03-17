/**
 * This class acts as a controller for the activity service
 */
class AuthenticationController {
    /**
     * Builds one new instance
     */
    constructor () {
        const Db = require('./Db');        
        this.db = new Db();

        const Methods = require('./Methods');
        this.methods = new Methods();
    };

    /**
     * Handles the flow to logout one user
     * @param {object} req The original request     
     * @returns {Promise} One thenable with resolve or reject promise
     */
    logout(req) {        

        console.log('GOT REQUEST');

        const logoutUserUuid = req.params.uuid;

        return this.methods.assertUuid(logoutUserUuid)
        .then(() => this.db.logout() )                        
    };
}

module.exports = AuthenticationController;
