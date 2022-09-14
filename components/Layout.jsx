import { supabase } from "../utils/supabase";
import { useAuth } from "../utils/auth";
import Help from "../components/Help";
import { Router } from "next/router";
import { useRouter } from "next/router";

function Layout({ children }) {

  const { user } = useAuth();
  const router = useRouter()

  return  (
    <>
      {children}
      {user && <Help />}
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
