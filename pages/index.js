import { supabase } from "../utils/supabase";
import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../utils/auth";
import Manager from "../components/roles/Manager";
import Customer from "../components/roles/Customer";
import Admin from "../components/roles/Admin";
import { parseCookies } from "../utils/parseCookies";
import axios from "axios";

export default function Home({ websites, customers, person }) {
  const [searchText, setSearchText] = useState("");
  const [status, setStatus] = useState("");
  const [searchBy, setSearchBy] = useState("name");
  const [sortNames, setSortNames] = useState(false);
  const [deleteArray, setDeleteArray] = useState([]);
  const [popUp, setPopUp] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const { user } = useAuth();

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
  const { role } = JSON.parse(person.user)?.profile || "customer";

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

  if (role === "customer") {
    return (
      <Customer websites={websites} customers={customers} person={person} />
    );
  } else if (role === "manager") {
    return <Manager websites={websites} customers={customers} />;
  } else if (role === "admin") {
    return <Admin websites={websites} customers={customers} />;
  } else {
    return (
      <main className="pt-[70px] mx-3 md:mx-16 relative pb-6 min-h-screen">
        <h1>Loading...</h1>
      </main>
    );
  }
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

  const { data: websites } = await supabase
    .from("websites")
    .select("*")
    .order("created_at", { ascending: false });

  const { data: customers } = await supabase.from("profiles").select("*");

  return {
    props: {
      websites,
      customers,
      person,
    },
  };
};
