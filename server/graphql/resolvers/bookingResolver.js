//Models
const Booking = require('../../models/bookingModel');

//Helpers
const {
  transformBooking
} = require('../../helpers/mergeHelper');

module.exports = {
  bookings: async (req) => {
    try {
      if (!req.isAuth) {
        throw new Error('User is Unauthenticated!')
      }

      const bookings = await Booking.find();
      return bookings.map(booking => {
        return transformBooking(booking);
      });
    } catch (err) {
      console.log(err);
      throw err;
    };
  },

  bookEvent: async (args, req) => {
    try {
      if (!req.isAuth) {
        throw new Error('User is Unauthenticated!')
      }

      const fetchedEvent = await Event.findOne({
        _id: args.eventId
      });

      if (!fetchedEvent) {
        throw new Error('Event does not exists!')
      }

      const booking = new Booking({
        user: req.userId,
        event: fetchedEvent
      });

      const result = await booking.save();
      return transformBooking(result);

    } catch (err) {
      console.log(err);
      throw err;
    };
  },

  cancelBooking: async (args, req) => {
    try {
      if (!req.isAuth) {
        throw new Error('User is Unauthenticated!')
      }

      const booking = await Booking.findById(args.bookingId).populate('event');

      if (!booking) {
        throw new Error('Booking does not exists!')
      }

      const event = transformEvent(booking.event);

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