import { TbMessageCircle2 } from "react-icons/tb";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../utils/auth";
import { supabase } from "../utils/supabase";
import { MdOutlineClose, MdOutlineArrowDownward } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { Transition } from "@tailwindui/react";
import Select from "./SelectBox";

function Help({ toast }) {
  const { user, setLoading } = useAuth();
  const [chatBox, setChatBox] = useState(false);
  const [faqs, setFaqs] = useState(true);
  const [ticket, setTicket] = useState({
    agency: "",
    customer_id: user.id,
    message: "",
    category: "",
  });
  const [myMessages, setMyMessages] = useState([]);
  const [reload, setReload] = useState(false);
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");

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
      .order("created_at", { ascending: true });

    if (data) {
      setMyMessages(data);
    }
    if (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    getManagers();
    const mySubscription = supabase
      .from("tickets")
      .on("*", (payload) => {
        setMyMessages((current) => [payload.new, ...current]);
        getMessages().catch((error) => console.log(error));
        updateScroll();
      })
      .subscribe();

    return () => supabase.removeSubscription(mySubscription);
  }, []);

  const [managers, setManagers] = useState([]);
  const getManagers = async () => {
    const { data } = await supabase
      .from("profiles")
      .select("id")
      .in("role", ["manager", "admin"]);
    setManagers(() => data.map((manager) => manager.id));
  };

  const handleSubmit = async () => {
    if (status === "" || priority === "") {
      toast.error(`Category and priority are required`, {
        position: "top-center",
      });
      return;
    }
    const { data, error } = await supabase.from("tickets").insert([
      {
        ...ticket,
        category: status,
        agency: priority,
      },
    ]);

    if (data) {
      const { error } = await supabase.from("notifications").insert([
        {
          notification: `sent a message`,
          description: `${data[0].message}`,
          actor: `${user.first_name}`,
          ticket_id: data[0].id,
          notifiers: managers,
        },
      ]);
      if (error) {
        console.log(error);
      }
      setReload(!reload);
      updateScroll();
      setLoading(true);
    }
    if (error) {
      console.log(error);
    }
    setTicket({
      agency: "",
      customer_id: user.id,
      message: "",
      category: "",
    });
    setStatus("");
    setPriority("");
  };

  function updateScroll() {
    if (msg.current) {
      msg.current.scrollTop = msg.current.scrollHeight;
    }
  }
  useEffect(() => {
    updateScroll();
  }, [msg.current]);

  const scrollToBottom = () => {
    if (!msg.current) return;
    msg.current.scrollTop = msg.current.scrollHeight;
  };

  // msg.current.scrollHeight - msg.current.scrollTop <= msg.current.clientHeight + 1

  return (
    <div
      className="fixed bottom-5 right-5 bg-[#CA3011] p-2 text-white rounded shadow hover:shadow-lg cursor-pointer"
      onClick={() => setChatBox(!chatBox)}
    >
      <TbMessageCircle2 size={30} />
      <Transition
        show={chatBox}
        enter="transition ease-in-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition ease-in-out duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          className="absolute  bottom-2 w-72 h-96 shadow-lg bg-white outline outline-2 outline-[#CA3011] rounded-t-md rounded-bl-md flex flex-col text-black items-center -right-0 md:right-12"
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
          {ticket.message.length > 0 && faqs && (
            <div className="w-full  outline flex justify-center items-center">
              <p
                className="bg-white m-2 absolute shadow-lg bottom-24 z-20 text-gray-600 outline outline-1 outline-red-400 p-3 rounded-lg text-sm"
                onClick={() => scrollToBottom()}
              >
                <i onClick={() => setFaqs(false)} className="">
                  <IoMdClose size={20} />
                </i>
                Hello, you can see the{" "}
                <a
                  href="https://cloud.ablestate.co/faqs/"
                  className="text-blue-500 underline"
                  target="blank"
                >
                  FAQS
                </a>
                , to see if your questions.
              </p>
            </div>
          )}
          <p className="bg-gray-100 w-full text-sm font-bold py-2 flex justify-between px-2 items-center border-b-2 border-[#CA3011]">
            Send message
            <span onClick={() => setChatBox(false)}>
              <MdOutlineClose />
            </span>
          </p>
          <div
            className="w-full flex flex-col h-72 overflow-y-scroll pb-10 bg-white"
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
              <div className="flex gap-2 text-sm">
                <Select
                  options={[
                    { id: 1, value: "", name: "Category" },
                    { id: 2, value: "sells", name: "Sells" },
                    { id: 3, value: "technical", name: "Technical" },
                    { id: 4, value: "customer care", name: "Customer care" },
                  ]}
                  initialLabel={"Category"}
                  status={status}
                  setStatus={setStatus}
                  size={32}
                />
                <Select
                  options={[
                    { id: 1, value: "", name: "Priority" },
                    { id: 2, value: "low", name: "Low" },
                    { id: 3, value: "mid", name: "Mid" },
                    { id: 4, value: "high", name: "High" },
                  ]}
                  initialLabel={"Priority"}
                  status={priority}
                  setStatus={setPriority}
                />
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
      </Transition>
    </div>
  );
}

export default Help;
