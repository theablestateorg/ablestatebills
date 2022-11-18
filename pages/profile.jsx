import { useState, useEffect } from "react";
import AccountSettings from "../components/AccountSettings";
import { downloadFile } from "../utils/getImages";
import { useAuth } from "../utils/auth";
import { useCookies } from "react-cookie";
import { parseCookies } from "../utils/parseCookies";
import AccountLayout from "../components/AccountLayout";

export default function Profile() {
  const [avatar, setAvatar] = useState("");
  const { user } = useAuth();
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
      <AccountSettings user={user} avatar={avatar} />
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

  return {
    props: {},
  };
};
