import Head from "next/head"
import Navbar from "../components/nav"
import { supabase } from "../utils/supabase"

export default function Dashboard() {
  
  return (
    <>
    <Head>
      <title>Profile</title>
    </Head>
    <Navbar />
    <main className='mt-[70px] mx-5 md:mx-20'>
      <section className="flex justify-between items-center">
          <h1 className="font-bold text-2xl my-5">Profile</h1>
        </section>
      <section>
      <div className="flex items-center gap-10 my-2">
        <p className="text-lg w-4/12 md:w-2/12">Name</p>
        <h3 className="text-lg py-2 px-2 font-bold rounded w-8/12 md:w-8/12">John Doe</h3>
      </div>
      <div className="flex items-center gap-10 my-2">
        <p className="text-lg w-4/12 md:w-2/12">Email</p>
        <h3 className="text-lg py-2 px-2 font-bold rounded w-8/12 md:w-8/12">johndoe@gmail.com</h3>
      </div>
      </section>
    </main>
    </>
  )
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
    props: {
    }
  }
}