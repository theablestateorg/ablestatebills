import Head from "next/head";
import { supabase } from "../utils/supabase";
import { validationSchema } from "../utils/validation";
import { Formik, Form } from "formik";
import { toast, ToastContainer } from 'react-toastify'
import Router from 'next/router'
import { useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";

export default function Home() {
  const [ loading, setLoading ] = useState(false)

  const handleSubmit = async (event, {email, password}, resetForm) => {
    event.preventDefault();
    setLoading(true)
    console.log("been here")
    try{
      const {user,session, error} = await supabase.auth.signIn({ email: email, password })
      if(user){
        setLoading(false)
        Router.push('/')
      }
      if(error){
        setLoading(false)
        toast.error(`${error?.message}`, {position: "top-center"})
      }
    }catch(error){
      setLoading(false)
      console.log(error)
    }

    document.loginForm.reset()
    resetForm({ email: "", password: "" })

  };

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="./static/shine.png" />
        <title>Shine Afrika</title>
      </Head>
      <ToastContainer />
      <div className="w-screen h-screen flex justify-center items-center">
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
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
                name="loginForm"
              >
                <h1 className="text-3xl font-bold text-center">Login</h1>
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
                  {loading ? "Loading" : "Login"}
                </button>
                <p className="cursor-point">Don&apos;t have an account? <Link href="/register" className="underline">Sign Up</Link></p>
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
}

export const getServerSideProps = async ({ req }) => {

  const { user } = await supabase.auth.api.getUserByCookie(req)

  if(user){
    return {
      redirect: {
        permanent: false,
        destination: "/"
      },
      props: {},
    }
  }

  return {
    props: {}
  }
}
