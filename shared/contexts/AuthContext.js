import {createContext, useState} from  "react"

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [authStates, setAuthStates] = useState({
    isAuth: false,
    userId : "",
    userName: "",
  })
  

  return (
    <AuthContext.Provider
      value={{
        authStates, 
        setAuthStates
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}
