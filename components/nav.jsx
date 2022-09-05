import { IoMdNotificationsOutline } from 'react-icons/io'
import { CgMenu } from 'react-icons/cg'
import navStyles from '../styles/Nav.module.css'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabase'
import Router from 'next/router'
import { useRouter } from 'next/router'
import { useAuth } from '../utils/auth'

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const router = useRouter()
  const {signOut, user} = useAuth()

    if (showMenu || showMobileMenu) {
      window.onclick = (event) => {
        if (!event.target.matches(".dialog")) {
          setShowMenu(false);
          setShowMobileMenu(false);
        }
      };
    }

  return (
    <nav className="w-screen h-[70px] z-10 fixed top-0 right-0 left-0 bg-white py-2 px-3 md:px-16 flex justify-between items-center border-b-2 border-[#E4E6E5]">
      <div className="flex gap-5 items-center">
        <h1 className="text-[#CA3011] font-Roboto text-3xl font-black cursor-pointer"
        onClick={() => router.push("/")}
        >
          ShineAfrika
        </h1>
        <ul className={`${navStyles.navMenu} h-[70px] items-center`}>
          <li className={`h-[70px] flex items-center border-b-2 border-transparent hover:border-b-2 hover:border-black ${router.pathname === '/' && "border-black "}`}>
          <Link href="/">Dashboard</Link>
          </li>
          <li className={`h-[70px] flex items-center border-b-2 border-transparent hover:border-b-2 hover:border-black ${router.pathname === '/add-site' && "border-black "}`}>
          <Link href="/add-site">Add Site</Link>
          </li>
          <li className={`h-[70px] flex items-center border-b-2 border-transparent hover:border-b-2 hover:border-black ${router.pathname === '/logs' && "border-black "}`}>
          <Link href="/logs">Logs</Link>
          </li>
        </ul>
      </div>
      <div className={navStyles.profileMenu}>
        <i className='cursor-pointer'>
          <IoMdNotificationsOutline size={25} />
        </i>
        <p className='cursor-pointer'>Hi, {user && user?.user_metadata.first_name}</p>
        <div className="w-10 h-10 bg-[#CA3011] rounded-full flex items-center justify-center relative dialog cursor-pointer"
        onClick={(event) => {
          setShowMenu(!showMenu)
          event.stopPropagation();
        }}
        >
          <span className='text-white font-bold'>{user?.user_metadata.first_name[0].toUpperCase()}</span>
          {showMenu && <ul className='bg-white absolute z-10 outline outline-1 outline-[#E4E6E5] top-[60px] right-0 py-2'>
              <Link href="/profile">
                <li className='w-full p-2 px-12 mb-1 hover:bg-[#ececec]'>Profile</li>
              </Link>
            <li className='w-full p-2 px-12 hover:bg-[#ececec]'>
              <button onClick={() => {
                signOut()
                Router.push('/login')
              }}>Logout</button>
            </li>
          </ul>}
        </div>
      </div>
      <div className={navStyles.mobileMenu}>
        <i className='bg-red-500  cursor-pointer relative'
          onClick={(event) => {
            setShowMobileMenu(!showMobileMenu)
            event.stopPropagation();
          }}
        >
          <CgMenu size={25} color={"#CA3011"} />
          {showMobileMenu && <ul className='bg-white absolute z-10 outline outline-1 outline-[#E4E6E5] top-[60px] -right-5 p-2'>
            <li className='w-full py-2 pl-2 pr-12 hover:bg-[#f3f5f7]'>
              <Link href="/">Home</Link>
            </li>
            <li className='w-full py-2 pl-2 pr-12 hover:bg-[#f3f5f7]'>
              <Link href="/add-site" className=''>AddSite</Link>
            </li>
            <li className='w-full py-2 pl-2 pr-12 hover:bg-[#f3f5f7]'>
              <Link href="/profile">Profile</Link>
            </li>
            <li className='w-full py-2 pl-2 pr-12 hover:bg-[#f3f5f7]'>
              <button onClick={() => {
                signOut()
                Router.push('/login')
              }}>Logout</button>
            </li>
          </ul>}
        </i>
      </div>
    </nav>
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
      user,
    }
  }
}