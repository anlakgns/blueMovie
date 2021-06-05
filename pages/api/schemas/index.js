import { gql } from "apollo-server-micro";

// Schema for graphql
export const typeDefs = gql`
  type Query {
    users: [User!]
    user(id: ID!) : User!
    isAuth: User!
  }

  type Mutation {
    createUser(fields: UserSignUpInput!): User!
    loginUser(fields: UserAuthInput!): User!
    updateUser(name: String, lastname: String, _id:ID!): User!
    updateUserEmailPass(email: String!, password: String, _id:ID!): User!
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
