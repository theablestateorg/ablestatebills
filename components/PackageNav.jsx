import { CgMenu } from "react-icons/cg";
import navStyles from "../styles/Nav.module.css";
import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";
import Router from "next/router";
import { useRouter } from "next/router";
import { useAuth } from "../utils/auth";
import Notifications from "./Notifications";
import { downloadFile } from "../utils/getImages";
import { Transition } from "@tailwindui/react";
import useMediaQuery from "../hooks/useMediaQuery";

export default function PackageNav() {
  const tablet = useMediaQuery("(max-width: 1000px)");
  const [showMenu, setShowMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [notify, setNotify] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [notifications, setNotifications] = useState([]);
  const router = useRouter();
  const { signOut, user, loading, setLoading } = useAuth();
  const { id, go, domain } = router.query;

  useEffect(() => {
    try {
      downloadFile(user.avatar_url.substring(8), "avatars")
        .then((data) => setAvatar(data.avatar_url))
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }

    getNotifications();
    const navSubscription = supabase
      .from("notifications")
      .on("*", (payload) => {
        setNotifications((current) => [...current, payload.new]);
        getNotifications().catch((error) => console.log(error));
      })
      .subscribe();

    setLoading(false);

    return () => supabase.removeSubscription(navSubscription);
  }, [user, loading]);

  const getNotifications = async () => {
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) {
      const myNotifications = data.filter(
        (note) => user && note.notifiers.includes(user.id)
      );
      setNotifications(myNotifications);
    }
    if (error) {
      console.log(error);
    }
  };

  if (showMenu || showMobileMenu) {
    window.onclick = (event) => {
      if (!event.target.matches(".dialog")) {
        setShowMenu(false);
        setShowMobileMenu(false);
      }
    };
  }

  return (
    <nav className="w-screen h-[70px] z-10 fixed top-0 right-0 left-0 bg-white py-2 px-3 md:px-16 flex justify-between items-center border-b-2 border-[#E4E6E5] select-none">
      <div className="flex gap-5 items-center justify-between w-[100%]">
        <div className="flex justify-center items-start gap-1">
          <h1
            className="text-[#CA3011] font-Roboto text-2xl font-black cursor-pointer"
            onClick={() => router.push("/")}
          >
            Ablestate Cloud
          </h1>
        </div>
        {!user ? (
          <div className="gap-2 flex">
            <select name="" id="" className="bg-transparent">
              <option value="ugx">UGX</option>
            </select>
            <button
              className="px-2 py-1"
              onClick={() => {
                Router.push(`/packages/${id}/${go}/login/?domain=${domain}`);
              }}
            >
              Login
            </button>
            <button
              className="text-white bg-gradient-to-r from-[#121212] to-[#1e293b] font-medium rounded px-2 py-1"
              onClick={() => {
                Router.push(
                  `/packages/${id}/${go}/create-account/?domain=${domain}`
                );
              }}
            >
              Create Account
            </button>
          </div>
        ) : (
          <div className={navStyles.profileMenu}>
            <span
              className="cursor-pointer relative"
              onClick={() => setNotify(!notify)}
            >
              <Notifications
                notify={notify}
                notifications={notifications}
                setNotifications={setNotifications}
              />
            </span>
            <p className="cursor-pointer">
              Hi, {user && user?.user_metadata.first_name}
            </p>
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center relative dialog cursor-pointer`}
              onClick={(event) => {
                setShowMenu(!showMenu);
                event.stopPropagation();
              }}
            >
              <span className="w-10 h-10 rounded-full overflow-hidden">
                {avatar ? (
                  <img src={avatar} alt="profile" />
                ) : (
                  <span className="text-white font-bold flex items-center justify-center bg-[#CA3011] w-10 h-10">
                    {user?.user_metadata.first_name[0].toUpperCase()}
                    {user?.user_metadata.last_name[0].toUpperCase()}
                  </span>
                )}
              </span>
              <Transition
                show={showMenu}
                enter="transition ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition ease-in-out duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <ul className="bg-white absolute z-10 outline outline-1 outline-[#E4E6E5] top-[60px] right-0 py-2">
                  <Link href="/profile">
                    <li className="w-full p-2 px-12 mb-1 hover:bg-[#ececec]">
                      Profile
                    </li>
                  </Link>
                  <li className="w-full p-2 px-12 hover:bg-[#ececec]">
                    <button
                      onClick={() => {
                        signOut();
                        Router.push("/packages/starter/175000/");
                      }}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </Transition>
            </div>
          </div>
        )}
      </div>
      <div className={navStyles.mobileMenu}>
        <i
          className="bg-red-500  cursor-pointer relative"
          onClick={(event) => {
            setShowMobileMenu(!showMobileMenu);
            event.stopPropagation();
          }}
        >
          <CgMenu size={25} color={"#CA3011"} />
          {showMobileMenu && (
            <ul className="bg-white absolute z-20 outline outline-1 outline-[#E4E6E5] top-10 right-0 p-2 w-56">
              <Link href="/" className="nn">
                <li className="w-full py-2 pl-2 pr-12 hover:bg-[#f3f5f7] not-italic">
                  Dashboard
                </li>
              </Link>
              <Link href="/add-site" className="">
                <li className="w-full py-2 pl-2 pr-12 hover:bg-[#f3f5f7] not-italic">
                  Add Product
                </li>
              </Link>
              <Link href="/logs">
                <li className="w-full py-2 pl-2 pr-12 hover:bg-[#f3f5f7] not-italic">
                  Logs
                </li>
              </Link>

              <Link href="/profile">
                <li className="w-full py-2 pl-2 pr-12 hover:bg-[#f3f5f7] not-italic">
                  Profile
                </li>
              </Link>
              <li className="w-full py-2 pl-2 pr-12 hover:bg-[#f3f5f7] not-italic">
                <button
                  onClick={() => {
                    signOut();
                    Router.push("/login");
                  }}
                >
                  Logout
                </button>
              </li>
            </ul>
          )}
        </i>
      </div>
    </nav>
  );
}
