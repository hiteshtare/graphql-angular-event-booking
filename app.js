//Node Modules
const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const {
  buildSchema
} = require('graphql');
const mongoose = require('mongoose');

const Event = require('./models/eventModel');

//Custom Config
var config = require('./config')


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
      return Event.find().then((events) => {
        return events.map(event => {
          return {
            ...event._doc
          };
        })
      }).catch((err) => {
        console.log(err);
        throw err;
      });
    },
    createEvent: (args) => {
      const event = new Event({
        title: args.eventInput.title.toString(),
        description: args.eventInput.description.toString(),
        price: +args.eventInput.price,
        date: new Date(args.eventInput.date)
      });
      return event.save().then((result) => {
        return {
          ...result._doc
        };
      }).catch((err) => {
        console.log(err);
        throw err;
      });
    }
  },
  graphiql: true
}));

module.exports = app;