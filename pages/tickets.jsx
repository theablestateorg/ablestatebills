import Head from "next/head";
import Navbar from "../components/nav";
import { toast, ToastContainer } from "react-toastify";
import TicketCard from "../components/TicketCard";


function tickets() {
  
  return (
    <>
      <Head>
        <title>Shine Africa</title>
      </Head>
      <Navbar />
      <ToastContainer />

      <main className="pt-[70px] mx-3 md:mx-16 relative pb-6 min-h-screen">
        <TicketCard />
        <TicketCard />
        <TicketCard />
      </main>
    </>
  )
}

export default tickets