import {AuthenticationError} from "apollo-server-micro";
import jwt from "jsonwebtoken";


export const throwAuthError = (errorText) => {
  throw new AuthenticationError(errorText)
}
export const isUserOwner = (id, valueToCompare) => {
  if(id !== valueToCompare.toString()) {
    false
  }  
  return true
}
export const generateToken = (userId) => {
  const token = jwt.sign({ id: userId}, "supersecretpassword", {
    expiresIn: "7d",
  });
  return token
};

