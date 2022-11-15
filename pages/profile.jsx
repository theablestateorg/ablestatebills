import Head from "next/head";
import { ToastContainer, toast } from "react-toastify";
import { useState, useEffect } from "react";
import AccountSettings from "../components/AccountSettings";
import Password from "../components/Password";
import Account from "../components/Account";
import Footer from "../components/Footer";
import { downloadFile } from "../utils/getImages";
import { useAuth } from "../utils/auth";
import useMediaQuery from "../hooks/useMediaQuery";
import { useCookies } from "react-cookie"
import { parseCookies } from "../utils/parseCookies";

export default function Dashboard() {
  const [showInfo, setShowInfo] = useState(0)
  const [avatar, setAvatar] = useState("");
  const { user } = useAuth();
  const matches = useMediaQuery("(min-width: 800px)");
  const [cookie] = useCookies(["user"]);

  useEffect(() => {
    try {
      downloadFile(cookie?.user?.profile.avatar_url.substring(8), "avatars")
        .then((data) => setAvatar(data.avatar_url))
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  }, [])

  const handleSubmit = async (event, values) => {
    event.preventDefault();
  };

  return (
    <>
      <Head>
        <title>Profile - Shine Afrika</title>
      </Head>
      <ToastContainer />

      <main className="pt-[70px] mx-5 md:mx-20 relative pb-6 min-h-screen flex flex-col">
        {/* <section className="flex justify-between items-center">
          <h1 className="font-bold text-2xl my-5">Profile</h1>
        </section> */}
        <div className="mt-10 flex flex-col md:flex-row flex-grow">
          <section className={`mb-5 w-full md:w-3/12 ${!matches && "border-b-2"} md:mr-5 py-3 flex flex-col items-center outline outline-1 outline-gray-200 rounded bg-white pb-5 shadow-md`}>
            <div className={`w-16 h-16 rounded-full relative dialog cursor-pointer overflow-hidden`}>
            {avatar ? (
              <img src={avatar} alt="profile" />
            ) : (
              <span className="text-white font-bold flex items-center justify-center bg-[#CA3011] w-16 h-16">
                {user?.user_metadata.first_name[0].toUpperCase()}
                {user?.user_metadata.last_name[0].toUpperCase()}
              </span>
            )}
            </div>
            <h3 className="text-lg px-2 font-bold">
                {user && user.user_metadata.first_name + " " +user.user_metadata.last_name}
              </h3>
              <h3 className="border-b-2 pb-2 text-xs text-stone-500 w-full text-center">
                {cookie?.user && cookie?.user?.user.email}
              </h3>
              <ul className="flex text-sm md:text-lg md:flex-col gap-5 mt-5 items-start w-full px-4">
                <li onClick={() =>setShowInfo(0)} className={`${showInfo === 0 && "bg-gray-200"} py-2 px-4 w-full list-none cursor-pointer rounded`}>Account</li>
                <li onClick={() =>setShowInfo(1)} className={`${showInfo === 1 && "bg-gray-200"}  py-2 px-4 w-full list-none cursor-pointer rounded`}>Profile</li>
                <li onClick={() =>setShowInfo(2)} className={`${showInfo === 2 && "bg-gray-200"}  py-2 px-4 w-full list-none cursor-pointer rounded`}>Password</li>
              </ul>
          </section>
          <section className="outline outline-1 outline-gray-200 shadow-md mb-5 rounded p-2 bg-white w-full">
            {showInfo === 2 ? <Password user={user} /> :
            showInfo === 1? <AccountSettings user={user} avatar={avatar} /> : <Account user={user} />}
          </section>
          
        </div>
        <Footer />
      </main>
    </>
  );
}

export const getServerSideProps = async ({ req, res }) => {
  const person = parseCookies(req)
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

  return {
    props: {},
  };
};
