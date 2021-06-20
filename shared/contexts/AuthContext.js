import {createContext, useState} from  "react"

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [authStates, setAuthStates] = useState({
    isAuth: false,
    userId : "",
    name: "",
    email: "",
    lastname: "",
    avatar: "",
    phone: "",
    profiles: [],
    plan:"",
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
