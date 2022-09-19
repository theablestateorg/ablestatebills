import Head from "next/head";
import TicketCard from "../components/TicketCard";
import { supabase } from "../utils/supabase";
import { Fragment } from "react";
import { AiOutlineFileDone } from 'react-icons/ai'

function Tickets({ tickets, customers }) {
  return (
    <>
      <Head>
        <title>Tickets - Shine Afrika</title>
      </Head>
      <main className="pt-[70px] mx-3 md:mx-16 relative pb-6 min-h-screen flex flex-col">
        {tickets.length > 0 && tickets.map((ticket, index) => (
          <Fragment key={index}>
            <TicketCard ticket={ticket} customer={customers.filter(customer => customer.id === ticket.customer_id).map(customer => customer.first_name + " " + customer.last_name)[0]} />
          </Fragment>
        ))}
        {tickets.length === 0 &&
          <div className="flex-grow flex gap-5 flex-col justify-center items-center text-lg font-bold text-gray-400">
            <AiOutlineFileDone size={50} />
            There are no new Tickets.
          </div>
        }
      </main>
    </>
  )
}

export default Tickets

export const getServerSideProps = async ({ req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);
  const { data: customers } = await supabase.from("profiles").select("*");

  const { data: tickets } = await supabase
    .from("tickets")
    .select("*")
    .order("created_at", { ascending: false });

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
    props: { tickets, customers },
  };
};