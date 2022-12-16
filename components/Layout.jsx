import { useAuth } from "../utils/auth";
import Help from "../components/Help";
import Navbar from "./nav";
import { ToastContainer, toast } from "react-toastify";
import { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";

function Layout({ children }) {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    getNotifications();
  }, [notifications]);

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
    }
  };

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
