import Head from "next/head";
import Navbar from "../components/nav";
import { toast, ToastContainer } from "react-toastify";
import TicketCard from "../components/TicketCard";
import { supabase } from "../utils/supabase";
import { useState, useEffect, Fragment } from "react";

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

      <main className="pt-[70px] mx-3 md:mx-16 relative pb-6 min-h-screen">
        {tickets.length > 0 && tickets.map((ticket, index) => (
          <Fragment key={index}>
            <TicketCard ticket={ticket} />
          </Fragment>
        ))}
      </main>
    </>
  )
}

export default Tickets