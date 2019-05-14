//Node Modules
const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const {
  buildSchema
} = require('graphql');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Event = require('./models/eventModel');
const User = require('./models/userModel');

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

  type User {
    _id:ID!
    email:String!
    password:String
  }

  input EventInput{
    title:String!,
    description:String!
    price:Float!
    date:String!  
  }

  input UserInput{
    email:String!,
    password:String
  }

  type RootQuery {
    events : [Event!]!
  }

  type RootMutation {
    createEvent(eventInput: EventInput): Event
    createUser(userInput: UserInput): User
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
        date: new Date(args.eventInput.date),
        cretor: '5cdaa884cab32f6ec6fedb97'
      });
      let createdEvent;
      return event.save().then((result) => {
        createdEvent = {
          ...result._doc
        };
        return User.findById('5cdaa884cab32f6ec6fedb97');
      }).then((user) => {
        if (!user) {
          throw new Error('User does not exists!')
        }
        user.createdEvents.push(event);
        return user.save().then((result) => {
          return createdEvent;
        });
      }).catch((err) => {
        console.log(err);
        throw err;
      });
    },
    createUser: (args) => {
      return User.findOne({
        email: args.userInput.email
      }).then((user) => {
        if (user) {
          throw new Error('User already exists!')
        }
        return bcrypt.hash(args.userInput.password, 12);
      }).then((hashedPassword) => {
        const user = new User({
          email: args.userInput.email.toString(),
          password: hashedPassword
        });
        return user.save().then((result) => {
          return {
            ...result._doc
          };
        });
      }).catch((err) => {
        console.log(err);
        throw err;
      });
    }
  },
  graphiql: true
}));

module.exports = app;