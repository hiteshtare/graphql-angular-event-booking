//Node Modules
const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const cors = require('cors');

const mongoose = require('mongoose');

//Custom Config
var config = require('./config')

//GraphQL
const graphQLSchema = require('./graphql/schema/index');
const graphQLResolvers = require('./graphql/resolvers/index');

//Custom Middleware
const isAuth = require('./middleware/is-auth');

//Initialize express app
const app = express();

//Connect to Database
mongoose.connect(config.mongoURI_config, {
  useNewUrlParser: true
}).then(() => {
  console.log(`Connected to ${config.mongoURI_config}`);
}).catch((e) => {
  throw e;
});
mongoose.Promise = global.Promise;

//Middlewares
app.use(cors()); //Cors (CROSS-ORIGIN RESOURCE SHARING) Middleware
app.use(bodyParser.json())
app.use(isAuth);

//GraphQL middleware
app.use('/graphql', graphqlHttp({
  schema: graphQLSchema,
  rootValue: graphQLResolvers,
  graphiql: true
}));

module.exports = app;