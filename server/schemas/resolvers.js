const { Word } = require('../models');

const resolvers = {
  Query: {
    words: async (parent, args) => {
      const words = await Word.find().select('-__v -id');
      console.log(words);
      return words;
    },
  },
};

module.exports = resolvers;
