import { useRouter } from "next/router";

function TicketCard() {
  const router = useRouter();
  return (
    <div className="bg-white px-10 py-3 rounded-md my-5"
          onClick={() => router.push(`/tickets/1`)}
        >
          <div className="flex justify-between mb-2">
            <h2 className="font-bold">Charles Kasasira</h2>
            <p className="text-gray-400 text-sm">2 minutes ago</p>
          </div>
          <span className="bg-red-100 text-red-600 px-2 py-1 rounded-2xl text-sm font-bold">urgent</span>
          <p className="text-gray-400">Note</p>
          <p className="bg-gray-100 px-2 py-3 rounded-lg m-2">
            Hi, team at shineafrika. My website is currently down. I tried to check and I can't get the website. waiting to hear from you.
          </p>
        </div>
  )
}

export default TicketCard