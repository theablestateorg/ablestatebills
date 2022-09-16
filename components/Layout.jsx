import { supabase } from "../utils/supabase";
import { useAuth } from "../utils/auth";
import Help from "../components/Help";
import Navbar from "./nav";
import { toast, ToastContainer } from "react-toastify";

function Layout({ children }) {

  const { user } = useAuth();

  return  (
    <>
      <Navbar />
      {children}
      {user && <Help toast={toast} />}
    </>
  )

}

export default Layout;

export const getServerSideProps = async ({ req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      props: {},
    };
  }

  return {
    props: {},
  };
};
