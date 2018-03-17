/** 
 * This class manages the loading of all the microservices inside one folder.
 * By microservice it means the service it serlf of the middlewares
 * 
*/
class MicroservicesLoader {

    /**
     * Creates on new instance ot the loader
     * @memberof MicroservicesLoader
     */
    constructor(dbSettingsLocation) {
        this.configureGlobals(dbSettingsLocation);   
        this.fs = require('fs');                                                
    }

    /**
     * Allows the instance to search for a given module or modules, depending on the 
     * location
     * 
     * @param {string} inPath The path to start the module search
     * @param {string} targetFile The file to be found on the path
     * @returns {array} Represents the found module/modules
     * @memberof MicroservicesLoader
     */
    loadModules(inPath, targetFile) {  
        try {
            const dirs = this.getPathDirs(inPath)
            if (dirs.length === 0) {
                return this.searchForFile(inPath, targetFile);
            }
    
            return dirs.map((dir) => {
                return this.searchForFile(inPath + dir, targetFile)            
            }).filter( (route) => {
                return route !== undefined
            });     
        } catch (e) {
            return [];
        }                                       
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
        const files = this.fs.readdirSync(inPath);       
            
        const allowedFiles = files.filter((file) => {                
            return this.isFileDesiredForService(file, targetFile)
        })
        
        if (allowedFiles.length > 0) {                            
            const filePath = `${inPath}/${allowedFiles[0]}`                                                      
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
        if (file.toLowerCase().split('.')[0] === targetFile.toLowerCase().split('.')[0]) {
            return true;
        }
        return false;
    }

    /**
     * Configures the globals for the microservices
     *
     * @memberof MicroservicesLoader
     */
    configureGlobals(dbSettingsLocation) {
        const DbConnection = require("./service/").modules.dbConnection;
        const dbConfigs = require(dbSettingsLocation).postgresql;        

        global.Promise = require("bluebird");
        global.pgPool = new DbConnection(dbConfigs).pool;        
    }

}

module.exports = MicroservicesLoader;