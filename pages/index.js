import Head from "next/head";
import { useRouter } from "next/router";
import { MdAdd, MdSearch } from "react-icons/md";
import { FaSort } from "react-icons/fa";
import { supabase } from "../utils/supabase";
import { useEffect, useState, useRef } from "react";
import moment from "moment";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "../utils/auth";
import { IoWarning } from "react-icons/io5";
import { Footer } from "../components";
import Manager from "../components/roles/Manager"
import Customer from '../components/roles/Customer'
import Admin from "../components/roles/Admin";
import { getCookies, getCookie, setCookies, removeCookies } from 'cookies-next';

export default function Home({ websites, customers, person, people }) {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [status, setStatus] = useState("");
  const [searchBy, setSearchBy] = useState("name");
  const [recommend, setRecommend] = useState(null);
  const [sortNames, setSortNames] = useState(false);
  const [deleteArray, setDeleteArray] = useState([]);
  const [popUp, setPopUp] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const checkbox = useRef();
  const { user } = useAuth();

  console.log("people", people)

  websites = websites
    .filter((website) =>
      !website?.[searchBy] || searchBy !== "telephone_number"
        ? website?.[searchBy].toLowerCase().indexOf(searchText.toLowerCase()) >
          -1
        : website?.[searchBy]
            .toString()
            .toLowerCase()
            .indexOf(searchText.toLowerCase()) > -1
    )
    .filter((website) => !status || website.status === status);

  websites = sortNames
    ? websites.sort((a, b) => a[sortBy] > b[sortBy])
    : websites.sort((a, b) => b[sortBy] > a[sortBy]);

  const deleteArrayIds = deleteArray.map((site) => site[0].toString());

  const bulkDelete = async () => {
    const { data, error } = await supabase
      .from("websites")
      .delete()
      .in("id", deleteArrayIds);

    if (data) {
      toast.success(`Successfully deleted`, { position: "top-center" });
      await supabase.from("logs").insert([
        {
          name: `[Bulk Deleted] ${deleteArray.map((site) => site[1])}`,
          details: `deleted by ${user.first_name} ${user.last_name}`,
          status: "success",
        },
      ]);
    }
    if (error) {
      toast.error(`${error?.message}`, { position: "top-center" });
    }
    setPopUp(false);
  };

  if([user?.role, person?.user_metadata?.role].includes("customer")){
    return (
      <Customer websites={websites} customers={customers} person={person} />
    )
  }
  else if([user?.role, person?.user_metadata?.role].includes("manager")){
    return (
      <Manager websites={websites} customers={customers} />
    )
  }
  else if([user?.role, person?.user_metadata?.role].includes("admin")){
    return (
      <Admin websites={websites} customers={customers} />
    )
  }
  else {
    return (
      <main className="pt-[70px] mx-3 md:mx-16 relative pb-6 min-h-screen">
        <h1>Loading...</h1>
      </main>
    )
  }
}

export const getServerSideProps = async ({ req, res }) => {
  const { data: websites } = await supabase
    .from("websites")
    .select("*")
    .order("created_at", { ascending: false });

  const { data: customers } = await supabase.from("profiles").select("*");

  const { user: person } = await supabase.auth.api.getUserByCookie(req);
  const people = JSON.parse(getCookie('person', { req, res}));

  if (!people) {
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
      customers,
      person,
      people
    },
  };
};
