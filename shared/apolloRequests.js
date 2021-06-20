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
      _id 
      email
      name
      lastname
      avatar
      phone     
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
      isAuth,
      email
      name
      lastname
      avatar
      phone 
      plan
    } 
  }
`;
export const CHANGE_EMAIL = gql`
  mutation updateUserEmail($fields: UserUpdateEmailInput!) {
    updateUserEmail(fields: $fields) {
      email,
      _id
    }
  }
`
export const CHANGE_PASSWORD = gql`
  mutation updateUserPassword($fields: UserUpdatePasswordInput!) {
    updateUserPassword(fields: $fields) {
      _id
    }
  }
`
export const SINGLE_UPLOAD = gql`
  mutation singleUpload($file: Upload!) {
    singleUpload(file: $file) {
      url
    }
  }
`
export const CHANGE_INFO = gql`
  mutation updateUserInfo($fields: UserUpdateInfoInput!) {
    updateUserInfo(fields: $fields) {
      name
      lastname
      phone
    }
  }
`
export const CHANGE_PLAN = gql`
  mutation changePlan($fields: ChangePlanInput! ) {
    changePlan(fields: $fields) {
      newPlan
    }
  }
`