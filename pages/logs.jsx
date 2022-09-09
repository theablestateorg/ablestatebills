import Head from "next/head";
import Navbar from "../components/nav";
import { useRouter } from "next/router";
import { MdAdd, MdSearch } from "react-icons/md";
import { supabase } from "../utils/supabase";
import { useState } from "react";
import moment from "moment";
import { MdDeleteOutline } from 'react-icons/md'
import { useAuth } from "../utils/auth";
import Footer from "../components/Footer";

export default function Home({ logs}) {
  const router = useRouter();


  return (
    <>
      <Head>
        <title>Logs - Shine Africa</title>
      </Head>
      <Navbar />
      <main className="pt-[70px] relative pb-6 min-h-screen">

        <div className="mb-5 overflow-x-scroll ">
          <table className=" w-full table-auto p-10">
            <caption className=" bg-white py-3 outline outline-1 outline-[#e5e7eb] px-3">
              <section className="flex justify-between items-center px-3 md:px-16">
                <h3 className="font-bold text-left">Logs</h3>
                <div className="flex justify-between items-center">
                  <button className="flex items-center bg-white rounded-lg outline outline-1 outline-[#ededed] text-sm px-4 py-2 ml-2 justify-between">
                  <MdDeleteOutline/>clear
                  </button>
                </div>
              </section>
            </caption>
            <tbody className="">
              {logs.map((log, index) => (
                <tr
                  className="border-b border-l-2 border-l-transparent cursor-pointer mb-10"
                  key={index}
                >
                  <td className="py-2 text-left pl-3 px-3 md:px-16 font-semibold">
                    <h1 className="font-medium">{log.name}</h1>
                    <span className="font-extralight text-sm">
                    {log.details}
                    (<span className={`${log.status.includes('success') ? "text-green-500" : "text-red-600"}`}>{log.status}</span>)
                    </span>
                  </td>
                  {/* <td className={`py-2 flex items-center h-full ${log.status.includes('success') ? "text-green-500" : "text-red-600"}`}>
                      <div>{log.status}</div>
                  </td> */}
                  <td className="py-2 text-right pl-3 px-3 md:px-16">
                      {moment(new Date(log.created_at)).format("DD/MM/YYYY - hh:mm:ss")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Footer />
      </main>
    </>
  );
}

export const getServerSideProps = async ({ req }) => {
  const { data: logs } = await supabase.from("logs").select("*").order('created_at', { ascending: false });

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
      logs,
    },
  };
};
