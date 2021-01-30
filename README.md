# miniature-octo-tribble
Express.js/Typescript api

## setup
`npm init` to setup

Next, add the Express.js framework and some helpful libraries:
`npm install --save express debug winston express-winston cors`

`debug` -> is a module that we will use to avoid calling console.log() while developing our application. This way, we can easily filter debug statements during troubleshooting. They can also be switched off entirely in production instead of having to be removed manually.
 
`winstonis` -> responsible for logging requests to our API and the responses (and errors) returned. express-winston integrates directly with Express.js, so that all standard API-related winston logging code is already done.

`cors` -> is a piece of Express.js middleware that allows us to enable [cross-origin resource sharing](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS). Without this, our API would only be usable from front ends being served from the exact same subdomain as our back end.

we also need to install some development dependencies for our TypeScript configuration. For that, we’ll run:
`npm install --save-dev @types/cors @types/express @types/debug source-map-support tslint typescript`
These dependencies are required to enable TypeScript for our app’s own code, along with the types used by Express.js and other dependencies.


## API Project Structure
we are going to create just three files:
```
./app.ts
./common/common.routes.config.ts
./users/users.routes.config.ts
```
We will also create the following modules later

`Route configuration` to define the requests our API can handle

`Services` for tasks such as connecting to our database models, doing queries, or connecting to external services that are required by the specific request

`Middleware` for running specific request validations before the final controller of a route handles its specifics

`Models` for defining data models matching a given database schema, to facilitate data storage and retrieval

`Controllers` for separating the route configuration from the code that finally (after any middleware) processes a route request, calls the above service functions if necessary, and gives a response to the client

## Express 
The `Request` is the way Express.js represents the HTTP request to be handled. This type upgrades and extends the native Node.js request type.

The `Response` is likewise how Express.js represents the HTTP response, again extending the native Node.js response type.

No less important, the `NextFunction` serves as a callback function, allowing control to pass through any other middleware functions. Along the way, all middleware will share the same request and response objects before the controller finally sends a response back to the requester.


`Updating `package.json` to Transpile TypeScript to JavaScript and Run the App`
Now that we have our skeleton ready to run, we first need some boilerplate configuration to enable TypeScript transpilation. Let’s add the file `tsconfig.json` in the project root:
``` json
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "inlineSourceMap": true
  }
}
```
Then we just need to add the final touches to package.json in the form of the following scripts:
``` json
"scripts": {
    "start": "tsc && node ./dist/app.js",
    "debug": "export DEBUG=* && npm run start",
    "test": "echo \"Error: no test specified\" && exit 1"
},
```
The test script is a placeholder that we’ll replace later.

NB: You can limit the debug output to our app.ts file’s own debugLog() statements using DEBUG=app instead of DEBUG=*
Windows users will probably need to change the `export` to `SET` since export is how it works on Mac and Linux. 

## DTOa and DAOs
Now, to handle our user IDs, let’s add the shortid library (using the terminal):
```
npm i --save shortid
npm i --save-dev @types/shortid
```
for securely hashing the user password
`npm i --save argon2 `

add mongoose for mongoDB
`npm i --save mongoose`

# JWT
`npm install --save jsonwebtoken crypto`