import { Form, Formik } from "formik";
import { MdEdit, MdOutlineMail } from "react-icons/md";
import { supabase } from "../utils/supabase";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import { FaMoneyBillWave } from 'react-icons/fa'

function Account({ user }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event, values, resetForm) => {
    event.preventDefault()
    const { new_password, confirm_password} = values
    if(new_password === confirm_password){
      const { user, error } = await supabase.auth.update({password: new_password})

      if(error){
        toast.error(`${error.message}`, {
          position: "top-center",
        });
      }else {
        toast.success(`Successfully changed password`, {
          position: "top-center",
        });
      }

      resetForm({ old_password: "", new_password: "", confirm_password: ""})
    } else {
      resetForm({ old_password: "", new_password: "", confirm_password: ""})
      toast.error(`Password is inconsistent`, {
        position: "top-center",
      });
    }
  }
  return (
    <section className="my-5 flex-grow flex flex-col">
      <h1 className="font-bold">Account</h1>
      <div className="my-5 py-5 md:px-10">
        <div className="w-54 bg-white p-5 rounded shadow-md">
          <h1>My Balance</h1>
          <div className="bg-[#f7f7f7] p-3 rounded-md flex gap-5 justify-start">
            <FaMoneyBillWave size={35} color="#1d1f20" />
              <div>
                <div className="mb-5">
                  <h2 className="text-zinc-600 text-sm">Available Balance</h2>
                  <p className="font-bold text-xl">
                    <span className="mr-1 font-medium">ugx</span>
                    <span className="text-3xl">0</span>
                  </p>
                </div>
                <Link href="/">
                  <span className="underline cursor-pointer text-[#ca3011]">
                  view transactions
                  </span>
                
                </Link>
              </div>
          </div>
        </div>
      </div>
      <Formik
              initialValues={{ amount: "" }}
            >
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
                    className=" flex-grow py-5 md:px-10"
                    name="signUpForm"
                  >
                    <div className="flex flex-col gap-5 my-5">
                      <label htmlFor="confirm_password" className="">
                        Enter Amount
                      </label>
                      <div className="w-full">
                        <input
                          type="password"
                          name="confirm_password"
                          className="outline outline-1 bg-transparent py-1 px-2 placeholder:text-[#bcbfc2] w-full md:w-10/12"
                          placeholder="Enter amount"
                          onChange={handleChange("confirm_password")}
                          onBlur={handleBlur("confirm_password")}
                        />
                        <div
                          className={`${
                            errors?.password && touched?.password
                              ? "block"
                              : "hidden"
                          }`}
                        >
                          <label
                            className={`${
                              errors?.password && touched?.password
                                ? "text-red-500 text-xs"
                                : "text-transparent text-xs"
                            }`}
                          >{`${
                            errors?.password && touched?.password
                              ? errors.password
                              : "hide"
                          }`}</label>
                        </div>
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
  )
}

export default Account