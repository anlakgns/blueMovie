import jwt from "jsonwebtoken";
import {throwAuthError} from "./helpers"


export const authorizeAndGetId = (req) => {
  
  // Token exist check
  if(!req.cookies.token ||
    !req.cookies.token.startsWith('Bearer')) {
      throwAuthError("Bad Token")
    }
  
  const token = req.cookies.token.replace("Bearer ", "");

  // Token extract check
  if(!token) {
    throwAuthError("Token can't be formatted")
  }
  

  // Verify Token
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

  // Token Verified Check
  if(!decodedToken) {
    throwAuthError("Token can't be verified.")
  }

  return decodedToken.id;
};

