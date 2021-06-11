import {AuthenticationError} from "apollo-server-micro";
import jwt from "jsonwebtoken";
import cookie from "cookie"


export const throwAuthError = (errorText) => {
  throw new AuthenticationError(errorText)
}
export const isUserOwner = (id, valueToCompare) => {
  if(id !== valueToCompare) {
    return false
  }  
  return true
}
export const generateToken = (userId) => {
  const token = jwt.sign({ id: userId}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token
};

export const sendCookie = (res,token) => {
  // Send a valid token through cookie.
  res.setHeader(
    "Set-Cookie", 
    cookie.serialize("token", `Bearer ${token}`, {
    httpOnly:true, // meaning:  js code on front not allowed to access this cookie
    expire: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ), // cookie life duration.
    secure: process.env.NODE_ENV !== "development", // meaning: only via https connections
    path:"/", // meaning: cookie available every page
    sameSite:"strict" //meaning: controls the cookie should be send which requests 
  } ))
}  

export const deleteCookie = (res) => {
   // Send a deleted token through cookie.
   res.setHeader("Set-Cookie", cookie.serialize("token", "deleted", {
    httpOnly:true, // meaning:  js code on front not allowed to access this cookie
    expire : new Date(0), // set expire that at past for browser to delete cookie.
    secure: process.env.NODE_ENV !== "development", // meaning: only via https connections
    path:"/", // meaning: cookie available every page
    sameSite:"strict" //meaning: controls the cookie should be send which requests 
  }))
}