import Head from "next/head";
import React, { useState } from "react";
import Router, { useRouter } from "next/router";
import PackageNav from "../../../../components/PackageNav";
import { FaSearch } from "react-icons/fa";
import Starter from "../../../../components/Starter";
import HelpDeck from "../../../../components/HelpDeck";
import axios from "axios";
import moment from "moment/moment";
import Packages from "../../../../components/Packages";

function Go() {
  const router = useRouter();
  const { id, go } = router.query;

  const [searched, setSearched] = useState(null);
  const [domainExt, setDomainExt] = useState(".com");
  const [availability, setAvailability] = useState(null);
  const [extStatus, setExtStatus] = useState(null);
  const [run, setRun] = useState(false);

  const handleSearch = async (event) => {
    setRun(true);
    event.preventDefault();
    // console.log(searched);
    await axios.post("https://kasasira.herokuapp.com/check-domain",
    {
      "domainName": `${searched}${domainExt}`
    }).then((res) => {
      // console.log(res.data)
      setAvailability(res.data)
    })
  };

  const [cart, setCart] = useState([])

  const names = cart && cart.map(product => product.name)


  // console.log(`${searched}${domainExt}`)
  // console.log(availability?.availability)
  return (
    <div>
      <Head>
        <title>Packages - Shine Africa</title>
      </Head>

      <PackageNav />
      <HelpDeck />
      <main
        className={`pt-[70px] mx-5 md:mx-20 relative pb-6 min-h-screen gap-10 `}
      >
        <section>
          <h1 className="font-medium text-xl mt-5">{id} package</h1>
          <p>Free .com/.org domain</p>
          <br />
          <h1 className="font-bold text-3xl mb-1">Get a Domain name</h1>
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="outline outline-1 w-64 md:w-96 flex">
              <input
                type="text"
                placeholder="Register your domain name"
                className="px-2 py-1 mr-3 outline outline-1 w-64 md:w-96"
                onChange={({ target }) => setSearched(target.value)}
                value={searched}
              />
              <select name="" id="" className="bg-transparent" onChange={({target}) => setDomainExt(target.value)}>
                <option value=".com">.com</option>
                <option value=".org">.org</option>
                <option value=".biz">.biz</option>
                <option value=".info">.info</option>
                <option value=".net">.net</option>
              </select>
            </div>
            <button className="bg-[#121212] text-white px-2 py-2 flex gap-1 justify-center items-center">
              <FaSearch />
              Search
            </button>
          </form>
          {searched && run &&
          <>
            {availability && availability?.availability === "registered"?
            <div className="bg-white py-10 px-3 mt-10 shadow-sm">
              <h1 className="font-bold text-xl">{`${searched}${domainExt}`}</h1>
              <span className="px-2 py-1 bg-[#cfe2ff] text-[#0d6efd] font-medium rounded-md mt-3">{availability?.availability}</span><span> at {availability.registrar}</span>
              <br />
              <h3 className="text-[#f8f9fa] font-medium mt-2 text-s, uppercase">Important Dates</h3>
              <div className="flex justify-around items-center bg-[#f8f9fa] py-3">
                <div>
                  <p>Created On</p>
                  <p>{moment(new Date(availability.created_at)).format("DD-MM-YYYY")}</p>
                </div>
                <div>
                  <p>Expires On</p>
                  <p>{moment(new Date(availability.expire_at)).format("DD-MM-YYYY")}</p>
                </div>
              </div>
            </div>
            :
            <div className="bg-white mt-10 outline outline-1 outline-gray-200 shadow-lg rounded-md pb-5">
              <div className="font-medium text-2xl p-5 bg-[#f7f7f7] mb-5">{`${searched}${domainExt}`}</div>
              <span className="px-2 py-1 bg-[#d2f4ea] text-[#198754]font-medium m-5">{availability? (availability?.availability).toUpperCase() : "...loading"}
              </span>

              <div className="m-5 rounded-md bg-[#f8f9fa] p-5">
                <p><b>{`${searched}${domainExt}`}</b> is available to register</p>
                <div className="mt-5" onClick={() => {
                  names.includes(`${searched}.com`)
                  ?
                    Router.push(`/packages/${id}/${go}/cart/?domain=${searched}${domainExt}`)
                  :
                    setCart([...cart, {name: `${searched}${domainExt}`, package: id}])
                }}>
                  {names.includes(`${searched}${domainExt}`)
                  ?
                    <span className="bg-[#ca3011] text-white px-1 py-1 mt-2 cursor-pointer">View</span>
                  :
                  <span className="outline outline-1 rounded-sm outline-[#6D6E70] text-[#6D6E70] px-3 py-1 mt-2 cursor-pointer hover:bg-[#6D6E70] hover:text-white font-medium">Add to Cart</span>
                  }
                </div>
              </div>

            </div>}
            
          
            
            <div className="outline outline-1 outline-[#e5e7eb] mb-5 mt-5 overflow-x-scroll select-none">
              <table className="bg-white w-full table-auto p-10 select-none">
                <caption className=" bg-white py-3 outline outline-1 outline-[#e5e7eb] px-3">
                  <section className="flex justify-between items-center">
                    <h3 className="font-bold text-left">Websites</h3>
                  </section>
                </caption>
                <thead>
                  <tr className="border-b bg-[#f7f7f7] text-[#555b6d]">
                    <th className="py-4 text-left pl-3 font-light">
                      <div className="flex items-center">Domain Name</div>
                    </th>
                    <th className="py-4 text-left pl-3 font-light">
                      <div className="flex items-center">Availability</div>
                    </th>
                    <th className="py-4 text-left pl-3 font-light">
                      <div className="flex items-center">Price</div>
                    </th>
                    <th className="py-4 text-left pl-3 font-light">
                      <div className="flex items-center">Add to Cart</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                <tr
                  className={`border-b border-l-2 border-l-transparent hover:border-l-[#ca3011] cursor-pointer mb-10`}
                >
                  <td className="py-2 text-left pl-3">
                    {searched}.com
                  </td>
                  <td className="py-2 text-left pl-3 text-sm text-green-500">
                    available
                  </td>
                  <td className="py-2 text-left pl-3 line-through">
                    35,000
                  </td>
                  <td className="py-2 text-left pl-3">
                    <span
                      onClick={() => {
                        names.includes(`${searched}.com`)
                      ?
                        Router.push(`/packages/${id}/${go}/cart/?domain=${searched}.com`)
                      :
                        setCart([...cart, {name: `${searched}.com`, package: id}])
                      }}
                    >
                      {names.includes(`${searched}.com`)
                      ?
                        <span className="bg-[#ca3011] text-white px-1">View</span>
                      :
                      <span className="bg-[#6D6E70] text-white px-1">Add to Cart</span>
                      }
                    </span>
                  </td>
                </tr>
                <tr
                  className={`border-b border-l-2 border-l-transparent hover:border-l-[#ca3011] cursor-pointer mb-10`}
                >
                  <td className="py-2 text-left pl-3">
                    {searched}.org
                  </td>
                  <td className="py-2 text-left pl-3 text-sm text-green-500">
                    available
                  </td>
                  <td className="py-2 text-left pl-3 line-through">
                    60,000
                  </td>
                  <td className="py-2 text-left pl-3">
                    <span className=" text-white px-1"
                      onClick={() => {
                        names.includes(`${searched}.org`)
                      ?
                        Router.push(`/packages/${id}/${go}/cart/?domain=${searched}.org`)
                      :
                        setCart([...cart, {name: `${searched}.org`, package: id}])
                      }}
                    >
                      {names.includes(`${searched}.org`)
                    ?
                      <span className="bg-[#ca3011] text-white px-1">View</span>
                    :
                    <span className="bg-[#6D6E70] text-white px-1">Add to Cart</span>
                    }
                    </span>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
            </>
          }
        </section>
        <section className="mt-10">
          <h3 className="text-center mb-5">Our Packages</h3>
          <div className="flex gap-5 justify-center">
            <Packages myPackage={id} />
          </div>
        </section>
      </main>
    </div>
  );
}

export default Go;
