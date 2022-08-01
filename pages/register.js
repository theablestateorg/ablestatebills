import Head from "next/head";
import { supabase } from "../utils/supabase";
import { registerValidationSchema } from "../utils/validation";
import { Formik, Form } from "formik";
import { toast, ToastContainer } from 'react-toastify'
import { useState } from "react";
import Router from "next/router";
import Link from "next/link";

export default function Home() {

  const [ loading, setLoading ] = useState(false)

  const handleSubmit = async (event, {email, password, first_name, last_name, role}, resetForm) => {
    event.preventDefault();
    try{
      setLoading(true)
      const {user, session, error} = await supabase.auth.signUp({ email, password },
        {
          data: { 
            first_name, 
            last_name,
          }
        }
        )
      if(user){
        // const { data, error } = await supabase
        // .from('profiles')
        // .update({ 
        //   first_name, last_name, role 
        // })
        // .match({ id: user.id })
        // console.log(data)
        Router.push('/')
      }
      if(error){
        toast.error(`${error?.message}`, {position: "top-center"})
      }else if (!user){
        toast.success(`A confirmation mail has been sent`, {position: "top-center"})
      }
    }catch(error){console.log(error)}

    // document.loginForm.reset()
    setLoading(false)
    resetForm({ password: "", first_name: "", last_name: "", role: "", email: ""  })
  };

  return (
    <>
      <Head>
        {/* <link rel="shortcut icon" href="./static/shine.png" /> */}
        <title>Shine Afrika</title>
      </Head>
      <ToastContainer />
      <div className="w-screen h-screen flex justify-center items-center">
        <Formik
          initialValues={{ password: "", first_name: "", last_name: "", role: "", email: ""  }}
          validationSchema={registerValidationSchema}
        >
          {({
            values,
            errors,
            touched,
            isValid,
            dirty,
            handleChange,
            handleBlur,
            resetForm
          }) => {
            return (
              <Form
                onSubmit={(event) => handleSubmit(event, values, resetForm)}
                className="bg-white p-10"
                name="signUpForm"
              >
                <h1 className="text-3xl font-bold text-center">Register</h1>
                <div className="flex flex-col gap-2  my-2">
                  <label htmlFor="">Email</label>
                  <div className="w-full">
                    <input
                      type="email"
                      name="email"
                      className="outline outline-1 py-1 px-2 placeholder:text-[#bcbfc2]"
                      placeholder="enter email"
                      onChange={handleChange("email")}
                      onBlur={handleBlur("email")}
                    />
                    <div
                      className={`${
                        errors?.email && touched?.email
                          ? "block"
                          : "hidden"
                      }`}
                    >
                      <label
                        className={`${
                          errors?.email && touched?.email
                            ? "text-red-500 text-xs"
                            : "text-transparent text-xs"
                        }`}
                      >{`${
                        errors?.email && touched?.email
                          ? errors.email
                          : "hide"
                      }`}</label>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2  my-2">
                  <label htmlFor="">First Name</label>
                  <div className="w-full">
                    <input
                      type="text"
                      name="first_name"
                      className="outline outline-1 py-1 px-2 placeholder:text-[#bcbfc2]"
                      placeholder="enter first name"
                      onChange={handleChange("first_name")}
                      onBlur={handleBlur("first_name")}
                    />
                    <div
                      className={`${
                        errors?.first_name && touched?.first_name
                          ? "block"
                          : "hidden"
                      }`}
                    >
                      <label
                        className={`${
                          errors?.first_name && touched?.first_name
                            ? "text-red-500 text-xs"
                            : "text-transparent text-xs"
                        }`}
                      >{`${
                        errors?.first_name && touched?.first_name
                          ? errors.first_name
                          : "hide"
                      }`}</label>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2  my-2">
                  <label htmlFor="">Last Name</label>
                  <div className="w-full">
                    <input
                      type="text"
                      name="last_name"
                      className="outline outline-1 py-1 px-2 placeholder:text-[#bcbfc2]"
                      placeholder="enter last name"
                      onChange={handleChange("last_name")}
                      onBlur={handleBlur("last_name")}
                    />
                    <div
                      className={`${
                        errors?.last_name && touched?.last_name
                          ? "block"
                          : "hidden"
                      }`}
                    >
                      <label
                        className={`${
                          errors?.last_name && touched?.last_name
                            ? "text-red-500 text-xs"
                            : "text-transparent text-xs"
                        }`}
                      >{`${
                        errors?.last_name && touched?.last_name
                          ? errors.last_name
                          : "hide"
                      }`}</label>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2  my-2">
                  <label htmlFor="">Password</label>
                  <div className="w-full">
                    <input
                      type="password"
                      name="password"
                      className="outline outline-1 py-1 px-2 placeholder:text-[#bcbfc2]"
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
                <button type="submit" disabled={!(isValid && dirty)} className="bg-[#1D1F20] text-white py-1 px-3 my-2 mt-4 hover:bg-[#292C2D] flex items-center cursor-pointer">
                {loading && <svg className="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                    </path>
                </svg>}
                  {loading ? "Loading" : "Register"}
                </button>
                <p className="cursor-point">Already have an account? <Link href="/login" className="underline">Login</Link></p>
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
}