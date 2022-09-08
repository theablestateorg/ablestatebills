import { TbMessageCircle2 } from 'react-icons/tb'
import { useState } from 'react'
import { useAuth } from "../utils/auth";
import { supabase } from "../utils/supabase";

function Help() {
  const { user } = useAuth()
  const [chatBox, setChatBox] = useState(false)
  const [ticket, setTicket] = useState({
    agency: false,
    customer_id: user.id,
    message: "",

  })

  const handleSubmit = async () => {
    console.log(ticket)
    const { data, error } = await supabase
        .from("tickets")
        .insert([
          ticket
        ]);

      if (data) {}
      if(error){console.log(error)}
  }

  return (
    <div className="fixed bottom-5 right-5 bg-[#CA3011] p-2 text-white rounded shadow hover:shadow-lg cursor-pointer"
      onClick={() => setChatBox(!chatBox)}
    >
      <TbMessageCircle2 size={30} />
      {chatBox && <div className="absolute right-12 bottom-2 w-64 h-64 shadow-lg bg-white outline outline-1 outline-[#CA3011] rounded-t-md rounded-bl-md flex flex-col text-black items-center"
      onClick={(event) => {
        event.stopPropagation();
      }}
      >
          <p className='bg-gray-100 w-full text-sm font-bold py-2 flex justify-between px-2'>
            Send message
            <span onClick={() => setChatBox(false)}>x</span>
          </p>
          <div className='flex-grow flex w-full p-1 flex-col justify-end'>
            <textarea type="text" className='p-1 w- full outline-none border-t-[1px] focus:border-t-black' placeholder='Write your message' name='message'onChange={(event) => setTicket({...ticket, message: event.target.value})} />
            <div className='flex justify-between p -1 mt-1'>
              <div className='flex gap-1 text-sm'>
                <input type="checkbox" name="agency" id="" className='accent-gray-700' onChange={(event) => setTicket({...ticket, agency: event.target.checked})} />
                <p>urgent</p>
              </div>
              <button className={`${ticket.message.length > 3 ? "bg-gray-800 text-white" : "bg-gray-200"} px-2 rounded`}
              onClick={() => handleSubmit()}
              >send</button>
            </div>
          </div>
        </div>}
    </div>
  )
}

export default Help