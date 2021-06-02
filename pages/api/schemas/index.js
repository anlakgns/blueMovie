import {gql} from "apollo-server-micro"

// Schema for graphql
export const typeDefs = gql`
  type Query {
    users: [User]
  }

  type Mutation {
    addUser(userInput: UserInput!): User! 
  }

  type User {
    _id: ID!
    name: String!
    email: String!
    password: String! 
  }

  input UserInput {
    name: String!
    email: String!
    password: String! 
  }

`;