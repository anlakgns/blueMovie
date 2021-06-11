import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const link = createHttpLink({
  uri: 'api/graphql',
  credentials: 'same-origin',
  onError: ({ networkError, graphQLErrors }) => {
    console.log('graphQLErrors', graphQLErrors)
    console.log('networkError', networkError)
  }
});

 export const client = new ApolloClient({
  link,  
  cache: new InMemoryCache(),
});




export default client;
