import React, { useState } from "react";
import Router, { useRouter } from "next/router";
import PackageNav from "../../../../components/PackageNav";
import { FaSearch } from "react-icons/fa";
import Starter from "../../../../components/Starter";
import HelpDeck from "../../../../components/HelpDeck";
import { useAuth } from "../../../../utils/auth";
import Link from "next/link";

function CreateAccountFirst() {
  const router = useRouter();
  const { id, go, domain } = router.query;

  const { user } = useAuth()

  console.log(user)

  const packages = ["starter", "scaler", "stablizer"].filter(
    (pack) => pack !== id?.toLowerCase()
  );

  const [searched, setSearched] = useState(null);
  const [run, setRun] = useState(false);

  const handleSearch = (event) => {
    setRun(true);
    event.preventDefault();
    // console.log(searched);
  };

  const [cart, setCart] = useState([])

  const names = cart && cart.map(product => product.name)

  console.log(names)

  return (
    <div>
      <PackageNav />
      <HelpDeck />
      <main
        className={`pt-[70px] mx-5 md:mx-20 relative pb-6 min-h-screen gap-10 `}
      >
        <section>
          <div className="flex justify-between items-center">
            <h1 className="font-medium text-xl mt-5">Create Account</h1>
            <a href={`/packages/${id}/${go}/login/?domain=${domain}`} className="underline">or login</a>
          </div>

          <form>
            <div className="flex flex-col my-2">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name=""
                  id="email"
                  className="outline outline-1 px-2 py-1 bg-transparent"
                  placeholder="Enter email"
                />
            </div>
            <div className="flex flex-col my-2">
                <label htmlFor="first_name">First Name</label>
                <input
                  type="text"
                  name="first_name"
                  id="first_name"
                  className="outline outline-1 px-2 py-1 bg-transparent"
                  placeholder="Enter first name"
                />
            </div>
            <div className="flex flex-col my-2">
                <label htmlFor="last_name">Last Name</label>
                <input
                  type="text"
                  name="last_name"
                  id="last_name"
                  className="outline outline-1 px-2 py-1 bg-transparent"
                  placeholder="Enter last name"
                />
            </div>
            <div className="flex flex-col my-2">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name=""
                  id="password"
                  className="outline outline-1 px-2 py-1 bg-transparent"
                  placeholder="Enter password"
                />
            </div>
            <div className="flex flex-col my-2">
                <label htmlFor="password2">Confirm Password</label>
                <input
                  type="password"
                  name=""
                  id="password2"
                  className="outline outline-1 px-2 py-1 bg-transparent"
                  placeholder="Confirm password"
                />
            </div>
            <div>
              <button type="submit" className="text-white bg-black px-2 py-1">Create Account</button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}

export default CreateAccountFirst;
