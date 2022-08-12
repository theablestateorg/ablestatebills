import Head from "next/head";
import Navbar from "../components/nav";
import { useRouter } from "next/router";
import { MdAdd, MdSearch } from "react-icons/md";
import { supabase } from "../utils/supabase";
import { useState } from "react";
import moment from "moment";

export default function Home({ websites }) {
  const router = useRouter();
  const [searchText, setSearchText] = useState("")
  const [status, setStatus] = useState("");
  const [searchBy, setSearchBy] = useState("name")

  websites = websites.filter(
    (website) =>
      !website?.[searchBy] || searchBy !== "telephone_number" ?
      website?.[searchBy].toLowerCase().indexOf(searchText.toLowerCase()) > -1
      : website?.[searchBy].toString().toLowerCase().indexOf(searchText.toLowerCase()) > -1
  ).filter((website) => !status || website.status === status)

  return (
    <>
      <Head>
        <title>Shine Africa</title>
      </Head>
      <Navbar />
      <main className="mt-[70px] mx-3 md:mx-16">
        <section className="flex justify-between items-center my-10">
          <h1 className="font-bold text-2xl"></h1>
          <button
            className="bg-[#1D1F20] text-white py-2 px-4 my-2 mt-4 hover:bg-transparent hover:text-black outline outline-1 outline-black flex items-center gap-2 "
            onClick={() => router.push("/add-site")}
          >
            <MdAdd />
            New Site
          </button>
        </section>

        <div className="outline outline-1 outline-[#e5e7eb] mb-5 overflow-x-scroll">
          <table className="bg-white w-full table-auto p-10">
            <caption className=" bg-white py-3 outline outline-1 outline-[#e5e7eb] px-3">
              <section className="flex justify-between items-center">
                <h3 className="font-bold text-left">Sites</h3>
                <div className="flex justify-between items-center">
                  <div className="flex justify-between items-center relative focus-within:text-black ">
                    <input
                      type="text"
                      placeholder="search"
                      className="px-3 py-2 bg-[#f7f7f7] rounded-lg placeholder:text-[#bcbfc2] w-full outline outline-1 outline-[#f4f3f7]"
                      onChange={(event) => setSearchText(event.target.value)}
                    />
                    {/* <MdSearch
                      size={25}
                      color={"#121212"}
                      className="absolute pointer-events-none right-2"
                    /> */}
                    <select name="" id="" className="absolute right-1 px-1 py-2 ml-2 bg-white rounded-lg outline outline-1 outline-[#ededed] text-sm"
                    onChange={(event) => setSearchBy(event.target.value)}>
                      <option value="name">name</option>
                      <option value="telephone_number">no.</option>
                      <option value="contact_person">person</option>
                    </select>
                  </div>
                    {/* <select name="" id="" className="px-3 py-2 ml-2 bg-transparent rounded-lg outline outline-1 outline-[#ededed]">
                      <option value="">name</option>
                    </select> */}
                </div>
              </section>
            </caption>
            <thead>
              <tr className="border-b bg-[#f7f7f7] text-[#555b6d]">
                <th className="py-4 text-left pl-3 font-light">Website</th>
                <th className="py-4 text-left pl-3 font-light">
                  Contact Person
                </th>
                <th className="py-4 text-left pl-3 font-light">Telephone</th>
                <th className="py-4 text-left pl-3 font-light">
                <select name="" className="font-light bg-transparent" id="" onChange={(event) => setStatus(event.target.value)}>
                    <option value="">Status</option>
                    <option value="active" className="font-light">Active</option>
                    <option value="expired">Expired</option>
                    <option value="warning">Warning</option>
                  </select>
                </th>
              </tr>
            </thead>
            <tbody>
              {websites.map((site, index) => (
                <tr
                  className="border-b border-l-2 border-l-transparent hover:border-l-[#ca3011] cursor-pointer mb-10"
                  key={index}
                  onClick={() => router.push(`/sites/${site.id}`)}
                >
                  <td className="py-2 text-left pl-3">
                    <h1 className="font-medium">{site.name}</h1>
                    <span className="font-extralight text-sm text-[#bcbfc2]">
                      last paid {moment(new Date(site.last_paid)).format("DD-MM-YYYY")}
                    </span>
                  </td>
                  <td className="py-2 text-left pl-3">{site.contact_person}</td>
                  <td className="py-2 text-left pl-3">
                    {`+256` + site.telephone_number}
                  </td>
                  <td className="py-2 text-left text-xs pl-3 font-light flex">
                    <span className="outline outline-1 outline-[#e5e3e3] px-2 gap-1 py-1 rounded-lg flex items-center justify-between font-light">
                      <span className={`w-2 h-2 rounded-full ${site.status.includes('active') ? "bg-green-500" : site.status.includes('warning') ? "bg-yellow-200" : "bg-red-600"}`}></span>
                      {site.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps = async ({ req }) => {
  const { data: websites } = await supabase.from("websites").select("*");

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
    },
  };
};
