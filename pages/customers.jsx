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
import { avatarColors } from "../utils/avatarColors";
import Avatar from "../components/Avatar";

export default function Customers({ websites, customers }) {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [status, setStatus] = useState("");
  const [searchBy, setSearchBy] = useState("name");
  const [sortNames, setSortNames] = useState(false);
  const [deleteArray, setDeleteArray] = useState([])
  const [popUp, setPopUp] = useState(false)
  const [sortBy, setSortBy] = useState("");
  const checkbox = useRef()
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

  const deleteArrayIds = deleteArray.map(site => site[0].toString())

  const bulkDelete = async () => {
    const { data, error } = await supabase
      .from('websites')
      .delete()
      .in('id', deleteArrayIds)

      if (data) {
        toast.success(`Successfully deleted`, { position: "top-center" });
        await supabase
          .from("logs")
          .insert([
            {
              name: `[Bulk Deleted] ${deleteArray.map(site => site[1])}`,
              details: `deleted by ${user.first_name} ${user.last_name}`,
              status: "success",
            },
          ]);
      }
      if (error) {
        toast.error(`${error?.message}`, { position: "top-center" });
      }
    setPopUp(false)
  }

  return (
    <>
      <Head>
        <title>Customers - Shine Afrika</title>
      </Head>
      <ToastContainer />

      <main className="pt-[70px] mx-3 md:mx-16 relative pb-6 min-h-screen">
        <section className="flex justify-between items-center my-10">
          <h1 className="font-bold text-2xl"></h1>
          <button
            className="bg-[#1D1F20] text-white py-2 px-4 my-2 mt-4 hover:bg-transparent hover:text-black outline outline-1 outline-black flex items-center gap-2 "
            onClick={() => router.push("/add-customer")}
          >
            <MdAdd />
            New Customer
          </button>
        </section>

        <div className="outline outline-1 outline-[#e5e7eb] mb-5 overflow-x-scroll select-none">
          <table className="bg-white w-full table-auto p-10 select-none">
            <caption className=" bg-white py-3 outline outline-1 outline-[#e5e7eb] px-3">
              <section className="flex justify-between items-center">
                <h3 className="font-bold text-left">Customers 
                {deleteArrayIds.length > 0 &&
                <span className="font-light ml-5 bg-gray-100 text-gray-500 p-2 rounded-lg">
                  {deleteArrayIds.length === websites.length ? 
                  <span>All 
                  <b className="font-bold"> {deleteArrayIds.length}</b> products are selected. </span> : <span><b className="font-bold">{deleteArrayIds.length}</b> products are selected.</span>}
                </span>
                }
                </h3>
                <div className="flex items-center gap-2">
                <form onSubmit={(event) => {
                  event.preventDefault()
                  setPopUp(true)
                }}>
                    <select
                        name=""
                        id=""
                        className="px-3 py-2 bg-[#f7f7f7] rounded-lg placeholder:text-[#bcbfc2] outline outline-1 outline-[#f4f3f7]" required
                      >
                        <option value="">Bulk Actions</option>
                        <option value="telephone_number">Delete</option>
                      </select>
                      <input type="submit" value="apply" className="px-3 py-2 ml-2 bg-gray-700 text-white rounded-lg text-sm cursor-pointer" />
                  </form>
                  <div className="flex justify-between items-center">
                    <div className="flex justify-between items-center relative focus-within:text-black ">
                      <input
                        type="text"
                        placeholder="search"
                        className="px-3 py-2 bg-[#f7f7f7] rounded-lg placeholder:text-[#bcbfc2] w-full outline outline-1 outline-[#f4f3f7]"
                        onChange={(event) => setSearchText(event.target.value)}
                      />
                      <select
                        name=""
                        id=""
                        className="absolute right-1 px-1 py-2 ml-2 bg-white rounded-lg outline outline-1 outline-[#ededed] text-sm"
                        onChange={(event) => setSearchBy(event.target.value)}
                      >
                        <option value="name">name</option>
                        <option value="telephone_number">no.</option>
                        <option value="contact_person">person</option>
                      </select>
                    </div>
                  </div>
                </div>
              </section>
            </caption>
            <thead>
              <tr className="border-b bg-[#f7f7f7] text-[#555b6d]">
                {/* <th className="py-4 text-center px-3 w-1">
                  <input type="checkbox" className="accent-[#ca3011]" name="" id="" ref={checkbox} onChange={() => {
                    if(checkbox.current.checked === true){
                      Object.values(document.getElementsByClassName("checkboxes")).map(checkbox => checkbox.checked = true)
                      setDeleteArray(websites.map(site => [site.id, site.name]))
                    } else {
                      Object.values(document.getElementsByClassName("checkboxes")).map(checkbox => checkbox.checked = false)
                      setDeleteArray([])
                    }
                  }} />
                </th> */}
                <th className="py-4 text-left pl-3 font-light">
                  <div className="flex items-center">
                    Name
                    <i
                      className="cursor-pointer"
                      onClick={() => {
                        setSortNames(!sortNames);
                        setSortBy("name");
                      }}
                    >
                      <FaSort size={13} />
                    </i>
                  </div>
                </th>
                <th className="py-4 text-left pl-3 font-light">
                  <div className="flex items-center">
                    Telephone
                    <i
                      className="cursor-pointer"
                      onClick={() => {
                        setSortNames(!sortNames);
                        setSortBy("telephone_number");
                      }}
                    >
                      <FaSort size={13} />
                    </i>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer, index) => (
                <tr
                  className={`border-b border-l-2 border-l-transparent hover:border-l-[#ca3011] cursor-pointer mb-10 ${deleteArrayIds.includes(customer.id.toString()) && "bg-red-50 border-l-[#ca3011]"}`}
                  key={index}
                  onClick={() => router.push(`/customers/${customer.id}`)}
                >
                  {/* <td className="py-4 text-center px-3"
                    onClick={(event) => event.stopPropagation()}
                  > */}
                    {/* <input type="checkbox" name="" id="" className="checkboxes accent-[#ca3011]"
                      onChange={(event) => {
                        event.stopPropagation()
                        checkbox.current.checked = false
                        return event.target.checked ? 
                                  setDeleteArray([ ...deleteArray, [site.id, site.name]]) : 
                                  setDeleteArray(deleteArray.filter(element => element[0] !== site.id))
                      }}
                     /> */}
                  {/* </td> */}
                  <td className="py-2 text-left pl-3">
                    <span className="flex items-center gap-2">
                      {/* <div className={`bg-[${avatarColors["S"]}] w-10 h-10 rounded-full text-white flex items-center justify-center`}>
                      {customer.first_name[0].toUpperCase() + customer.last_name[0].toUpperCase()}
                      </div> */}
                      <Avatar first_name={customer.first_name} last_name={customer.last_name} />
                      <h1 className="font-medium">{customer.first_name + " "+ customer.last_name}</h1>
                    </span>
                  </td>
                  {/* <td className="py-2 text-left pl-3">{customers.filter((customer => customer.id === site.contact_person)).map((customer, index) => <p key={index}>{customer.first_name+ " " + customer.last_name}</p>)}</td> */}
                  <td className="py-2 text-left pl-3">
                    {customer.contact_number}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* {popUp && (
          <div
            className={`bg-black z-20 bg-opacity-40 w-screen min-h-screen fixed top-0 left-0 right-0 flex justify-center items-center`}
          >
            <div className="relative bg-white dark:bg-dark-bg max-h-screen overflow-auto dark:text-secondary-text p-10  rounded-md m-2 sm:mb-5 shadow-md top-50 z-20">
              <h1 className="text-center font-bold text-lg my-5">
                Delete {deleteArray.length} Websites
              </h1>
              <p>
                Are you sure you want to delete <b>
                    {deleteArray.map(site => site[1] + " ")}
                  </b>?
              </p>
              <p className="bg-[#ffe9d9] p-2 border-l-2 text-[#bc4c2e] border-[#fa703f] flex flex-col text-sm my-1">
                <span className="text-[#771505] font-bold flex items-center gap-1">
                  <IoWarning /> Warning
                </span>
                By deleting these website, you won&apos;t be able to access it or
                it&apos;s info
              </p>
              <div className="flex justify-between mt-5">
                <button
                  className="outline outline-1 outline-[#1D1F20] bg-[#1D1F20] text-white py-2 px-4 hover:bg-[#1D1F20] hover:text-white flex items-center gap-2"
                  onClick={() => setPopUp(false)}
                >
                  No, Cancel
                </button>
                <button
                  className="outline outline-1 outline-[#1D1F20] text-[#1D1F20] py-2 px-4 hover:bg-[#1D1F20] hover:text-white flex items-center gap-2"
                  onClick={bulkDelete}
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        )} */}

<Footer />
      </main>
    </>
  );
}

export const getServerSideProps = async ({ req }) => {
  const { data: websites } = await supabase
    .from("websites")
    .select("*")
    .order("created_at", { ascending: false });

    const { data: customers } = await supabase.from("profiles").select("*").eq("role", "customer");

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
    props: {
      websites,
      customers
    },
  };
};
