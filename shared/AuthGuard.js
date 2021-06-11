import {useContext} from "react"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useQuery } from '@apollo/client';
import {AuthContext} from "../shared/contexts/AuthContext"
import { ISAUTH } from "../shared/apolloRequests";

export const AuthGuard = ({ children }) => {
  const history = useRouter()
  const {loading,error,data} = useQuery(ISAUTH)

  useEffect(()=> {
    if(!loading && !data?.isAuth.isAuth) {
      history.push("/auth")
  }})

  
  if (data?.isAuth.isAuth) {
    return <>{children}</>
  }

  /* otherwise don't return anything, will do a redirect from useEffect */
  return null
}