const typeDefs = `
  type Word {
    _id: ID!
    word: String!
  }

  type Query {
    words: [Word]
  }
`;

module.exports = typeDefs;
