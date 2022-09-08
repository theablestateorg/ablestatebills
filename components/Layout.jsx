import React from "react";
import { supabase } from "../utils/supabase";
import { useAuth } from "../utils/auth";
import Help from "../components/Help";

function Layout({ children, websites }) {

  const { user } = useAuth();
  return (
    <>
      {children}
      {user && <Help />}
    </>
  );
}

export default Layout;

export const getServerSideProps = async ({ req }) => {
  const { data: websites } = await supabase
    .from("websites")
    .select("*")
    .order("created_at", { ascending: false });

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
    props: {
      websites,
    },
  };
};
