import { TbMessageCircle2 } from "react-icons/tb";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../utils/auth";
import { supabase } from "../utils/supabase";
import { MdOutlineClose, MdOutlineArrowDownward } from "react-icons/md";

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
    const { data, error } = await supabase
      .from("tickets")
      .select("*")
      .eq("customer_id", user.id)
      // .order("timestamp", { ascending: false });

    if (data) {
      setMyMessages(data);
    }
    if (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    const mySubscription = supabase
    .from("tickets")
    .on("*", (payload) => {
      setMyMessages((current) => [...current, payload.new])
      getMessages().catch((error) => console.log(error));
      updateScroll();
    })
    .subscribe();

    return () => supabase.removeSubscription(mySubscription);
  }, [])

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
      msg.current.scrollTop = msg.current.scrollHeight;
    }
  }

  const scrollToBottom = () => {
    if (!msg.current) return;
    // console.log(msg.current.clientHeight + 1)
    msg.current.scrollTop = msg.current.scrollHeight;
  };

  // msg.current.scrollHeight - msg.current.scrollTop <= msg.current.clientHeight + 1

  return (
    <div
      className="fixed bottom-5 right-5 bg-[#CA3011] p-2 text-white rounded shadow hover:shadow-lg cursor-pointer"
      onClick={() => setChatBox(!chatBox)}
    >
      <TbMessageCircle2 size={30} />
      {chatBox && (
        <div
          className="absolute  bottom-2 w-64 h-80 shadow-lg bg-white outline outline-1 outline-[#CA3011] rounded-t-md rounded-bl-md flex flex-col text-black items-center overflow-hidden -right-0 md:right-12"
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          {
            <div
              className="bg-white w-10 h-10 absolute flex justify-center items-center shadow bottom-24 z-20 rounded-full text-gray-600 right-4"
              onClick={() => scrollToBottom()}
            >
              <MdOutlineArrowDownward />
            </div>
          }
          <p className="bg-gray-100 w-full text-sm font-bold py-2 flex justify-between px-2 items-center">
            Send message
            <span onClick={() => setChatBox(false)}>
              <MdOutlineClose />
            </span>
          </p>
          <div
            className="w-full flex flex-col h-48 overflow-y-scroll pb-10 bg-white"
            id="messages"
            ref={msg}
          >
            {myMessages.map((sent, index) => (
              <div key={index}>
                <p className="bg-gray-100 p-1 m-1 ml-5 text-sm relative rounded">
                  {sent.message}
                </p>
                {sent.response && (
                  <p className="bg-gray-200 p-1 m-1 mr-5 text-sm rounded">
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
