import Head from "next/head";
import { ToastContainer, toast } from "react-toastify";
import { useState, useEffect } from "react";
import AccountSettings from "../components/AccountSettings";
import Password from "../components/Password";
import Footer from "../components/Footer";
import { downloadFile } from "../utils/getImages";
import { useAuth } from "../utils/auth";
import useMediaQuery from "../hooks/useMediaQuery";
import { useCookies } from "react-cookie";
import { parseCookies } from "../utils/parseCookies";
import { supabase } from "../utils/supabase";
import Image from "next/image";
import AccountLayout from "../components/AccountLayout";
import Accounts from "../components/Accounts";

export default function Account({ account_balance, transactions }) {
  const [showInfo, setShowInfo] = useState(0);
  const [avatar, setAvatar] = useState("");
  const { user } = useAuth();
  const matches = useMediaQuery("(min-width: 800px)");
  const [cookie] = useCookies(["user"]);

  useEffect(() => {
    try {
      downloadFile(cookie?.user?.profile.avatar_url.substring(8), "avatars")
        .then((data) => setAvatar(data.avatar_url))
        .catch((error) => {});
    } catch (error) {}
  }, []);

  return (
    <AccountLayout>
      <Accounts
        user={user}
        account_balance={account_balance}
        transactions={transactions}
      />
    </AccountLayout>
  );
}

export const getServerSideProps = async ({ req, res }) => {
  const person = parseCookies(req);
  if (res) {
    if (!person.user) {
      return {
        redirect: {
          permanent: false,
          destination: "/login",
        },
        props: {},
      };
    }
  }
  
  const { data: account_balance } = await supabase
    .from("accounts")
    .select("account_balance")
    .eq("id", JSON.parse(person.user).user.id)
    .single();

  const { data: transactions } = await supabase
    .from("transactions")
    .select("*")
    .eq("actor_id", JSON.parse(person.user).user.id)
    .order("created_at", { ascending: false });

  return {
    props: { account_balance, transactions },
  };
};
