import Head from "next/head";
import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import { downloadFile } from "../utils/getImages";
import { useAuth } from "../utils/auth";
import useMediaQuery from "../hooks/useMediaQuery";
import { useCookies } from "react-cookie";
import { parseCookies } from "../utils/parseCookies";
import { supabase } from "../utils/supabase";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function AccountLayout({ children }) {
  const [avatar, setAvatar] = useState("");
  const { user } = useAuth();
  const matches = useMediaQuery("(min-width: 800px)");
  const [cookie] = useCookies(["user"]);
  const router = useRouter()

  useEffect(() => {
    try {
      downloadFile(cookie?.user?.profile.avatar_url.substring(8), "avatars")
        .then((data) => setAvatar(data.avatar_url))
        .catch((error) => {});
    } catch (error) {}
  }, []);

  return (
    <>
      <Head>
        <title>Account - Shine Afrika</title>
      </Head>

      <main className="pt-[70px] mx-5 md:mx-20 relative pb-6 min-h-screen flex flex-col">
        <div className="mt-10 flex flex-col md:flex-row flex-grow">
          <section
            className={`mb-5 w-full md:w-3/12 ${
              !matches && "border-b-2"
            } md:mr-5 py-3 flex flex-col items-center outline outline-1 outline-gray-200 rounded bg-white pb-5 shadow-md`}
          >
            <div
              className={`w-16 h-16 rounded-full relative dialog cursor-pointer overflow-hidden flex justify-center items-center`}
            >
              {avatar ? (
                <Image
                  src={avatar}
                  alt={`${user?.user_metadata.last_name[0].toUpperCase()}`}
                  width={150}
                  height={150}
                />
              ) : (
                <span className="text-white font-bold flex items-center justify-center bg-[#CA3011] w-16 h-16">
                  {user?.user_metadata.first_name[0].toUpperCase()}
                  {user?.user_metadata.last_name[0].toUpperCase()}
                </span>
              )}
            </div>
            <h3 className="text-lg px-2 font-bold">
              {user &&
                user.user_metadata.first_name +
                  " " +
                  user.user_metadata.last_name}
            </h3>
            <h3 className="border-b-2 pb-2 text-xs text-stone-500 w-full text-center">
              {cookie?.user && cookie?.user?.user.email}
            </h3>
            <ul className="flex text-sm md:text-lg md:flex-col md:h-[80vh] gap-2 mt-5 items-start w-full px-4">
              <li className="w-full">
                <Link href="/account">
                  <div className={`w-full cursor-pointer px-2 py-1 hover:bg-neutral-100 rounded ${router.pathname === "/account" && "bg-neutral-200 hover:bg-neutral-200"}`}>Account</div>
                </Link>
              </li>
              <li className="w-full">
                <Link href="/profile">
                  <div className={`w-full cursor-pointer px-2 py-1 hover:bg-neutral-100 rounded ${router.pathname === "/profile" && "bg-neutral-200 hover:bg-neutral-200"}`}>Profile</div>
                </Link>
              </li>
              <li className="w-full">
                <Link href="/settings">
                  <div className={`w-full cursor-pointer px-2 py-1 hover:bg-neutral-100 rounded ${router.pathname === "/settings" && "bg-neutral-200 hover:bg-neutral-200"}`}>Settings</div>
                </Link>
              </li>
            </ul>
          </section>
          <section className="outline outline-1 outline-gray-200 shadow-md mb-5 rounded p-2 bg-white w-full">
            {children}
          </section>
        </div>
        <Footer />
      </main>
    </>
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
    props: { account_balance, person, transactions },
  };
};
