import { ApolloServer, PubSub } from "apollo-server-express";
import _ from "lodash";
import { Server } from "http";
import { resolvers } from "./resolvers/root";
import { typeDefs } from "./typeDefs/root";

const pubsub = new PubSub();

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({ pubsub }),
  uploads: false,
});

const apollo = apolloServer.getMiddleware();

export const installSubscriptions = (server: Server) =>
  apolloServer.installSubscriptionHandlers(server);

export default apollo;
