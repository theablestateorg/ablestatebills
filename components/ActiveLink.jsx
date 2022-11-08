import { useRouter } from "next/router";
import { motion, AnimateSharedLayout } from "framer-motion";

function ActiveLink({ name, href, activeIndex, setActiveIndex, index }) {
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    router.push(href);
  };
  const isActive = index === activeIndex;

  return (
    <motion.li
      onHoverStart={() => setActiveIndex(index)}
      className={`h-[70px] flex items-center border-b-2 ${
        router.asPath === href
          ? "border-black"
          : "border-transparent text-gray-500"
      }`}
    >
      <a
        href={href}
        onClick={handleClick}
        className="relative px-2 py-1 inline-block"
        // className={`hover:bg-gray-100 px-2 py-1 rounded-lg cursor-pointer`}
      >
        {isActive ? <motion.span layoutId="cover" className="cover bg-[#eaeaea] absolute inset-0 -z-10 rounded-md" /> : null}
        <span>{name}</span>
      </a>
    </motion.li>
  );
}

export default ActiveLink;
