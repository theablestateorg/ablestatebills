import Head from "next/head"
import Navbar from "../../components/nav"
import { useRouter } from 'next/router'
import { supabase } from "../../utils/supabase"
import { useEffect, useState } from "react"

export default function Site() {
  const router = useRouter()
  const { id } = router.query
  const [site, setSite] = useState("")

  useEffect(() => {
    getSite()
  }, [])

  const getSite = async () => {
    const { data } = await supabase.from('websites').select('*').eq('id', id).single()

    setSite(data)
  }
  

  console.log(site)
  return (
    <div>
      <Head>
        <title>Shine Africa</title>
      </Head>
      <Navbar />

      <main className='mt-[70px] mx-5 md:mx-20'>
        {site && <>
          <section className="flex justify-between items-center">
            <h1 className="font-bold text-2xl my-5">{site.name}</h1>
          </section>
          <p>{site.contact_person}, {`+256` + site.telephone_number}</p>
          <section className="my-5">
            <h1>Extension</h1>
            <div className="flex gap-5 items-center my-1">
              <input type="date" className="py-2 px-2 bg-transparent  outline outline-2 outline-[#c1c7d6] rounded w-8/12 md:w-8/12" />
              <button className="bg-[#1D1F20] text-white py-2 px-4 hover:bg-[#292C2D] flex items-center gap-2">Extend</button>
            </div>
          </section>
        </>}
      </main>
    </div>
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