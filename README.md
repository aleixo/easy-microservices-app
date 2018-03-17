# Microservices in express-js 

This is one package that allows to easily deploy one API based on microservices. Born after i mane one API and allows the DEV to easily skip boilerplate code and quickly deploy one API

### To install
npm i easy-microservices-app

### To use
It´s simple enough to use. You have to create your service starting with one file named "Router.js" inside of the service folder. You have to put all the services inside the same folder.

- You have it out of the box, but if you want. Create one settings json file with postgres db credentials and then use its path to start the app.

>     {
			>     "postgresql": {
			>     "user": "MY USER",
			>     "password": "PASSWORD",
			>     "database": "DB NAME",
			>     "host": "HOST",
			>     "port": 5432,
			>     "max": 20,
			>     "idleTimeoutMillis": 30000,
			>     "connectionTimeoutMillis": 20000
			>     }    
>     }

- Call start with the port and settings file location Eg : startApp(3333, './config/settings.json');

- Create one resources folder on project root

- Create the microservice folder on resources folder just created

- Microservice should have has the entry point the Router.js file. You can and should use the structure of the example file. That file has to extend from the npm RouterWorkerClass

- The file that you will use to query Db, should extend DbWOrker class of the npm if you want out of the box queries and transactions

You have one example folder named **usage_example** with one service inside **folder routers**. 