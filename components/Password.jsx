import { Form, Formik } from "formik";
import { MdEdit, MdOutlineMail } from "react-icons/md";
import { supabase } from "../utils/supabase";
import { useState } from "react";

function Password({ user }) {
  const [loading, setLoading] = useState(false);
  return (
    <section className="my-5 flex-grow flex flex-col">
      <h1 className="font-bold">Password</h1>
      <Formik
              initialValues={{ first_name: "", last_name: "", email: "" }}
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
                    onSubmit={(event) => handleSubmit(event, values)}
                    className="my-5 flex-grow py-5 md:px-10"
                    name="signUpForm"
                  >

                    <div className="flex flex-col gap-5 md:my-5">
                      <label htmlFor="" className="">
                        New Password
                      </label>
                      <div className="w-full">
                        <input
                          type="password"
                          name="password"
                          className="outline outline-1 bg-transparent py-1 px-2 placeholder:text-[#bcbfc2] w-full md:w-10/12"
                          placeholder="enter password"
                          defaultValue="**********"
                          onChange={handleChange("password")}
                          onBlur={handleBlur("password")}
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
                    <div className="flex flex-col gap-5 my-5">
                      <label htmlFor="" className="">
                        Confirm Password
                      </label>
                      <div className="w-full">
                        <input
                          type="password"
                          name="password"
                          className="outline outline-1 bg-transparent py-1 px-2 placeholder:text-[#bcbfc2] w-full md:w-10/12"
                          placeholder="enter password"
                          onChange={handleChange("password")}
                          onBlur={handleBlur("password")}
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
                      {loading ? "Loading" : "Change Password"}
                    </button>
                  </Form>
                );
              }}
            </Formik>
    </section>
  )
}

export default Password