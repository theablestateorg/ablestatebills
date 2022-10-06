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
import Spinner from "../../../../components/Spinner";
import { MdPayment } from 'react-icons/md'
import { useAuth } from "../../../../utils/auth";

function Go() {
  const router = useRouter();
  const { id, go, domain } = router.query;
  const { user } = useAuth();

  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(null);
  const [domainExt, setDomainExt] = useState(".com");
  const [availability, setAvailability] = useState(null);
  const [selectedBtn, setSelectedBtn] = useState(2)
  const [extStatus, setExtStatus] = useState(null);
  const [run, setRun] = useState(false);

  const loadingMessages = ["Please wait", "We are getting everything ready"]

  const handleSearch = async (event) => {
    setLoading(true)
    setRun(true);
    event.preventDefault();
    // console.log(searched);
    await axios
      .post("/api/check-domain", {
        domainName: `${searched}${domainExt}`,
      })
      .then((res) => {
        console.log(res.data)
        setAvailability(res.data);
      });
    setLoading(false)
  };

  const handleLiveSearch = async (domain) => {
    if (run && domain) {
      await axios
        .post("/api/check-domain", {
          domainName: `${domain}${domainExt}`,
        })
        .then((res) => {
          setAvailability(res.data);
        });
    }
    setLoading(false)
  };

  const [cart, setCart] = useState([]);

  const names = cart && cart.map((product) => product.name)
  // let myText = loadingMessages[0]
  const [myText, setMyText] = useState(loadingMessages[0])

  return (
    <div>
      <Head>
        <title>Hosting - Shine Africa</title>
      </Head>

      <PackageNav />
      <HelpDeck />
      <main
        className={`pt-[70px] mx-5 md:mx-20 relative pb-6 min-h-screen gap-10 `}
      >
        <section>
          <div className="flex flex-col items-center p-20">
            <h1 className="font-bold text-3xl mb-5">You are one Step away from changing the world.</h1>
            <br />
            <div className="mb-5">
              <button className={`outline outline-1 p-2 font-medium ${selectedBtn === 1 && "bg-black text-white outline"}`}
              onClick={() => {
                setSelectedBtn(1)
              }}
              >I have my domain</button>
              <button className={`outline outline-1 p-2 font-medium ${selectedBtn === 2 && "bg-black text-white outline"}`}
              onClick={() => {
                setSelectedBtn(2)
              }}
              >Register a domain</button>
            </div>
            <form onSubmit={handleSearch} className="flex gap-4">
              <div className="outline outline-1 w-64 md:w-96 flex">
                <input
                  type="text"
                  placeholder={`${selectedBtn === 1? "Enter domain name" : "Register your domain name"}`}
                  className="px-2 py-1 outline outline-1 w-64 md:w-96"
                  onChange={({ target }) => {
                    setLoading(true)
                    router.push(`/packages/${id}/${go}?domain=${target.value}${domainExt}`, undefined, { shallow: true })
                    setSearched(target.value);
                    handleLiveSearch(target.value);
                  }}
                  value={searched}
                />
                {selectedBtn !== 1 &&
                  <select
                    name=""
                    id=""
                    className="bg-transparent"
                    onChange={({ target }) => {
                      setDomainExt(target.value)
                      router.push(`/packages/${id}/${go}?domain=${searched}${target.value}`, undefined, { shallow: true })
                    }}
                  >
                    <option value=".com">.com</option>
                    <option value=".org">.org</option>
                    <option value=".biz">.biz</option>
                    <option value=".info">.info</option>
                    <option value=".net">.net</option>
                  </select>
                }
              </div>
              <button className="bg-[#121212] text-white px-3 py-2 flex gap-1 justify-center items-center">
                {selectedBtn !== 1
                ?
                  <>
                    <FaSearch />
                    Search
                  </>
                :
                  <>
                    Add
                  </>
                }
                
              </button>
            </form>

            <div className="flex gap-2 mt-2">
              <p><span className="underline">.com</span> 50,000</p>
              <p><span className="underline">.org</span> 65,000</p>
              <p><span className="underline">.net</span> 50,000</p>
              <p><span className="underline">.biz</span> 50,000</p>
            </div>
          </div>

          {searched && run && (
            <div className="flex flex-row-reverse flex-wrap gap-5 items-start mt-10 justify-between">
              {availability && availability?.availability === "registered" ? (
                <div className="bg-white outline outline-1 outline-gray-200 shadow-lg rounded-md pb-5 flex-grow">
                  <div className="font-medium text-2xl p-5 bg-[#f7f7f7] mb-5">{`${searched}${domainExt}`}</div>
                  {!loading &&
                    <span className="px-2 py-1 bg-[#f4d2d2] text-[#198754]font-medium m-5">
                      {availability
                        ? (availability?.availability).toUpperCase()
                        : "...loading"}
                    </span>
                  }

                  {!loading ?
                  <div className="m-5 rounded-md bg-[#f8f9fa] p-5">
                  <h3 className=" font-medium mt-2 text-s, uppercase">
                    Important Dates
                  </h3>
                  <div className="flex justify-around items-center bg-[#f8f9fa] py-3">
                    <div>
                      <p>Created On</p>
                      <p>
                        {moment(new Date(availability.created_at)).format(
                          "DD-MM-YYYY"
                        )}
                      </p>
                    </div>
                    <div>
                      <p>Expires On</p>
                      <p>
                        {moment(new Date(availability.expire_at)).format(
                          "DD-MM-YYYY"
                        )}
                      </p>
                    </div>
                  </div>
                </div>
                  :
                  <div className="flex flex-col justify-center items-center p-5 ">
                    <Spinner />
                    <p>{myText}</p>
                  </div>
                  }
                </div>
              ) : (
                <div className="bg-white outline outline-1 outline-gray-200 shadow-lg rounded-md pb-5 flex-grow">
                  <div className="font-medium text-2xl p-5 bg-[#f7f7f7] mb-5">{`${searched}${domainExt}`}</div>

                  {!loading &&
                    <span className="px-2 py-1 bg-[#d2f4ea] text-[#198754]font-medium m-5">
                      {availability
                        ? (availability?.availability).toUpperCase()
                        : "...loading"}
                    </span>
                  }

                  {!loading ?
                  <div className="m-5 rounded-md bg-[#f8f9fa] p-5">
                    <div className="flex justify-between">
                      <p>
                        <b>{`${searched}${domainExt}`}</b>
                      </p>
                      <p>available</p>
                      <p className="line-through">50,000</p>
                    </div>
                    <br />
                    <div className="flex justify-between">
                      <p>
                        {/* <b>{`${searched}${domainExt}`}</b> */}
                      </p>
                      <p className="font-medium">{id}</p>
                      <p>{go}</p>
                    </div>
                    <br />
                    <hr />
                    <br />
                    <div className="flex justify-between">
                      <p>
                        {/* <b>{`${searched}${domainExt}`}</b> */}
                      </p>
                      <p>Total</p>
                      <p>{go}</p>
                    </div>
                    <div
                      className="mt-5"
                      onClick={() => {
                        // Router.push(
                        //       `/packages/${id}/${go}/cart/?domain=${searched}${domainExt}`
                        //     )
                            if (user) {
                              Router.push(
                                `/packages/${id}/${go}/checkout/?domain=${domain}`
                              );
                            } else {
                              Router.push(`/packages/${id}/${go}/login/?domain=${domain}`);
                            }
                      }}
                    >
                        <div className="outline outline-1 rounded-sm outline-[#6D6E70] text-[#6D6E70] px-3 py-1 mt-2 cursor-pointer hover:bg-[#6D6E70] hover:text-white font-medium flex items-center gap-3 w-28">
                          <MdPayment />
                          Pay
                        </div>
                    </div>
                  </div>
                  :
                  <div className="flex flex-col justify-center items-center p-5 ">
                    <Spinner />
                    <p>{myText}</p>
                  </div>
                  }
                </div>
              )}

              <section>
                <div className="bg-white outline outline-1 outline-gray-200 shadow-none rounded-md pb-5 flex-grow mb-5 p-5">
                  <span className="text-slate-400">keyword</span>{" "}
                  <b>{searched}</b>
                </div>
                <div className="outline outline-1 outline-[#e5e7eb] mb-5 overflow-x-scroll select-none">
                  <table className="bg-white w-full table-auto p-10 select-none">
                    <tbody>
                      <tr
                        className={`border-b border-l-2 border-l-transparent hover:border-l-[#ca3011] cursor-pointer mb-10`}
                      >
                        <td className="py-2 text-left pl-3">{searched}.com</td>
                        <td className="py-2 text-left pl-3 text-sm text-green-500">
                          available
                        </td>
                      </tr>
                      <tr
                        className={`border-b border-l-2 border-l-transparent hover:border-l-[#ca3011] cursor-pointer mb-10`}
                      >
                        <td className="py-2 text-left pl-3">{searched}.org</td>
                        <td className="py-2 text-left pl-3 text-sm text-green-500">
                          available
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          )}
        </section>
        <section className="mt-10">
        <h1 className="text-center font-medium text-xl">
          You chose {id} Hosting
        </h1>
          <h3 className="text-center mb-5">You can choose another below</h3>
          <div className="flex gap-5 justify-center">
            <Packages myPackage={id} />
          </div>
        </section>
      </main>
    </div>
  );
}

export default Go;
