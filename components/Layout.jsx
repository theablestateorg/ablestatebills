import { useAuth } from "../utils/auth";
import Help from "../components/Help";
import Navbar from "./nav";
import { toast } from "react-toastify";
import Router from "next/router";
import { useRouter } from "next/router";

function Layout({ children}) {

  const { user } = useAuth();
  

  return (
    <>
      <Navbar user={user} />
      {children}
      {user && <Help toast={toast} />}
    </>
  )

}

export default Layout;
