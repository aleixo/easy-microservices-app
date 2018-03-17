# Microservices

### This is one package that allows to easily deploy one API based on microservices.

#### Just follow those steps
- Create one settings json file with postgres db credentials
´´´
{
    "postgresql": {        
        "user": "MY USER",
        "password": "PASSWORD",
        "database": "DB NAME",
        "host": "HOST",
        "port": 5432,                       
        "max": 20,
        "idleTimeoutMillis": 30000,
        "connectionTimeoutMillis": 20000
    }   
} 
´´´

- Call start with the port and settings file location Eg : startApp(3333, './config/settings.json');
- Create one resources folder on project root
- Create the microservice folder on resources folder just created
- Microservice should have has the entry point the Router.js file. You can and should use the structure of the example file. That file has to extend from the npm RouterWorkerClass
- The file that you will use to query Db, should extend DbWOrker class of the npm if you want out of the box queries and transactions


That is it for now.

### Next to be added. Possibility to choose one error and success model for the middleware
