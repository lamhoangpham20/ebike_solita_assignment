## Overview

The API server is built in express and writen in Typescript.
The database in use is built in postgresql with TypeORM set up to construct database connection and schema.

## How to set up

> npm install

After cloning the folder, you can run **npm install** to install all dependency

---

Then, you can create a postgresql database locally and add url to env variables or directly in **ormconfig.ts**

---

    migrationsTableName: "migrations",
    type: "postgres",
    url:process.env.DATABASE_URL,
    entities: [Station, Journey],
    logging: true,
    //synchronize: true,
    migrations: [path.join(__dirname, "./migrations/*")],
    namingStrategy: new SnakeNamingStrategy(),

---

> npm run watch

To start running the app you can run this command in order to export all the ts code into js dist/ forder

> npm run dev

The server will run in development environment in expressJS server at desired PORT and initialize connect to database.

## Routing

There are two routes, journey and station which provides endponts for CRUD in databases

## TypeORM

### Entity

In entity, the schema for both journey and station property is defined and create schema for the request and response to follow.

### Resolver

Base on the entity, the resolver act as a middleware to query database and get data as well as use its logic for validations and calculation. The routes call resolver for data. In this resolver, we use both typeORM method and also raw query

## API document

https://app.swaggerhub.com/apis-docs/lamhoangpham20/ebike/1.0.0