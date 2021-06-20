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
    updateUserInfo(fields: UserUpdateInfoInput!): User!
    updateUserEmail(fields: UserUpdateEmailInput!): User!
    updateUserPassword(fields: UserUpdatePasswordInput!): User!
    logoutUser: Boolean!
    singleUpload(file: Upload!): UploadedFileResponse!
    changePlan(fields: ChangePlanInput!) : ChangePlan!
  }

  type User {
    _id: ID!
    email: String!
    name: String!
    password: String
    lastname: String
    phone:String
    avatar: String
    profiles: [Profile!]
    plan: String!
  }

  input ChangePlanInput {
    plan: String!
    _id: ID!
  }

  type Profile {
    name: String!
    avatar: String
    kid: Boolean
  }

  input UserSignUpInput {
    name: String!
    lastname: String
    email: String!
    phone:String
    password: String!
    file: Upload!
  }

  input UserUpdateInfoInput {
    name: String
    lastname: String
    phone:String
    _id: ID!
  }

  type ChangePlan {
    newPlan: String!
  }

  input UserUpdateEmailInput {
    email: String!
    newEmail: String!
    password: String!
    _id: ID!
  }

  input UserUpdatePasswordInput {
    password: String!
    newPassword: String!
    _id: ID!
  }

  input UserAuthInput {
    email: String!
    password: String!
  }

  type Auth {
    _id: ID!
    isAuth: Boolean!
    name: String!
    lastname: String
    email: String!
    phone:String
    avatar: String
    plan: String!
  }

  type UploadedFileResponse {
      filename: String
      mimetype: String
      encoding: String
      url: String
    }
`;
