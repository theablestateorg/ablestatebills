import Head from "next/head";
import Navbar from "../components/nav";
import { toast, ToastContainer } from "react-toastify";

function tickets() {
  return (
    <>
      <Head>
        <title>Shine Africa</title>
      </Head>
      <Navbar />
      {/* <Help /> */}

      <main className="pt-[70px] mx-3 md:mx-16 relative pb-6 min-h-screen">
        <h1>tickts</h1>
      </main>

      <ToastContainer />
    </>
  )
}

export default tickets