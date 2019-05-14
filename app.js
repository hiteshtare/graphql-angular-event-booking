//Node Modules
const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const {
  buildSchema
} = require('graphql');
const mongoose = require('mongoose');

//Custom Config
var config = require('./config')

const events = []; // Global variable

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
app.use(bodyParser.json())

//GraphQL middleware
app.use('/graphql', graphqlHttp({
  schema: buildSchema(`
  type Event {
    _id:ID!
    title:String!
    description:String!
    price:Float!
    date:String!
  }

  input EventInput{
    title:String!,
    description:String!
    price:Float!
    date:String!  
  }

  type RootQuery {
    events : [Event!]!
  }

  type RootMutation {
    createEvent(eventInput : EventInput): Event
  }
  
  schema {
    query: RootQuery
    mutation: RootMutation
  }
  `),
  rootValue: {
    events: () => {
      return events;
    },
    createEvent: (args) => {
      const newEvent = {
        _id: Math.random().toString(),
        title: args.eventInput.title.toString(),
        description: args.eventInput.description.toString(),
        price: +args.eventInput.price,
        date: args.eventInput.date
      };
      console.log(args);
      events.push(newEvent);
      return newEvent;
    }
  },
  graphiql: true
}));

module.exports = app;