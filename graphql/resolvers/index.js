const bookingResolver = require('./bookingResolver');
const eventResolver = require('./eventResolver');
const userResolver = require('./userResolver');

const rootResolver = {
  ...bookingResolver,
  ...eventResolver,
  ...userResolver,
};

module.exports = rootResolver;