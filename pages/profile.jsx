import Head from "next/head"
import Navbar from "../components/nav"
import { supabase } from "../utils/supabase"
import { Form, Formik } from "formik"
import { ToastContainer, toast } from "react-toastify"
import { useState } from "react"
import { MdEdit } from 'react-icons/md'

export default function Dashboard({ user }) {
  const [ loading, setLoading ] = useState(false)

  const handleSubmit = async(event, values) => {
    event.preventDefault()
  }

  return (
    <>
    <Head>
      <title>Profile</title>
    </Head>
    <Navbar />
    <ToastContainer />
    <main className='pt-[70px] mx-5 md:mx-20 relative pb-6 min-h-screen'>
      <section className="flex justify-between items-center">
          <h1 className="font-bold text-2xl my-5">Profile</h1>
        </section>
      <section className="mb-5">
      <div className="flex items-center gap-10 my-2">
        <p className="text-lg w-4/12 md:w-2/12">Name</p>
        <h3 className="text-lg py-2 px-2 font-bold rounded w-8/12 md:w-8/12">{user.user_metadata.first_name} {user.user_metadata.last_name}</h3>
      </div>
      <div className="flex items-center gap-10 my-2">
        <p className="text-lg w-4/12 md:w-2/12">Email</p>
        <h3 className="text-lg py-2 px-2 font-bold rounded w-8/12 md:w-8/12">{user.email}</h3>
      </div>
      <div className="flex items-center gap-10 my-2">
        <p className="text-lg w-4/12 md:w-2/12">Password</p>
        <h3 className="text-lg py-2 px-2 font-bold rounded w-8/12 md:w-8/12">****************</h3>
      </div>
      </section>
      <hr />
      <section className="my-5">
        <h1>Edit Profile</h1>

        <Formik
          initialValues={{ first_name: "", last_name: "", email: ""  }}
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
                onSubmit={(event) => handleSubmit(event, values)}
                className="my-5"
                name="signUpForm"
              >
                <div className="flex gap-5 items-end  my-2">
                  <label htmlFor="" className="w-4/12 md:w-2/12">Email</label>
                  <div className="w-full">
                    <input
                      type="email"
                      name="email"
                      className="outline outline-1 py-1 px-2 bg-transparent placeholder:text-[#bcbfc2] w-8/12 md:w-10/12"
                      placeholder="enter email"
                      defaultValue={user.email}
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

                <div className="flex gap-5 items-end  my-2">
                  <label htmlFor="" className="w-4/12 md:w-2/12">First Name</label>
                  <div className="w-full">
                    <input
                      type="text"
                      name="first_name"
                      className="outline outline-1 py-1 bg-transparent px-2 placeholder:text-[#bcbfc2] w-8/12 md:w-10/12"
                      placeholder="enter first name"
                      defaultValue={user.user_metadata.first_name}
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
                <div className="flex gap-5 items-end  my-2">
                  <label htmlFor="" className="w-4/12 md:w-2/12">Last Name</label>
                  <div className="w-full">
                    <input
                      type="text"
                      name="last_name"
                      className="outline outline-1 bg-transparent py-1 px-2 placeholder:text-[#bcbfc2] w-8/12 md:w-10/12"
                      placeholder="enter last name"
                      defaultValue={user.user_metadata.last_name}
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

                <div className="flex gap-5 items-end my-2">
                  <label htmlFor="" className="w-4/12 md:w-2/12">New Password</label>
                  <div className="w-full">
                    <input
                      type="password"
                      name="password"
                      className="outline outline-1 bg-transparent py-1 px-2 placeholder:text-[#bcbfc2] w-8/12 md:w-10/12"
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

                <div className="flex gap-5 items-end my-2">
                  <label htmlFor="" className="w-4/12 md:w-2/12">Confirm Password</label>
                  <div className="w-full">
                    <input
                      type="password"
                      name="password"
                      className="outline outline-1 bg-transparent py-1 px-2 placeholder:text-[#bcbfc2] w-8/12 md:w-10/12"
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

                <button type="submit" disabled={!(isValid && dirty)} className="bg-[#1D1F20] text-white py-2 px-4 my-2 mt-4 hover:bg-transparent hover:text-black outline outline-1 outline-black flex items-center gap-2">
                {loading && <svg className="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                    </path>
                </svg>}
                  {loading ? "Loading" : "Submit"}
                </button>

              </Form>
            )}}
        </Formik>
      </section>
      <footer className="text-center text-gray-500 absolute bottom-1 h-6 w-full">
          <p>
            Copyright &#169; {new Date().getFullYear()} A service of gagawala
            limited
          </p>
        </footer>
    </main>
    </>
  )
}


export const getServerSideProps = async ({ req }) => {

  const { user } = await supabase.auth.api.getUserByCookie(req)

  if(!user){
    return {
      redirect: {
        permanent: false,
        destination: "/login"
      },
      props: {},
    }
  }

  return {
    props: {user}
  }
}