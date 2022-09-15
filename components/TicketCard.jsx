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
          <span className={`${ticket.agency ? "bg-red-100 text-red-600" : "bg-yellow-100 text-yellow-600"} px-2 py-1 rounded-2xl text-xs font-bold mb-1`}>{ticket.agency ? "urgent" : "not urgent"}</span>
          {/* <p className="text-gray-400">Note</p> */}
          <p className="bg-gray-100 px-2 py-3 rounded-lg m-2">
            {ticket.message}
          </p>
        </div>
  )
}

export default TicketCard