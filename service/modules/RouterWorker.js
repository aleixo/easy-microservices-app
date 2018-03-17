/**
 * This class allows other routers to have one worker.
 * Every router must implement this class
 * 
 * @class RouterWorker
 */
class RouterWorker {
    /**
     * Builds one new instance of the router worker
     * 
     * @memberof RouterWorker
     */
    constructor () {
        const express = require('express');
        this.router = express.Router();
    }

    /**
     * Returns the express router instance of the class
     * 
     * @returns {object} The express router
     * @readonly
     * @memberof RouterWorker
     */
    get configuredRouter () {
        return this.router;
    }

    /**
     * Sets the router controller to be user when registering the route
     * 
     * @param {object} controller The controller to be setted on the worker
     * @memberof RouterWorker
     */
    set controller (controller) {
        this.workerController = controller;
    }

    /**
     * Setter for the microservice entry point
     * 
     * @param {string} entry The entry to the microservice
     */
    set entry (entry) {        
        this.routerEntry = entry;
    }    

    /**
     * Getter for the microservice entry point
     * 
     * @readonly
     * @memberof RouterWorker
     */
    get entry() {
        return this.routerEntry;
    }

    /**
     * Register one new route on the router for a given configuration
     * 
     * @param {object} config
     * @memberof RouterWorker
     */
    registerRoute (config) {      
        console.log(`[REGISTERING ROUTE] ${config.method} --- ${config.controllerAction} --- ${this.entry}${config.path}`)  
        this.router[config.method](config.path, (req, res, next) => {
            return this.workerController[config.controllerAction](req)
                .then(result => res.json(result))
                .catch(next);
        });
    }
}
module.exports = RouterWorker;