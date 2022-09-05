import Head from "next/head";
import Navbar from "../components/nav";
import { supabase } from "../utils/supabase";
import { addSiteValidationSchema } from "../utils/validation";
import { Formik, Form } from "formik";
import { toast, ToastContainer } from 'react-toastify'
import { useState } from "react";
import { useAuth } from "../utils/auth";

export default function AddSite() {
  const [loading, setLoading] = useState(false)
  const { user } = useAuth();

  const handleSubmit = async (values, resetForm) => {
    // event.preventDefault()
    setLoading(true)
    try{
      const { data, error } = await supabase
      .from('websites')
      .insert([
        values
      ])

      if(data){
        toast.success(`${values.name} was added successfully`, {position: "top-center"})

        await supabase
        .from("logs")
        .insert([
          {
            name: `[Added] ${values.name}`,
            details: `added by ${user.first_name} ${user.last_name}`,
            status: "success",
          },
        ]);

        resetForm({ name: "", website_link: "", contact_person: "", telephone_number: "", email: "", last_paid: "", expiry_date: "", status: "active"})
      }
      if(error){
        toast.error(`${error?.message}`, {position: "top-center"})

        await supabase
        .from("logs")
        .insert([
          {
            name: `[Added] ${values.name}`,
            details: `attempt by ${user.first_name} ${user.last_name}`,
            status: "failed",
          },
        ]);
      }
    } catch(error){toast.error(`${error?.message}`, {position: "top-center"})}
    setLoading(false)
  }
  return (
    <>
      <Head>
        <title>Add Site</title>
      </Head>
      <Navbar />
      <ToastContainer />
      <main className='pt-[70px] mx-5 md:mx-20 relative pb-6 min-h-screen'>
        <section className="flex justify-between items-center">
          <h1 className="font-bold text-2xl my-5">Add Site</h1>
        </section>

        <Formik
          initialValues={{ name: "", website_link: "", contact_person: "", telephone_number: "", email: "", last_paid: "", expiry_date: "", status: "active"  }}
          onSubmit={(values, { resetForm }) => {
              handleSubmit(values, resetForm)
          }}
          
        >
          {({
            values,
            errors,
            touched,
            isValid,
            dirty,
            handleChange,
            handleBlur,
            
          }) => {
            // setExpiredDate(values.last_paid)
            // console.log(values)
            return (
              <Form className="my-5" >
              <div className="flex items-center gap-10 my-5">
            <label htmlFor="website_link" className="text-xl w-4/12 md:w-2/12">Website</label>
            <input type="text" name="website_link" placeholder="Website" className=" py-2 px-2 bg-transparent  outline outline-1 outline-[#121212] rounded w-8/12 md:w-8/12"
            onChange={handleChange("website_link")}
            onBlur={handleBlur("website_link")}
            value={values.website_link} />
          </div>
          <div className="flex items-center gap-10 my-2">
            <label htmlFor="name" className="text-xl w-4/12 md:w-2/12">Add Site Name</label>
            <input type="text" name="name" placeholder="Name" className=" py-2 px-2 bg-transparent  outline outline-1 outline-[#121212] rounded w-8/12 md:w-8/12" 
              onChange={handleChange("name")}
              onBlur={handleBlur("name")}
              value={values.name}
            />
          </div>
          <div className="flex items-center gap-10 my-5">
            <label htmlFor="contact_person" className="text-xl w-4/12 md:w-2/12">Contact Person</label>
            <input type="text" name="contact_person" placeholder="Person's name" className=" py-2 px-2 bg-transparent  outline outline-1 outline-[#121212] rounded w-8/12 md:w-8/12"
              onChange={handleChange("contact_person")}
              onBlur={handleBlur("contact_person")}
              value={values.contact_person}
            />
          </div>
          <div className="flex items-center gap-10 my-5">
            <label htmlFor="telephone_number" className="text-xl w-4/12 md:w-2/12">Telephone</label>
            <input type="tel" name="telephone_number" placeholder="Telephone number" className=" py-2 px-2 bg-transparent  outline outline-1 outline-[#121212] rounded w-8/12 md:w-8/12"
            onChange={handleChange("telephone_number")}
            onBlur={handleBlur("telephone_number")} 
            value={values.telephone_number}/>
          </div>
          <div className="flex items-center gap-10 my-5">
            <label htmlFor="telephone_number" className="text-xl w-4/12 md:w-2/12">Email</label>
            <input type="email" name="email" placeholder="Email" className=" py-2 px-2 bg-transparent  outline outline-1 outline-[#121212] rounded w-8/12 md:w-8/12"
            onChange={handleChange("email")}
            onBlur={handleBlur("email")} 
            value={values.email}/>
          </div>
          <div className="flex items-center gap-10 my-5">
            <label htmlFor="last_paid" className="text-xl w-4/12 md:w-2/12">Upload Date</label>
            <input type="date" name="date" className=" py-2 px-2 bg-transparent  outline outline-1 outline-[#121212] rounded w-8/12 md:w-8/12"
            onChange={handleChange("last_paid")}
            onBlur={handleBlur("last_paid")} 
            value={values.last_paid} />
          </div>
          <div className="flex items-center gap-10 my-5">
            <label htmlFor="expiry_date" className="text-xl w-4/12 md:w-2/12">Expiry Date</label>
            <input type="date" name="date" className=" py-2 px-2 bg-transparent  outline outline-1 outline-[#121212] rounded w-8/12 md:w-8/12"
            onChange={handleChange("expiry_date")}
            onBlur={handleBlur("expiry_date")} 
            value={values.expiry_date} />
          </div>
          <div className="flex justify-end mt-10">
            <button className="bg-[#1D1F20] text-white py-2 px-4 my-2 mt-4 hover:bg-transparent hover:text-black outline outline-1 outline-black flex items-center gap-2">
            {loading && <svg className="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                    </path>
                </svg>}
                  {loading ? "Loading" : "Submit"}
            </button>
          </div>
        </Form>
            )}}
          </Formik>
          <footer className="text-center text-gray-500 absolute bottom-1 h-6 w-full">
          <p>
            Copyright &#169; {new Date().getFullYear()} A service of gagawala
            limited
          </p>
        </footer>
        
      </main>
    </>
  );
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
    props: {}
  }
}