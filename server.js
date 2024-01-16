const express = require('express');
// Import the ApolloServer class
const http = require("http");
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const cors = require('cors');

// Import the two parts of a GraphQL schema
const { typeDefs, resolvers } = require('./server/schemas');
const db = require('./server/config/connection');

const PORT = process.env.PORT || 3001;

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const app = express();
const httpServer = http.createServer(app);




// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (app, httpServer) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(cors(corsOptions));
  app.all('*', function (req, res, next) {
    next();
  });

  await server.start();

  app.use('/graphql', expressMiddleware(server));

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });
  });
};

// Call the async function to start the server
startApolloServer(app, httpServer);

module.exports = httpServer;
