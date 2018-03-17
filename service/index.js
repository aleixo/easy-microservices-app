module.exports = {
    modules: {
        dbConnection: require('./modules/DbConnection'),
        dbWorker: require('./modules/DbWorker'),
        routerWorker: require('./modules/RouterWorker'),
    },    
    models: {
        serviceError: require('./models/ServiceError'),
        serviceSucess: require('./models/ServiceSuccess')
    }
};