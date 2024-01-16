const { Schema, model } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const wordSchema = new Schema({
  word: String,
});

const Word = model('Word', wordSchema);

module.exports = Word;
