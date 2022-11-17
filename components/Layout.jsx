import { useAuth } from "../utils/auth";
import Help from "../components/Help";
import Navbar from "./nav";
import { ToastContainer, toast } from "react-toastify";

function Layout({ children }) {
  const { user } = useAuth();

  return (
    <>
      <Navbar user={user} />
      <ToastContainer />
      {children}
      {user && <Help toast={toast} />}
    </>
  );
}

export default Layout;
