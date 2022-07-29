import Head from "next/head";
import Navbar from "../components/nav";
import { supabase } from "../utils/supabase";

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Add Site</title>
      </Head>
      <Navbar />
      <main className='mt-[70px] mx-5 md:mx-20'>
        <section className="flex justify-between items-center">
          <h1 className="font-bold text-2xl my-5">Add Site</h1>
        </section>
        <form className="my-5">
          <div className="flex items-center gap-10 my-2">
            <label htmlFor="name" className="text-xl w-4/12 md:w-2/12">Add Site Name</label>
            <input type="text" name="name" placeholder="name" className=" py-2 px-2 bg-transparent  outline outline-2 outline-[#c1c7d6] rounded w-8/12 md:w-8/12" />
          </div>
          <div className="flex items-center gap-10 my-5">
            <label htmlFor="name" className="text-xl w-4/12 md:w-2/12">Contact Person</label>
            <input type="name" name="name" placeholder="person's name" className=" py-2 px-2 bg-transparent  outline outline-2 outline-[#c1c7d6] rounded w-8/12 md:w-8/12" />
          </div>
          <div className="flex items-center gap-10 my-5">
            <label htmlFor="telephone" className="text-xl w-4/12 md:w-2/12">Telephone</label>
            <input type="text" name="name" placeholder="person's name" className=" py-2 px-2 bg-transparent  outline outline-2 outline-[#c1c7d6] rounded w-8/12 md:w-8/12" />
          </div>
          <div className="flex items-center gap-10 my-5">
            <label htmlFor="telephone" className="text-xl w-4/12 md:w-2/12">Website</label>
            <input type="text" name="name" placeholder="website" className=" py-2 px-2 bg-transparent  outline outline-2 outline-[#c1c7d6] rounded w-8/12 md:w-8/12" />
          </div>
          <div className="flex items-center gap-10 my-5">
            <label htmlFor="telephone" className="text-xl w-4/12 md:w-2/12">Upload time</label>
            <input type="date" name="date" className=" py-2 px-2 bg-transparent  outline outline-2 outline-[#c1c7d6] rounded w-8/12 md:w-8/12" />
          </div>
          <div className="flex justify-end mt-10">
            <button className="bg-[#1D1F20] text-white py-2 px-4 my-2 mt-4 hover:bg-[#292C2D] flex items-center gap-2">Submit</button>
          </div>
        </form>
      </main>
    </>
  );
}

export const getServerSideProps = async ({ req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req)

  if(!user){
    return {
      redirect: {
        permanent: false,
        destination: "/login"
      },
      props: {},
    }
  }

  return {
    props: {}
  }
}
