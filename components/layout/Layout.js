import HeaderNotLogged from "./HeaderNotLogged";
import HeaderLogged from "./HeaderLogged";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      <HeaderLogged />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
