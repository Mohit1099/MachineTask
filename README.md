# TypeScript Express boilerplate for API development

This TypeScript, NodeJS, Express boilerplate provides a solid foundation for building scalable and maintainable APIs. It includes the following features:

- **TypeScript support**: TypeScript brings type safety and better code organization to your projects. The boilerplate is preconfigured to use TypeScript, so you can start writing strongly-typed code right away.
- **Express framework**: Express is a widely-used framework for building web applications and APIs in NodeJS. It provides a robust set of features, including routing, middleware, and error handling.
- **Modular architecture**: The boilerplate is structured using a modular architecture, making it easy to organize your code into reusable components. Each module is responsible for a specific feature or functionality, and can be easily added or removed as needed.
- **Logging and error handling**: The boilerplate includes preconfigured logging and error handling, making it easy to diagnose issues in your code.
- **Database integration**: The boilerplate includes a sample database integration using the Mongoose library. This allows you to easily connect to and query a database in your app.

Overall, this boilerplate provides a solid foundation for building high-quality APIs with TypeScript and Express.

# Pre-requisites
- node version >= 18.15.0

# File and folder Naming conventions

- Folder and file name will be singular and follow `kebab-case`
- Classes and interfaces Names will be singular and follow `PascalCasing`
- Any global constants or environment variables are in `all-caps` and follow `SNAKE_CASE`
- Variable name should be `camelCase`

For more details onto casing refer [here](https://medium.com/better-programming/string-case-styles-camel-pascal-snake-and-kebab-case-981407998841)

## API Docs

Swagger is to be used for API documentation served at your localhost eg: http://localhost:3003/docs.

# Project Setup

To setup the project, all you need to do is :

## Steps for MongoDB
- install mongodb-community@5.0(use brew if you are on mac).
- set path in your enviroment
- if you are using zsh terminal do vim ~/.zshrc,if  using bash do vim ~/.bash_profile and follow below steps :
    1. Press i
    2. Paste export PATH="/opt/homebrew/opt/mongodb-community@5.0/bin:$PATH"
    3. Press esc and type :wq!
- Type source ~/.zshrc or using bash do source ~/.bash_profile to refresh the enviroment variables.
- Start the community server on local using brew services stop mongodb-community@5.0
- Type mongo  and paste below query to create user having AdminRoles and we have provides authrole as admin in DBConnection file.
----------------------------------------------
        use admin
        db.createUser(
        {
        user: "root",
        pwd: "root",
        roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
        }
        )
---------------------------------------------------

## Steps for BoilerPlate
- Copy default.env to .env and make necessary changes `cp default.env .env`
- Run `npm install ` to install all the dependencies of the project
- Run `npm run build` to create build folder with name of dist, conversion of ts into js .
- Run `npm run watch` to serve the API's in localhost over the port you specify in your env.


