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
    addProfile(fields: addProfileInput!) : addProfile!
    deleteProfile(fields: deleteProfileInput!) : addProfile!
    changeProfile(fields: changeProfileInput!) : addProfile!
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

  input deleteProfileInput {
    name: String!
    _id: ID!
  }

  input changeProfileInput {
    _id: ID!
    name: String
    kidProtection:String
    profileId: ID!
    file: Upload
    lastModified: String
  }

  input ChangePlanInput {
    plan: String!
    _id: ID!
  }

  input addProfileInput {
    _id: ID!
    name: String!
    file: Upload
    lastModified: String
    kidProtection: Boolean!
  }

  type addProfile {
    profiles: [Profile!]
  }

  type Profile {
    _id: ID!
    name: String!
    avatar: String
    kidProtection: Boolean!
  }

  input UserSignUpInput {
    name: String!
    lastname: String
    email: String!
    phone:String
    password: String!
    file: Upload!
    lastModified: String

  }

  input UserUpdateInfoInput {
    name: String
    lastname: String
    phone:String
    file: Upload
    lastModified: String
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
    profiles: [Profile!]
  }

  type UploadedFileResponse {
    filename: String
    mimetype: String
    encoding: String
    url: String
    }
`;
