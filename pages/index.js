import Head from 'next/head'
import Navbar from '../components/nav'
import { useRouter } from 'next/router'
import {MdAdd, MdSearch} from 'react-icons/md'
import { supabase } from '../utils/supabase'

export default function Home({ websites }) {
  const router = useRouter()

  console.log(websites)

  return (
    <div>
      <Head>
        <title>Shine Africa</title>
      </Head>
      <Navbar />

      <main className='mt-[70px] mx-5 md:mx-20'>
      <section className="flex justify-between items-center">
        <h1 className="font-bold text-2xl">Sites</h1>
        <button className="bg-[#1D1F20] text-white py-2 px-4 my-2 mt-4 hover:bg-[#292C2D] flex items-center gap-2"
        onClick={() => router.push("/add-site")}
        >
          <MdAdd />
          New Site
        </button>
      </section>
      <section className="flex justify-between items-center my-3">
      <select name="" className='px-2 py-2 bg-transparent' id="">
        <option value="">All</option>
        <option value="">Active</option>
        <option value="">Expired</option>
        <option value="">Warning</option>
      </select>
      <div className="flex justify-between items-center relative focus-within:text-black ">
        <input type="text" placeholder="search" className="px-2 py-2 bg-transparent placeholder:text-[#bcbfc2] w-full focus:outline-none focus:ring-1  focus:ring-black" />
        <MdSearch size={25} color={"#bcbfc2"} className="absolute pointer-events-none right-2" />
      </div>
    </section>

    <table className="bg-white w-full table-auto outline outline-[#e5e7eb] outline-1">
        <thead>
          <tr className='border-b bg-[#f7fafc] text-[#4a5568]'>
            <th className="py-4 text-left pl-2 capitalize">WEBSITE</th>
            <th className="py-4 text-left pl-2 capitalize">CONTACT PERSON</th>
            <th className="py-4 text-left pl-2">TELEPHONE</th>
            <th className="py-4 text-left pl-2">STATUS</th>
          </tr>
        </thead>
        <tbody>
          {websites.map((site, index) => (
            <tr className='border-b border-l-2 border-l-transparent hover:border-l-2 hover:border-l-[#ca3011] cursor-pointer' key={index}
            onClick={() => router.push(`/sites/${site.id}`)}
            >
            <td className="py-2 text-left pl-2">
              <h1 className='font-semibold'>{site.name}</h1>
              <span className='text-sm text-[#bcbfc2]'>last 11mo and 6days</span>
            </td>
            <td className="py-2 text-left pl-2">{site.contact_person}</td>
            <td className="py-2 text-left pl-2">{`+256` + site.telephone_number}</td>
            <td className="py-2 text-left pl-2">
              <span className=""><span className='w-5 h-5 bg-green-500'></span>{site.status}</span>
            </td>
            </tr>
          ))}
          
        </tbody>
      </table>
        
      </main>
    </div>
  )
}

export const getServerSideProps = async ({ req }) => {
  const { data: websites } = await supabase.from('websites').select('*')

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
      websites,
    }
  }
}
