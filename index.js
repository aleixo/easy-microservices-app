const App = require('./app');

const startApp = (port, dbSettingsLocation) => {
    const app = new App();
    app.loadApp(port, dbSettingsLocation);
}

const RouterWorker = require('./service/modules/RouterWorker');
const DbWorker = require('./service/modules/DbWorker');

exports = {
    startApp,
    workers: {
        RouterWorker,
        DbWorker
    }
};

startApp(3333, './config/settings.json');