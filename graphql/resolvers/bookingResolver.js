//Models
const Booking = require('../../models/bookingModel');

//Helpers
const {
  transformBooking
} = require('../../helpers/mergeHelper');

module.exports = {
  bookings: async () => {
    try {
      const bookings = await Booking.find();
      return bookings.map(booking => {
        return transformBooking(booking);
      });
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
      return transformBooking(result);

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