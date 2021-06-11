import { gql } from "apollo-server-micro";

// Schema for graphql
export const typeDefs = gql`
  type Query {
    users: [User!]
    user(id: ID!) : User!
    isAuth: Auth!
  }

  type Mutation {
    createUser(fields: UserSignUpInput!): User!
    loginUser(fields: UserAuthInput!): User!
    updateUser(name: String, lastname: String, _id:ID!): User!
    updateUserEmailPass(email: String!, password: String, _id:ID!): User!
    logoutUser: Boolean!
  }

  type User {
    _id: ID!
    email: String!
    name: String
    password: String
    lastname: String
    avatar: String
    profiles: [Profile!]
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

  type Auth {
    isAuth: Boolean!
    _id: ID!
  }
`;
