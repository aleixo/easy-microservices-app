/** 
 * This class manages the loading of all the microservices inside one folder.
 * By microservice it means the service it serlf of the middlewares
 * 
*/
module.exports = class ApiLoader {

    /**
     * Creates on new instance ot the loader
     * @memberof MicroservicesLoader
     */
    constructor(settings) {        
        this.configureGlobals(settings);   
        this.fs = require('fs');   
        this.settings = settings;    
    }

    /**
     * Allows the instance to search for a given module or modules, depending on the 
     * location
     *      
     * @returns {array} Represents the found module/modules
     * @memberof MicroservicesLoader
     */    
    loadModulesFacade() {          
        const inPath = this.settings.microservices.baseFolder;
        const targetFile = this.settings.microservices.startFileName;

        try {
            const dirs = this.getPathDirs(process.env.PWD+inPath)
            if (dirs.length === 0) {
                return this.searchForFile(inPath, targetFile);
            }
    
            return dirs.map((dir) => {
                return this.searchForFile(inPath + dir, targetFile)            
            }).filter( (route) => {
                return route !== undefined
            });     
        } catch (e) {
            console.log('ERROR LOADING SERVICES ',e.message)            
            return e;
        }                                       
    }

    /**
     * Loads all the specified middlewares on settings file
     * 
     * @returns One object with middlewares
     * @memberof MicroservicesLoader     
     */
    loadMiddlewares() {

        const middlwares = this.settings.middlewares;

        if (!middlwares.length) {
            return new Error('No middlewares');
        }

        const request = this.requestMiddlewares(middlwares, false);
        const response = this.requestMiddlewares(middlwares, true);

        return {
            request,
            response
        }
    }

    /**
     * Request available middlewares fo response of request
     * 
     * @param {array} middlwares The middlewares paths
     * @param {bool} isResponse Specifies if should request middleware for response or request
     * @returns {object} One object with the middlewares for the specified type
     * @memberof MicroservicesLoader
     */
    requestMiddlewares(middlwares, isResponse) {                                                                   
        return middlwares.filter((middlewareFilter) => {
            return middlewareFilter.isResponseMiddleware == isResponse
        }).map((middleware) => {
            return middleware;        
        })
    }

    /**
     * Gets the path for directories
     * 
     * @param {string} inPath The path to start the module search     
     * @returns {array} The dirs on the path
     * @memberof MicroservicesLoader
     */
    getPathDirs(inPath) {
        const files = this.fs.readdirSync(inPath);
        return files.filter((file) => {
            return this.fs.lstatSync(inPath + '/' + file).isDirectory(); 
        })   
    }

    /**
     * Search for a given file in path
     * 
     * @param {string} inPath The path to start the module search
     * @param {string} targetFile The file to be found on the path
     * @returns {string} The found file
     * @memberof MicroservicesLoader
     */
    searchForFile(inPath, targetFile) {
        console.log('WILL SEARCH FOR FILES IN ',inPath);
        const files = this.fs.readdirSync(process.env.PWD+inPath);       
            
        console.log('GOT FILES ',files);
        const allowedFiles = files.filter((file) => {                
            return this.isFileDesiredForService(file, targetFile)
        })
        
        if (allowedFiles.length > 0) {                                        
            const filePath = `${process.env.PWD}${inPath}/${allowedFiles[0]}`                                                      
            console.log('ADDING FILE ', filePath)            
            return require(filePath);
        }
    }

    /**
     * Checks if a given file must be loaded
     *
     * @param {string} file The found file
     * @param {string} targetFile The targe file to be found
     * @returns {boolean} True is file must be loaded false otherwise
     * @memberof MicroservicesLoader
     */
    isFileDesiredForService(file, targetFile) {
        console.log(`CHECKING IF FILE ${file} IS ALLOWED FOR TARGET FILE ${targetFile}`)
        if (file.toLowerCase().split('.')[0] === targetFile.toLowerCase().split('.')[0]) {
            console.log('FILE ALLOWED');
            return true;
        }
        console.log('FILE NOT ALLOWED');
        return false;
    }

    /**
     * Configures the globals for the microservices
     *
     * @memberof MicroservicesLoader
     */
    configureGlobals(settings) {
        const DbConnection = require("./service/").modules.dbConnection;
        const dbConfigs = settings.postgresql;        

        global.Promise = require("bluebird");
        global.pgPool = new DbConnection(dbConfigs).pool;        
    }
}