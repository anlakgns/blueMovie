import { gql } from "apollo-server-micro";

// Schema for graphql
export const typeDefs = gql`
  type Query {
    users: [User!]
  }

  type Mutation {
    addUser(fields: UserSignUpInput!): User!
    authUser(fields: UserAuthInput!): User!
  }

  type User {
    _id: ID!
    email: String!
    name: String
    password: String
    lastname: String
    avatar: String
    profiles: [Profile!]
    token: String
  }

  type Profile {
    name: String!
    avatar: String
    kid: Boolean
  }

  input UserSignUpInput {
    name: String!
    email: String!
    password: String!
  }

  input UserAuthInput {
    email: String!
    password: String!
  }
`;
