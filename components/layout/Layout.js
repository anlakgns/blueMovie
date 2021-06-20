import { useEffect, useContext } from "react";
import HeaderNotLogged from "./HeaderNotLogged";
import HeaderLogged from "./HeaderLogged";
import { AuthContext } from "../../shared/contexts/AuthContext";
import Footer from "./Footer";
import { ISAUTH } from "../../shared/apolloRequests";
import { useQuery } from "@apollo/client";






const Layout = ({ children }) => {
  const { loading, error, data } = useQuery(ISAUTH);
  const { authStates, setAuthStates } = useContext(AuthContext);
  
  useEffect(()=> {
    if(error) {
      setAuthStates(prev=> {
        return {
          ...prev,
          isAuth:false
        }
      })
    }
    if(data?.isAuth.isAuth) {
      setAuthStates(prev=> {
        return {
          ...prev,
          isAuth:true,
          name: data?.isAuth.name,
          lastname: data?.isAuth.lastname,
          phone:data?.isAuth.phone,
          email: data?.isAuth.email,
          password: data?.isAuth.passwordConfirm,
          plan: data?.isAuth.plan,
          avatar: data?.isAuth.avatar,
          userId: data?.isAuth._id
        }
      })
    }

  },[loading,error,data])

  return (
      <>
        {authStates.isAuth ? (
          <HeaderLogged />
        ) : (
          <HeaderNotLogged />
        )}
        {children}
        <Footer />
      </>
  );
};

export default Layout;

