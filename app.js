class App {    
    loadApp(atPort, settings) {        
        const express = require("express");
        const path = require("path");
        const logger = require("morgan");
        const cookieParser = require("cookie-parser");
        const bodyParser = require("body-parser");
        const app = express();   
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(logger('dev'));
        app.use(cookieParser());
        app.use(express.static(path.join(__dirname, 'public')));
        settings = require(settings);
        const MicroservicesLoader = require('./MicroservicesLoader');
        const microservicesLoader = new MicroservicesLoader(settings);
        const services = microservicesLoader.loadModulesFacade();
        const responseMiddleware = microservicesLoader.loadModulesFacade(true);          
        
        const ServiceError = require(settings.models.serviceResponse.error.path);
        const serviceErrorParserMethodName = settings.models.serviceResponse.error.parserMethodName;
        const serviceErrorSettings = {
            ServiceError,
            serviceErrorParserMethodName            
        }

        const middlewares = microservicesLoader.loadMiddlewares();                

        middlewares.request && middlewares.request.forEach( (Middleware) => {            
            const MiddlewareClass = require(Middleware.folder) 
            const middleware = new MiddlewareClass(serviceErrorSettings);                        
            app.use(middleware[Middleware.handlerMethodName]);
        });

        services.length && services.forEach( (Service) => {            
            const router = new Service();   
            app.use(router.entry, router.configuredRouter)
        });
             
        middlewares.response && middlewares.response.forEach( (Middleware) => {                     
            const MiddlewareClass = require(Middleware.folder) 
            const middleware = new MiddlewareClass(serviceErrorSettings);                        
            app.use(middleware[Middleware.handlerMethodName]);
        });                            
        
        app.use(function(req, res, next) {
            res.status(404)
        });

        app.listen(atPort, () => {
            console.log(`ALL SET GO IN PORT ${atPort}`)
        });

        module.exports = app;
    }    
}

module.exports = App;




