
const db = require('../config/connection');
const { Word } = require('../models');

const wordData = require('./wordData.json');

db.once('open', async () => {
    const words = [];

    for (const word of wordData) {
        words.push({ word })
    }

    const addedWords = await Word.create(words);
    console.log('all done!');
    process.exit(0);
});
