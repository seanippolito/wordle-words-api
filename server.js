const express = require('express');
// Import the ApolloServer class
const http = require("http");
const bodyParser = require('body-parser');
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

// Set up Apollo Server
// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
// });
// await server.start();




const startApolloServer = async (app, httpServer) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(
    cors(corsOptions),
    bodyParser.json(),
    expressMiddleware(server),
  );
  app.all('*', function (req, res, next) {
    next();
  });

  // db.once('open', () => {
  //   app.listen(PORT, () => {
  //     console.log(`API server running on port ${PORT}!`);
  //   });
  // });

  db.once('open', async () => {
    await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
  });
};

// Call the async function to start the server
startApolloServer(app, httpServer);

module.exports = httpServer;
