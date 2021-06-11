import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation createUser($fields: UserSignUpInput!) {
    createUser(fields: $fields) {
      _id
    }
  }
`;

export const LOGIN = gql`
  mutation loginUser($fields: UserAuthInput!) {
    loginUser(fields: $fields) {
      _id,
      name
      
    }
  }
`;

export const LOGOUT = gql`
  mutation {
    logoutUser 
  }
`;


export const ISAUTH = gql`
  query {
    isAuth {
      _id,
      isAuth
    } 
  }
`;
