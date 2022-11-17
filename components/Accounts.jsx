import { Form, Formik } from "formik";
import { supabase } from "../utils/supabase";
import { useState } from "react";
import Link from "next/link";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { currencyFormatter } from "../utils/currencyFormatter";
import Router from "next/router";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import { CKAirtel, CKMtn } from "./ck";
import { UG } from "./react-flags/index";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";

function Accounts({ account_balance, transactions }) {
  const [loading, setLoading] = useState(false);
  const [cookie] = useCookies(["user"]);

  console.log(transactions)

  const [paymentMethod, setPaymentMethod] = useState(null);
  const [complete, setComplete] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = async (event, values, resetForm) => {
    event.preventDefault();
    setLoading(true);
    const { amount } = values;

    const { data, error } = await supabase
      .from("accounts")
      .update({ account_balance: +amount + +account_balance.account_balance })
      .eq("id", cookie.user?.user?.id);

    if (data) {
      const { data: transaction, error } = await supabase
        .from("transactions")
        .insert([
          {
            transaction_type: "deposit",
            status: "successful",
            amount: amount,
            actor_id: cookie.user?.user?.id,
            description: "",
          },
        ]);

      if (transaction) {
        toast.success(`Deposit was successful`, { position: "top-center" });
      }
    } else if (error) {
      toast.error(`Failed: ${error.message}`, { position: "top-center" });
    }

    resetForm({ amount: "" });
    setLoading(false);
    Router.push("/account");
  };

  return (
    <section className="my-5 flex-grow flex flex-col md:px-8">
      <h1 className="font-bold text-lg border-b-2 p-2">Account</h1>
      <div className="px-1 rounded-sm">
        <div className="my-5 py-5">
          <div className="w-54 bg-white p-5 rounded shadow outline outline-1 outline-gray-200">
            {/* <h1>My Balance</h1> */}
            <div className="w-full flex justify-between gap-3 flex-col lg:flex-row">
              <div className="bg-[#f7f7f7] p-3 rounded-md flex gap-5 justify-start outline outline-1 outline-gray-200 w-full items-center">
                <MdOutlineAccountBalanceWallet size={35} color="#1d1f20" />
                <div>
                  <div className="mb-5">
                    <h2 className="text-zinc-600 text-sm">Available Balance</h2>
                    <p className="font-bold text-xl">
                      <span className="mr-1 font-medium">ugx</span>
                      <span className="text-3xl">
                        {currencyFormatter(account_balance?.account_balance)}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-[#f7f7f7] p-3 rounded-md flex gap-5 justify-start outline outline-1 outline-gray-200 items-center w-full">
                <GrTransaction size={35} color="#1d1f20" />
                <div>
                  <div className="mb-5">
                    <h2 className="text-zinc-600 text-sm">Last Transaction</h2>
                    <div className="flex justify-between w-full gap-5">
                      <p className="font-bold text-xl">
                        <span className="mr-1 font-medium">ugx</span>
                        <span className="text-3xl">
                          {transactions && transactions.length > 0
                            ? currencyFormatter(transactions[0].amount)
                            : "0"}
                        </span>
                      </p>
                      {transactions && transactions.length > 0 ? (
                        <p className="font-bold text-xl">
                          {transactions[0].transaction_type === "deposit" ? (
                            <span className="mr-1 font-medium bg-green-300 text-sm px-2 py-1 rounded flex items-center">
                              <AiOutlineArrowUp />
                              {Math.round(
                                (transactions[0].amount /
                                  account_balance.account_balance) *
                                  10000
                              ) /
                                100 +
                                "%"}
                            </span>
                          ) : (
                            <span className="mr-1 font-medium bg-red-300 text-sm px-2 py-1 rounded flex items-center">
                              <AiOutlineArrowDown />
                              {Math.round(
                                (transactions[0].amount /
                                  account_balance.account_balance) *
                                  10000
                              ) /
                                100 +
                                "%"}
                            </span>
                          )}
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <Link href="/transactions">
                    <span className="underline cursor-pointer text-[#ca3011]">
                      view transactions
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h3 className="font-bold text-lg mb-2">Make Deposit</h3>
        <div className="outline outline-1 outline-gray-200 rounded-sm p-3 ">
          <section className="">
            <h3 className="font-bold">Choose a Payment Method</h3>
            <div className="flex flex-wrap gap-5 my-2">
              <span
                className={`bg-[#FFCC00] p-2 w-[150px] flex justify-around items-center gap-2 cursor-pointer ${
                  paymentMethod === "1" && "outline outline-1 outline-black"
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
                  paymentMethod === "2" && "outline outline-1 outline-black"
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
            <h3 className="font-bold">Get Secret Code</h3>
            <div className="">
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
                    <div className="outline outline-1 flex pl-2 gap-2">
                      <div className="flex gap-1 items-center">
                        <UG />
                        +256
                      </div>
                      <input
                        type="text"
                        name=""
                        id="number"
                        className="outline outline-1 px-2 py-1 bg-transparent flex-grow"
                        placeholder="771234567"
                        onChange={({ target }) => setPhoneNumber(target.value)}
                        value={phoneNumber}
                        required
                      />
                    </div>
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
                  <button
                    className="text-white bg-[#121212] px-2 py-1"
                    onClick={async () => {
                      if (paymentMethod === "1") {
                        const phoneno =
                          /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/;
                        if (phoneNumber.match(phoneno)) {
                          const results = await axios
                            .post("/api/send-token", {
                              phone: `256${phoneNumber}`,
                            })
                            .then((res) => setComplete(true))
                            .catch((error) => {});
                          setComplete(true);
                        }
                      } else {
                        setComplete(true);
                      }
                    }}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </section>
          <Formik initialValues={{ amount: "" }}>
            {({
              values,
              errors,
              touched,
              isValid,
              dirty,
              handleChange,
              handleBlur,
              resetForm,
            }) => {
              return (
                <Form
                  onSubmit={(event) => handleSubmit(event, values, resetForm)}
                  className="flex-grow py-5"
                  name="signUpForm"
                >
                  <div className="flex flex-col gap-5 my-5">
                    <label htmlFor="amount" className="">
                      Enter Amount
                    </label>
                    <div className="w-full">
                      <input
                        type="text"
                        name="amount"
                        className="outline outline-1 bg-transparent py-1 px-2 placeholder:text-[#bcbfc2] w-full md:w-10/12"
                        placeholder="Enter amount"
                        onChange={handleChange("amount")}
                        onBlur={handleBlur("amount")}
                        value={values.amount}
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={!(isValid && dirty)}
                    className="bg-[#1D1F20] text-white py-2 px-4 my-2 mt-4 hover:bg-transparent hover:text-black outline outline-1 outline-black flex items-center gap-2"
                  >
                    {loading && (
                      <svg
                        className="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    )}
                    {loading ? "Loading" : "Deposit"}
                  </button>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </section>
  );
}

export default Accounts;
