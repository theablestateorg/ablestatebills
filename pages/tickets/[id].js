import Head from "next/head";
import Navbar from "../../components/nav";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabase";
import { useAuth } from "../../utils/auth";

function Ticket() {
  const router = useRouter();
  const { id } = router.query;
  const [ticket, setTicket] = useState({});
  const { user } = useAuth()
  const [customer, setCustomer] = useState({})
  const [values, setValues] = useState({
    response: ''
  })
  const [reload, setReload] = useState(false)

  useEffect( () => {
    getTicket();
  }, [reload]);

  // useEffect(() => {
  //   const mySubscription = supabase
  //   .from("tickets")
  //   .on("*", (payload) => {
  //     // handler(payload.new);
  //     console.log(payload)
  //     setTicket((current) => [...current, payload.new])
  //     getMessages().catch((error) => console.log(error));
  //   })
  //   .subscribe();

  //   return () => supabase.removeSubscription(mySubscription);
  // }, [])

  const getTicket = async () => {
    const { data } = await supabase.from("tickets").select("*").eq("id", id).single();

    setTicket(data);
    if(data){
    const { data: cust } = await supabase
    .from("profiles")
    .select("*")
    .eq('id', data.customer_id)
    .single()

    setCustomer(cust)
    }
    
    // getCustomer()
    
  };

  // console.log(ticket)


  // if(customer )

  // const getCustomer = async () => {
  //   console.log("hello")
  //   const { data } = await supabase
  //   .from("profiles")
  //   .select("*")
  //   .eq('id', ticket.customer_id)
  //   .single()

  //   setCustomer(data)
  //   setReload(!reload)
  // }

  const handleResponse = async () => {
    const { data, error } = await supabase
    .from('tickets')
    .update({ response: values.response, response_by_id: user.id})
    .match({ id: ticket.id })
    if (data){ 
      setValues({
        response: ''
      })
    }
    setReload(!reload)
  }

  return (
    <div>
      <Head>
        <title>Shine Africa</title>
      </Head>
      <Navbar />

      <ToastContainer />

      <main className="pt-[70px] mx-5 md:mx-20 relative pb-6 min-h-screen">
        <div className="w-ful my-10 p-10">
          <div className="flex justify-between mb-5">
            <h1 className="font-bold">#TK{ticket.id}</h1>
            <div>
              <span className={`${ticket.agency ? "bg-red-100 text-red-600" : "bg-yellow-100 text-yellow-600"} px-2 py-1 rounded-2xl text-xs font-bold mb-1`}>{ticket.agency ? "urgent" : "not urgent"}</span>
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-2xl text-xs font-bold">
                open
              </span>
            </div>
          </div>
          <div className="w-full bg-white p-10 pb-16 rounded-lg">
            <div className="flex flex-col gap-5">
              <div className="flex">
                <div className="w-12 h-12 flex justify-center items-center rounded-full bg-[#CA3011] text-white font-bold">
                {customer && customer.first_name && customer.first_name[0].toUpperCase() + customer.last_name[0].toUpperCase() }
                </div>
                <div>
                  <p className="bg-gray-200 px-2 py-3 rounded-lg m-2">
                    {ticket.message}
                  </p>
                  <p className="font-bold">
                    {customer && customer.first_name && customer.first_name + " " + customer.last_name}
                    <span className="text-xs">(Customer)</span></p>
                </div>
              </div>
              <div className="flex flex-col items-end">
              {ticket.response && <>
                <p className="bg-gray-100 px-2 py-3 rounded-lg m-2">
                  {ticket.response}
                </p>
                {/* <p className="font-bold">
                  {customer && customer.first_name && customer.first_name + " " + customer.last_name}</p> */}
              </>}
                
              </div>
            </div>
            <div className="mt-12">
              <textarea
                type="text"
                name=""
                placeholder="Write your response here"
                id=""
                value={values.response}
                className="w-full px-5 py-2 outline-none border-b-2 border-b-transparent focus:border-b-gray-500"
                onChange={(event) => setValues({...values, response: event.target.value})}
              />
              <div className="flex justify-end">
                <input
                  type="submit"
                  value="Send"
                  className="bg-black mt-5 text-white p-2 cursor-pointer"
                  onClick={() => handleResponse()}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Ticket;
