/**
 * This class settes one new db connection pool
 * 
 * @class DbConnection
 */
class DbConnection {

    /**
     * Creates an instance of DbConnection.
     * 
     * @param {object} dbConfigs One object with all the database configurations
     * @memberof DbConnection
     */
    constructor(dbConfigs) {
        const {Pool} = require('pg');
        this.pool = new Pool({
            user: dbConfigs.user,
            password: dbConfigs.password,
            database: dbConfigs.database,
            host: dbConfigs.host,
            port: dbConfigs.port,
            max: dbConfigs.max,
            idleTimeoutMillis: dbConfigs.idleTimeoutMillis,
            connectionTimeoutMillis: dbConfigs.connectionTimeoutMillis
        });
    }
}

module.exports = DbConnection;