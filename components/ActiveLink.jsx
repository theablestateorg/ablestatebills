import { useRouter } from 'next/router'

function ActiveLink({ name, href }) {
  const router = useRouter()

  const handleClick = (e) => {
    e.preventDefault()
    router.push(href)
  }

  return (
    <li className={`h-[70px] flex items-center border-b-2 ${router.asPath === href ? 'border-black' : 'border-transparent text-gray-500'}`}>
      <a href={href} onClick={handleClick} className={`hover:bg-gray-100 px-2 py-1 rounded-lg cursor-pointer`}>
        {name}
      </a>
    </li>
  )
}

export default ActiveLink
