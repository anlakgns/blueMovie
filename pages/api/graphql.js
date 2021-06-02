// we need apollo-server-micro for graphql in next.js
import {ApolloServer} from "apollo-server-micro"
import {typeDefs} from "./schemas"
import {resolvers} from "./resolvers"
import mongoose from "mongoose"

const db = process.env.MONGODB_URL

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context : async() => {
    if(mongoose.connections[0].readyState) {
      return;
    }
    await mongoose.connect(db, 
      {
        useNewUrlParser: true, 
        useUnifiedTopology: true
      })
      .then(()=> {
        console.log("mongoDB connected.")
      })
      .catch((err)=> {
        console.log(err.reason)
      })
  }
});

const handler = apolloServer.createHandler({path: "/api/graphql"})

// Apollo Server or nextjs do the parser for us
export const config = {
  api: {
    bodyParser : false
  }
}

export default handler