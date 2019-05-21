const bcrypt = require('bcryptjs');

//Models
const Event = require('../../models/eventModel');
const User = require('../../models/userModel');
const Booking = require('../../models/bookingModel');

const events = async (eventIds) => {
  try {
    const events = await Event.find({
      _id: {
        $in: eventIds
      }
    });

    return events.map(event => {
      return {
        ...event._doc,
        _id: event.id,
        date: new Date(event._doc.date).toISOString(),
        creator: user.bind(this, event._doc.creator)
      };
    });
  } catch (err) {
    console.log(err);
    throw err;
  };
}

const user = async (userId) => {
  try {
    const user = await User.findById(userId);

    return {
      ...user._doc,
      _id: user.id,
      createdEvents: events.bind(this, user._doc.createdEvents)
    };
  } catch (err) {
    console.log(err);
    throw err;
  };
}

const singleEvent = async (eventId) => {
  try {
    const event = await Event.findById(eventId);
    return {
      ...event._doc,
      _id: event.id,
      creator: user.bind(this, event.creator)
    }
  } catch (err) {
    console.log(err);
    throw err;
  };
}

module.exports = {
  events: async () => {
    try {
      const events = await Event.find();
      return events.map(event => {
        return {
          ...event._doc,
          _id: event.id,
          date: new Date(event._doc.date).toISOString(),
          creator: user.bind(this, event._doc.creator)
        };
      });
    } catch (err) {
      console.log(err);
      throw err;
    };
  },

  bookings: async () => {
    try {
      const bookings = await Booking.find();
      return bookings.map(booking => {
        return {
          ...booking._doc,
          _id: booking.id,
          user: user.bind(this, booking._doc.user),
          event: singleEvent.bind(this, booking._doc.event),
          createdAt: new Date(booking._doc.createdAt).toISOString(),
          updatedAt: new Date(booking._doc.updatedAt).toISOString()
        };
      });
    } catch (err) {
      console.log(err);
      throw err;
    };
  },

  createEvent: async (args) => {
    try {
      const event = new Event({
        title: args.eventInput.title.toString(),
        description: args.eventInput.description.toString(),
        price: +args.eventInput.price,
        date: new Date(args.eventInput.date),
        creator: '5ce23bde8f09db235842fbc6'
      });
      let createdEvent;
      const result = await event.save();

      const creator = await User.findById('5ce23bde8f09db235842fbc6');

      if (!creator) {
        throw new Error('User does not exists!')
      }

      createdEvent = {
        ...result._doc,
        _id: result._doc._id.toString(),
        date: new Date(event._doc.date).toISOString(),
        creator: user.bind(this, result._doc.creator)
      };

      creator.createdEvents.push(event);
      await creator.save()

      return createdEvent;
    } catch (err) {
      console.log(err);
      throw err;
    };
  },

  createUser: async (args) => {
    try {
      const user = await User.findOne({
        email: args.userInput.email
      });

      if (user) {
        throw new Error('User already exists!')
      }

      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
      const newUser = new User({
        email: args.userInput.email.toString(),
        password: hashedPassword
      });

      const result = await newUser.save();

      return {
        ...result._doc
      };
    } catch (err) {
      console.log(err);
      throw err;
    };
  },

  bookEvent: async (args) => {
    try {
      const fetchedEvent = await Event.findOne({
        _id: args.eventId
      });

      if (!fetchedEvent) {
        throw new Error('Event does not exists!')
      }

      const booking = new Booking({
        user: '5ce23bde8f09db235842fbc6',
        event: fetchedEvent
      });

      const result = await booking.save();
      return {
        ...result._doc,
        _id: result.id,
        user: user.bind(this, booking._doc.user),
        event: singleEvent.bind(this, booking._doc.event),
        createdAt: new Date(result._doc.createdAt).toISOString(),
        updatedAt: new Date(result._doc.updatedAt).toISOString()
      }

    } catch (err) {
      console.log(err);
      throw err;
    };
  },

  cancelBooking: async (args) => {
    try {
      const booking = await Booking.findById(args.bookingId).populate('event');

      if (!booking) {
        throw new Error('Booking does not exists!')
      }

      const event = {
        ...booking.event._doc,
        _id: booking.event.id,
        creator: user.bind(this, booking.event._doc.creator)
      }

      await Booking.deleteOne({
        _id: args.bookingId
      })

      return event;
    } catch (err) {
      console.log(err);
      throw err;
    };
  }
};