/**
 * This class does the database operations for the activity service
 */

const DbWorker = require('easy-microservices-app').workers.DbWorker;
class LogoutDatabase extends DbWorker {
    /**
     * Asks the database for all the activities of the app
     */
    logout (uuid) {
        //Define the prepared statment
        const query = `My SUPER SPECIAL QUERY`;
        const params = [uuid];

        // Let´s init the transaction
        return this.begin()
            .then(() => {
               this.removeTokenForUser(uuid) 
            }).then(() => {
                this.updateSomeMetricsForUser(uuid)
            })
            .then(() => this.commit())
            .catch(() => this.rollback())        
    };

    removeTokenForUser(uuid) {
        //Define the prepared statment
        const query = `My SUPER SPECIAL QUERY to remove user token`;
        const params = [uuid];

        //----- You want to query from worker
        //return this.query(query, params);

        //Resolving just for tests
        return Promise.resolve();
    }

    updateSomeMetricsForUser(uuid) {
         //Define the prepared statment
         const query = `My SUPER SPECIAL QUERY to update metrics`;
         const params = [uuid];
 
         //----- You want to query from worker
         //return this.query(query, params);

         //Resolving just for tests
         return Promise.resolve();
    }
}

module.exports = LogoutDatabase;
