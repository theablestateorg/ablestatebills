import Head from "next/head";
import Navbar from "../components/nav";
import { toast, ToastContainer } from "react-toastify";
import TicketCard from "../components/TicketCard";
import { supabase } from "../utils/supabase";
import { useState, useEffect, Fragment } from "react";
import { AiOutlineFileDone } from 'react-icons/ai'

function Tickets() {

  const [tickets, setTickets] = useState([])

  useEffect(() => {
    getTickets()
  }, [])

  const getTickets = async () => {
    const { data } = await supabase
    .from("tickets")
    .select("*")
    .order("created_at", { ascending: false });

    setTickets(data)
  }
  
  return (
    <>
      <Head>
        <title>Shine Africa</title>
      </Head>
      <Navbar />
      <ToastContainer />

      <main className="pt-[70px] mx-3 md:mx-16 relative pb-6 min-h-screen flex flex-col">
        {tickets.length > 0 && tickets.map((ticket, index) => (
          <Fragment key={index}>
            <TicketCard ticket={ticket} />
          </Fragment>
        ))}
        <div className="flex-grow flex gap-5 flex-col justify-center items-center text-lg font-bold text-gray-400">
            <AiOutlineFileDone size={50} />
          There are no new Tickets.
        </div>
      </main>
    </>
  )
}

export default Tickets