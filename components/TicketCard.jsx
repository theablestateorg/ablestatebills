import { useRouter } from "next/router";
import moment from "moment/moment";

function TicketCard({ ticket, customer }) {
  const router = useRouter();

  return (
    <div
      className={`bg-white px-5 md:px-7 py-3 rounded-md my-2 md:my-3 ${
        customer ? "cursor-pointer hover:shadow-lg" : "cursor-not-allowed"
      }`}
      onClick={() => {
        if (customer) {
          router.push(`/tickets/${ticket.id}`);
        }
      }}
    >
      <div className="flex justify-between mb-2">
        {customer ? (
          <h2 className="font-bold">{customer}</h2>
        ) : (
          <h2 className="text-red-400 font-medium">Deleted Customer</h2>
        )}
        <p className="text-gray-400 text-sm">
          {moment(
            `${ticket.created_at.substr(0, 10)} ${
              +ticket.created_at.substr(11, 2) +
              3 +
              ticket.created_at.substr(13, 6)
            } `,
            "YYYY-MM-DD hh:mm:ss"
          ).fromNow()}
        </p>
      </div>
      {customer && (
        <span
          className={`${
            ticket.agency == "high"
              ? "bg-red-200 text-red-500"
              : ticket.agency == "mid"
              ? "bg-indigo-200 text-indigo-500"
              : "bg-neutral-200 text-neutral-500"
          }  px-2 py-1 rounded-md text-xs font-bold mb-1`}
        >
          {ticket.agency}
        </span>
      )}
      <span className="text-sm ml-1">{ticket.category}</span>
      <p className="bg-gray-100 px-2 py-3 rounded-md my-2">{ticket.message}</p>
    </div>
  );
}

export default TicketCard;
