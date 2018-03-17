const App = require('./app');

const startApp = (port=3000, settings='./settings.json') => {
    const app = new App();
    app.loadApp(port, settings);
}

const RouterWorker = require('./service/modules/RouterWorker');
const DbWorker = require('./service/modules/DbWorker');

module.exports = {
    startApp,
    workers: {
        RouterWorker,
        DbWorker
    }
};

startApp();