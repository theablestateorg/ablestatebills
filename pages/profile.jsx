import Head from "next/head";
import Navbar from "../components/nav";
import { supabase } from "../utils/supabase";
import { Form, Formik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import { useState, useEffect } from "react";
import { MdEdit, MdOutlineMail } from "react-icons/md";
import AccountSettings from "../components/AccountSettings";
import Password from "../components/Password";
import Footer from "../components/Footer";
import { downloadFile } from "../utils/getImages";
import { useAuth } from "../utils/auth";

export default function Dashboard() {
  const [showInfo, setShowInfo] = useState(1)
  const [profiles, setProfiles] = useState([])
  const [avatar, setAvatar] = useState("");
  const { signOut, user } = useAuth();

  useEffect(() => {
    getProfile()
    try {
      downloadFile(user.avatar_url.substring(8), "avatars")
        .then((data) => setAvatar(data.avatar_url))
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  }, [])

  const handleSubmit = async (event, values) => {
    event.preventDefault();
  };

  const getProfile = async () => {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    setProfiles(data);
  };

  // console.log(profiles)

  return (
    <>
      <Head>
        <title>Profile - Shine Afrika</title>
      </Head>
      <Navbar />
      <ToastContainer />
      <main className="pt-[70px] mx-5 md:mx-20 relative pb-6 min-h-screen flex flex-col">
        <section className="flex justify-between items-center">
          <h1 className="font-bold text-2xl my-5">Profile</h1>
        </section>
        <div className="flex flex-grow">
          <section className="mb-5 w-3/12 border-r-2 mr-5 py-3 flex flex-col items-center">
            <div className={`w-16 h-16 ${!avatar && "bg-[#CA3011]"} rounded-full flex items-center justify-center relative dialog cursor-pointer`}>
            {avatar ? (
              <img src={avatar} alt="profile" />
            ) : (
              <span className="text-white font-bold">
                {user?.user_metadata.first_name[0].toUpperCase()}
                {user?.user_metadata.last_name[0].toUpperCase()}
              </span>
            )}
            </div>
            <h3 className="text-lg px-2 font-bold">
                {user && user.user_metadata.first_name + " " +user.user_metadata.last_name}
              </h3>
              <h3 className="border-b-2 pb-2 text-xs text-stone-500">
                {user && user.email}
              </h3>
              <div className="flex flex-col gap-5 mt-5 items-start">
                <button onClick={() =>setShowInfo(1)} className={`${showInfo === 1 && "bg-gray-200"}  py-2 px-4 w-full`}>Account Settings</button>
                <button onClick={() =>setShowInfo(2)} className={`${showInfo === 2 && "bg-gray-200"}  py-2 px-4 w-full`}>Password</button>
              </div>
          {/* <hr /> */}
          </section>
          {showInfo === 2 ? <Password user={user} /> : <AccountSettings user={user} avatar={avatar} />}
          
        </div>
        <Footer />
      </main>
    </>
  );
}

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
    props: { user },
  };
};
