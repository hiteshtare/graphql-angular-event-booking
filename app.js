//Node Modules
const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const {
  buildSchema
} = require('graphql');

//Initialize express app
const app = express();

//Middlewares
app.use(bodyParser.json())
app.use('/graphql', graphqlHttp({
  schema: buildSchema(`
  type RootQuery {
    events : [String!]!
  }

  type RootMutation {
    createEvent(name: String): String
  }
  
  schema {
    query: RootQuery
    mutation: RootMutation
  }
  `),
  rootValue: {
    events: () => {
      return ['Playing Piano', 'Solo Tripping', 'Meditating'];
    },
    createEvent: (args) => {
      const eventName = args.name;
      return eventName;
    }
  },
  graphiql: true
}));

module.exports = app;