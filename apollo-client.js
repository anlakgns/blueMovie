import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from 'apollo-upload-client';

const uploadLink = createUploadLink({
  uri: 'api/graphql',
  credentials: 'same-origin',
  onError: ({ networkError, graphQLErrors }) => {
    console.log('graphQLErrors', graphQLErrors)
    console.log('networkError', networkError)
  }
})


 export const client = new ApolloClient({
  link : uploadLink,  
  cache: new InMemoryCache(),
});




export default client;
