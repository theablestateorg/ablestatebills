import React, { useState } from "react";
import Router, { useRouter } from "next/router";
import PackageNav from "../../../../components/PackageNav";
import { FaSearch } from "react-icons/fa";
import Starter from "../../../../components/Starter";
import HelpDeck from "../../../../components/HelpDeck";
import { CKAirtel, CKMtn } from "../../../../components/ck";

function go() {
  const router = useRouter();
  const { id, go, domain } = router.query;

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

  const [cart, setCart] = useState([]);

  const names = cart && cart.map((product) => product.name);

  const [paymentMethod, setPaymentMethod] = useState(null);
  const [complete, setComplete] = useState(null);

  return (
    <div>
      <PackageNav />
      <HelpDeck />
      <main
        className={`pt-[70px] mx-5 md:mx-20 relative pb-6 min-h-screen gap-10 `}
      >
        <section>
          <h1 className="font-medium text-xl mt-5 mb-5">Payment</h1>
          <div className="">
            <div className="flex gap-5">
              <p>Amount: </p>
              <p className="font-bold">{go}</p>
            </div>
            <div className="flex gap-5">
              <p>Package: </p>
              <p className="font-bold">{id} Package</p>
            </div>
            <div className="flex gap-5">
              <p>Domain: </p>
              <p className="font-bold">{domain}</p>
            </div>
          </div>

          <h3 className="mt-10 text-xl">Payment is easy, just like 1, 2, 3.</h3>
          <section className="mt-5">
            <div className="flex gap-2">
              <div className="bg-black p-1 w-5 h-5 text-white rounded-full text-xs flex justify-center items-center">
                1
              </div>
              <h3>Choose Payment Method</h3>
            </div>
            <div className="flex gap-5 mt-2 ml-10">
              <span
                className={`bg-[#FFCC00] p-2 w-[150px] flex justify-around items-center gap-2 cursor-pointer ${
                  paymentMethod === "1" && "outline outline-black"
                }`}
                onClick={() => setPaymentMethod("1")}
              >
                <CKMtn />
                <span className="font-bold">
                  <p>MTN</p>
                  <p>MoMo</p>
                </span>
              </span>
              <span
                className={`bg-[#FF0000] p-2 text-white w-[150px] flex justify-around cursor-pointer ${
                  paymentMethod === "2" && "outline outline-black"
                }`}
                onClick={() => setPaymentMethod("2")}
              >
                <CKAirtel />
                <span className="font-medium">
                  <p>Airtel</p>
                  <p>Money</p>
                </span>
              </span>
            </div>
          </section>

          <section className="mt-2">
            <div className="flex gap-2">
              <div className="bg-black p-1 w-5 h-5 text-white rounded-full text-xs flex justify-center items-center">
                2
              </div>
              <h3>Get Secret Code</h3>
            </div>

            <div className="ml-10">
              {paymentMethod === "1" && (
                <>
                  <p>MTN MoMo</p>
                  <p>
                    Enter your mtn phone number to receive a{" "}
                    <span className="font-bold">*secret code*</span> then press
                    next to continue
                  </p>
                  <div className="flex flex-col my-2">
                    <label htmlFor="number">MTN phone Number</label>
                    <input
                      type="text"
                      name=""
                      id="number"
                      className="outline outline-1 px-2 py-1 bg-transparent"
                      placeholder="Enter phone Number"
                    />
                  </div>
                </>
              )}
              {paymentMethod === "2" && (
                <>
                  <p>Airtel Money</p>
                  <p>
                    You will be required to inital the withdraw from you airtel
                    money to get a{" "}
                    <span className="font-bold">*secret code*</span> then press
                    next to continue
                  </p>
                </>
              )}
              {paymentMethod != null && (
                <div className="flex justify-end">
                  <button className="text-white bg-[#121212] px-2 py-1"
                  onClick={() => setComplete(true)}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </section>

          <section className="mt-2">
            <div className="flex gap-2">
              <div className="bg-black p-1 w-5 h-5 text-white rounded-full text-xs flex justify-center items-center">
                3
              </div>
              <h3>Complete Payment</h3>
            </div>

            {paymentMethod != null && complete != null &&
            <div className="ml-10">
              <div className="flex flex-col my-2">
                <label htmlFor="number">Amount</label>
                <input
                  type="text"
                  name=""
                  id="number"
                  className="outline outline-1 px-2 py-1 bg-transparent"
                  value={go}
                />
              </div>
              <div className="flex flex-col my-2">
                <label htmlFor="number">Phone Number</label>
                <input
                  type="text"
                  name=""
                  id="number"
                  className="outline outline-1 px-2 py-1 bg-transparent"
                  placeholder="Enter phone Number"
                />
              </div>
              <div className="flex flex-col my-2">
                <label htmlFor="number">Secret Code</label>
                <input
                  type="text"
                  name=""
                  id="number"
                  className="outline outline-1 px-2 py-1 bg-transparent"
                  placeholder="Enter secret code"
                />
              </div>
              <div className="flex flex-col my-2">
                <label htmlFor="number">Reason</label>
                <input
                  type="text"
                  name=""
                  id="number"
                  className="outline outline-1 px-2 py-1 bg-transparent"
                  placeholder="Enter reason"
                />
              </div>
              <div className="flex justify-end">
                <button className="bg-[#121212] text-white p-1 px-2 mt-5">
                            Make Payment
                          </button>
              </div>
            </div>
            }
          </section>

        </section>
      </main>
    </div>
  );
}

export default go;
