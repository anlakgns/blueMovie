// we need apollo-server-micro for graphql in next.js
import { ApolloServer } from "apollo-server-micro";
import { typeDefs } from "./schemas";
import { resolvers } from "./resolvers";
import mongoose from "mongoose";

const db = process.env.MONGODB_URL;

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  upload:false,
  context: async ({ req, res }) => {
    // Context function is called with every request.
    console.log(req.cookies)
    // Database Connection
    if (mongoose.connections[0].readyState) {
      return { req, res };
    }
    await mongoose
      .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("mongoDB connected.");
      })
      .catch((err) => {
        console.log(err.reason);
      });

    return { req, res };
  },
});
const handler = apolloServer.createHandler({ path: "/api/graphql" });

// Apollo Server or nextjs do the parser for us
export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;

// Notes
// Context : An object or an function that creates an object that is passed to every resolver. This enables resolvers to share helpful context. It is usefull for passing things that any resolver might need, like authentication scope, database connection and custom fetch functions. This context function is called with every request, so you can set the context based on the request's detail such HTTP headers.
