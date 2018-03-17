/**
 * This file declares one worker to manage database processes
 * 
 * @class DbWorker
*/
class DbWorker {

    /**
     * Performs a given query against the fusionpbx database
     * 
     * @param {string} query The string that represents the target query
     * @param {array} params One optional array with parameters to be used with the query
     * @returns {Promise} Resolved promiss in any case of success. Reject if error connecting to
     * db or performing the query
     * @memberof RouterWorker
     */
    query(query, params = [] ) {
        return pgPool.query(query, params).then( (res) => res.rows);
    };

    /**
     * Allows user to Rollback uncommited changes
     * 
     * @returns {Promise} Resolved promiss in any case of success. Reject if error connecting to
     * db or performing the query
     * @memberof RouterWorker
     */
    rollback() {
        return this.query('ROLLBACK');
    };

    /**
     * Allows user to init one transactions
     * 
     * @returns {Promise} Resolved promiss in any case of success. Reject if error connecting to
     * db or performing the query
     * @memberof RouterWorker
     */
    begin() {
        return this.query('BEGIN');
    };

    /**
     * Allows user to commituncommited changes
     * 
     * @returns {Promise} Resolved promiss in any case of success. Reject if error connecting to
     * db or performing the query
     * @memberof RouterWorker
     */
    commit() {
        return this.query('COMMIT');
    };
}

module.exports = DbWorker;