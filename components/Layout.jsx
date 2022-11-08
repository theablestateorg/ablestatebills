import { supabase } from "../utils/supabase";
import { useAuth } from "../utils/auth";
import Help from "../components/Help";
import Navbar from "./nav";
import { toast, ToastContainer } from "react-toastify";

function Layout({ children}) {

  const { user } = useAuth();

  return  (
    <>
      <Navbar user={user} />
      {children}
      {user && <Help toast={toast} />}
    </>
  )

}

export default Layout;
