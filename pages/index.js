import { supabase } from "../utils/supabase";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../utils/auth";
import Manager from "../components/roles/Manager";
import Customer from "../components/roles/Customer";
import Admin from "../components/roles/Admin";
import { parseCookies } from "../utils/parseCookies";
import { useRouter } from "next/router";
import Tickets from "./tickets";

export default function Home({ websites, customers, person }) {
  const [searchText, setSearchText] = useState("");
  const [status, setStatus] = useState("");
  const [searchBy, setSearchBy] = useState("name");
  const [sortNames, setSortNames] = useState(false);
  const [deleteArray, setDeleteArray] = useState([]);
  const [popUp, setPopUp] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const { user } = useAuth();
  const [welcome, setWelcome] = useState(true)

  useEffect(() => {

  }, [welcome])

  const router = useRouter()

  const checkAccess = async() => {
    const { data, error } = await supabase
      .from("profiles")
      .update({ "accessed": true })
      .eq("id", JSON.parse(person.user)?.user.id);
    
    if(data){
      setWelcome(false)
    }

    router.push("/")
  };

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
      <>
        {user?.accessed === false && welcome && (
          <>
            <div className="bg-black bg-opacity-40 w-screen h-screen fixed z-10 flex justify-center items-center">
              <div className="bg-white rounded shadow w-11/12 lg:w-6/12">
                <div className="border-b px-3 py-2 flex justify-between">
                  <h1 className="font-medium">Getting Started</h1>
                  {/* <IoClose /> */}
                </div>
                <div className="p-5">
                  <h2 className="font-bold text-2xl">
                    Welcome to Shineafrika 🎉
                  </h2>
                  <p className="mb-2 text-gray-500">
                    Lets automate your online presence.
                  </p>
                  <p className="mb-5">
                    Our services focus on both large and small businesses to
                    make more sales through online presence
                  </p>
                  <div className="w-full flex justify-end">
                    <button
                      className="outline outline-1 outline-black bg-black text-white hover:text-black hover:bg-transparent px-3 py-1"
                      onClick={checkAccess}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        <Customer websites={websites} customers={customers} person={person} />
      </>
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
    if(person && JSON.parse(person.user).profile.role === "support"){
      return {
        redirect: {
          permanent: false,
          destination: "/tickets",
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
