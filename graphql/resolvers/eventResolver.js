//Models
const Event = require('../../models/eventModel');

//Helpers
const {
  dateToString
} = require('../../helpers/dateHelper');
const {
  transformEvent
} = require('../../helpers/mergeHelper');

module.exports = {
  events: async () => {
    try {
      const events = await Event.find();
      return events.map(event => {
        return transformEvent(event);
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
        date: dateToString(args.eventInput.date),
        creator: '5ce23bde8f09db235842fbc6'
      });
      let createdEvent;
      const result = await event.save();

      const creator = await User.findById('5ce23bde8f09db235842fbc6');

      if (!creator) {
        throw new Error('User does not exists!')
      }

      createdEvent = transformEvent(result);

      creator.createdEvents.push(event);
      await creator.save()

      return createdEvent;
    } catch (err) {
      console.log(err);
      throw err;
    };
  }
};