import Head from "next/head";
import Navbar from "../../components/nav";
import { toast, ToastContainer } from "react-toastify";

function Ticket() {
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
            <h1 className="font-bold">#TK23</h1>
            <div>
              <span className="bg-red-100 text-red-600 px-2 py-1 rounded-2xl text-sm font-bold mr-3">urgent</span>
              <span className="bg-green-100 text-green-600 px-2 py-1 rounded-2xl text-sm font-bold">open</span>
            </div>
          </div>
          <div className="w-full bg-white p-10 pb-16 rounded-lg">
            <div className="flex gap-5">
              <div className="w-12 h-12 flex justify-center items-center rounded-full bg-[#CA3011] text-white font-bold">
                CK
              </div>
              <div>
                <p className="bg-gray-100 px-2 py-3 rounded-lg m-2">Hi, team at shineafrika. My website is currently down. I tried to check and I can't get the website. waiting to hear from you.</p>
                <p className="font-bold">Charles Kasasira(Customer)</p>
              </div>
            </div>
            <div className="mt-12">
              <textarea type="text" name="" placeholder="Write your response here" id="" className="w-full px-5 py-2 outline-none border-b-2 border-b-transparent focus:border-b-gray-500" />
              <div className="flex justify-end"><input type="submit" value="Send" className="bg-black mt-5 text-white p-2 cursor-pointer" /></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Ticket