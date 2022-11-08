import { useRouter } from 'next/router'
import { motion, AnimateSharedLayout } from "framer-motion";

function ActiveLink({ name, href }) {
  const router = useRouter()

  const handleClick = (e) => {
    e.preventDefault()
    router.push(href)
  }

  return (
    <motion.li className={`h-[70px] flex items-center border-b-2 ${router.asPath === href ? 'border-black' : 'border-transparent text-gray-500'}`}>
      <a href={href} onClick={handleClick} className={`hover:bg-gray-100 px-2 py-1 rounded-lg cursor-pointer`}>
        {name}
      </a>
    </motion.li>
  )
}

export default ActiveLink
