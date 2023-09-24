# identity-reconciliation

This is a Node.js back end web application written in TypeScript, which features REST API interface via Express.js, and PostgreSQL data storage via TypeORM.

## Prerequisites

Before setting up the project, you'll need to have the following installed on your system:

1. Node.js (https://nodejs.org/) - Make sure to install the LTS version.
2. PostgreSQL (https://www.postgresql.org/) - You need a running PostgreSQL server to use as the database.

### Node

- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
  Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems

  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

  If the installation was successful, you should be able to run the following command.

        $ node --version
        v16.20.0

        $ npm --version
        8.19.4

  If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

        $ npm install npm -g

  ###

## Install

    $ git clone git@github.com:dthakurani/identity-reconciliation.git
    $ cd identity-reconciliation
    $ npm install

## Configure app

    create .env file with following values

    SERVER_PORT=

    DB_USERNAME=
    DB_PASSWORD=
    DB_NAME=
    DB_HOST=

you can also refer .env.sample

## Database conectivity

    you need a database and make changes in .env file

## Migration

After setting database connection run migrations to setup database.

```diff
npm run typeorm:run-migrations
```

## Running the API

To start the API server, use the following command:

```diff
    npm run start:dev
```

## Output on running npm start

    > identity-reconciliation@1.0.0 start:dev
    > nodemon --watch 'src/**/*.ts' --ignore 'src/**/*.spec.ts' --exec 'ts-node' src/index.ts

    [nodemon] 3.0.1
    [nodemon] to restart at any time, enter `rs`
    [nodemon] watching path(s): src/**/*.ts
    [nodemon] watching extensions: js
    [nodemon] starting `ts-node src/index.ts`
    ... Microservice db ✔
    --- Server started on 9000 ---

The API will be available at http://localhost:9000 by default. You can change the port by modifying the PORT environment variable in the .env file or your hosting environment.

## API Endpoint

The API exposes the following endpoint:

- POST /api/contract/identify

Request body

```diff
    {
    	"email"?: string,
    	"phoneNumber"?: string
    }
```

## Using the API

You can use any API testing tool like Postman or curl to interact with the API.
or you can test it on

```diff
    https://identity-reconciliation-8buw.onrender.com/api/contract/identify
```
