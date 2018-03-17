/**
 * This class allows user to build one Activity router
 * 
 * This example will register one GET in path /authentication/:userUuid
 */

 //Get the worker reference from the package
const RouterWorker = require('easy-microservices-app').workers.RouterWorker
class AuthenticationRouter extends RouterWorker {
    /**
     * Builds one new instance and registers the router routes
     *      
     */
    constructor () {
        super();

        //Set the controller on the worker worker
        const Controller = require('./Controller');
        this.controller = new Controller();

        //Set the router entry point on worker
        this.entry = '/authentication';

        //Register the routes
        this.buildActivityRouter();
    }

    /**
     * Builds the router registering the routes
     */
    buildActivityRouter () {
        this.registerRoute({
            path: '/:userUuid',
            method: 'get',
            controllerAction: 'logout'
        });     
    }  
}

module.exports = AuthenticationRouter;