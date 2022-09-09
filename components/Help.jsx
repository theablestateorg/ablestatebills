import { TbMessageCircle2 } from "react-icons/tb";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../utils/auth";
import { supabase } from "../utils/supabase";

function Help() {
  const { user } = useAuth();
  const [chatBox, setChatBox] = useState(false);
  const [ticket, setTicket] = useState({
    agency: false,
    customer_id: user.id,
    message: "",
  });
  const [myMessages, setMyMessages] = useState([]);
  const [reload, setReload] = useState(false);

  const msg = useRef();
  useEffect(() => {
    getMessages();
    updateScroll();
  }, [reload, chatBox]);

  const getMessages = async () => {
    const { data, error } = await supabase.from("tickets").select("*");

    if (data) {
      setMyMessages(data);
    }
    if (error) {
      // console.log(error);
    }
  };

  const handleSubmit = async () => {
    const { data, error } = await supabase.from("tickets").insert([ticket]);

    if (data) {
      setReload(!reload);
      updateScroll();
    }
    if (error) {
      // console.log(error);
    }
    setTicket({
      agency: false,
      customer_id: user.id,
      message: "",
    });
  };

  function updateScroll() {
    // const element = document.getElementById("messages");
    // element.scrollTop = element.scrollHeight;
    if (msg.current) {
      msg.current.scrollTop = 600;
    }
  }

  return (
    <div
      className="fixed bottom-5 right-5 bg-[#CA3011] p-2 text-white rounded shadow hover:shadow-lg cursor-pointer"
      onClick={() => setChatBox(!chatBox)}
    >
      <TbMessageCircle2 size={30} />
      {chatBox && (
        <div
          className="absolute right-12 bottom-2 w-64 h-80 shadow-lg bg-white outline outline-1 outline-[#CA3011] rounded-t-md rounded-bl-md flex flex-col text-black items-center overflow-hidden"
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <p className="bg-gray-100 w-full text-sm font-bold py-2 flex justify-between px-2">
            Send message
            <span onClick={() => setChatBox(false)}>x</span>
          </p>
          <div
            className="w-full flex flex-col h-48 overflow-y-scroll pb-10"
            id="messages"
            ref={msg}
          >
            {myMessages.map((sent, index) => (
              <div key={index}>
                <p className="bg-gray-100 p-1 m-1 ml-5 text-sm relative rounded">
                  {sent.message}
                </p>
                {sent.response && (
                  <p className="bg-gray-300 p-1 m-1 mr-5 text-sm rounded">
                    {sent.response}
                  </p>
                )}
              </div>
            ))}
          </div>
          <div className="flex-grow flex w-full p-1 flex-col justify-end">
            <textarea
              type="text"
              className="p-1 w- full outline-none border-t-[1px] focus:border-t-black"
              placeholder="Write your message"
              name="message"
              onChange={(event) =>
                setTicket({ ...ticket, message: event.target.value })
              }
              value={ticket.message}
            />
            <div className="flex justify-between p -1 mt-1">
              <div className="flex gap-1 text-sm">
                <input
                  type="checkbox"
                  name="agency"
                  id=""
                  className="accent-gray-700"
                  onChange={(event) =>
                    setTicket({ ...ticket, agency: event.target.checked })
                  }
                />
                <p>urgent</p>
              </div>
              <button
                className={`${
                  ticket.message.length > 3
                    ? "bg-gray-800 text-white"
                    : "bg-gray-200"
                } px-2 rounded`}
                onClick={() => handleSubmit()}
              >
                send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Help;
