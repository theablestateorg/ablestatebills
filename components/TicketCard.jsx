import { useRouter } from "next/router";
import moment from "moment/moment";

function TicketCard({ ticket, customer }) {
  const router = useRouter();

  return (
    <div className="bg-white px-10 py-3 rounded-md my-5 cursor-pointer"
          onClick={() => router.push(`/tickets/${ticket.id}`)}
        >
          <div className="flex justify-between mb-2">
            <h2 className="font-bold">
              {customer}
            </h2>
            <p className="text-gray-400 text-sm">{moment(`${ticket.created_at.substr(0, 10)} ${(+ticket.created_at.substr(11, 2) + 3) + ticket.created_at.substr(13, 6)} `, "YYYY-MM-DD hh:mm:ss").fromNow()}</p>
          </div>
          <span className={`${ticket.agency == "high" ? "bg-red-100 text-red-400" : ticket.agency == "mid" ? "bg-indigo-100 text-indigo-400" : "bg-neutral-100 text-neutral-400"}  px-2 py-1 rounded-2xl text-xs font-bold mb-1`}>{ticket.agency}</span>
          <span className="text-sm ml-1">{ticket.category}</span>
          <p className="bg-gray-100 px-2 py-3 rounded-lg m-2">
            {ticket.message}
          </p>
        </div>
  )
}

export default TicketCard