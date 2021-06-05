import jwt from "jsonwebtoken";


export const authorizeAndGetId = (req) => {

  // Token Exist Check
  if(!req.headers.authorization) {
    throwAuthError("Token does not exist.")
  }
  
  // Token Extract
  const token = req.headers.authorization.replace("Bearer ", "")
  
  // Token Extract Check
  if(!token) {
    throwAuthError("Token couldn't be formatted.")
  }
  
  // Verify Token
  const decodedToken = jwt.verify(token, "supersecretpassword")
  
  // Verify Check
  if(!decodedToken) {
    throwAuthError("Token couldn't be verified.")
  }
    
  return decodedToken.id
}



