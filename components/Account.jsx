import { Form, Formik } from "formik";
import { supabase } from "../utils/supabase";
import { useState } from "react";
import Link from "next/link";
import { FaMoneyBillWave } from "react-icons/fa";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";

function Account({ account_balance }) {
  const [loading, setLoading] = useState(false);
  const [cookie] = useCookies(["user"]);
  console.log(account_balance)

  const handleSubmit = async (event, values, resetForm) => {
    event.preventDefault();
    const { amount } = values;

    const { data, error } = await supabase
      .from("accounts")
      .update({ account_balance: amount })
      .eq("id", cookie.user?.user?.id);
    
    if(data){
      toast.success(`Deposit was successful`, { position: "top-center" });
    } else if(error){
      toast.error(`Failed: ${error.message}`, { position: "top-center" });
    }

    resetForm({ amount: "" });
  };

  return (
    <section className="my-5 flex-grow flex flex-col md:px-8">
      <h1 className="font-bold text-lg border-b-2 p-2">Account</h1>
      <div className="my-5 py-5">
        <div className="w-54 bg-white p-5 rounded shadow outline outline-1 outline-gray-200">
          {/* <h1>My Balance</h1> */}
          <div className="bg-[#f7f7f7] p-3 rounded-md flex gap-5 justify-start outline outline-1 outline-gray-200">
            <FaMoneyBillWave size={35} color="#1d1f20" />
            <div>
              <div className="mb-5">
                <h2 className="text-zinc-600 text-sm">Available Balance</h2>
                <p className="font-bold text-xl">
                  <span className="mr-1 font-medium">ugx</span>
                  <span className="text-3xl">{account_balance.account_balance}</span>
                </p>
              </div>
              <Link href="/profile">
                <span className="underline cursor-pointer text-[#ca3011]">
                  view transactions
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
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
              className=" flex-grow py-5"
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
    </section>
  );
}

export default Account;
