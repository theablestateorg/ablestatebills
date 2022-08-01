import Head from "next/head"
import Navbar from "../../components/nav"
import { useRouter } from 'next/router'
import { supabase } from "../../utils/supabase"
import { useEffect, useState } from "react"
import { MdDeleteOutline } from 'react-icons/md'
import { IoWarning } from 'react-icons/io5'
import { toast, ToastContainer } from 'react-toastify'
import Router from 'next/router'
import { Formik, Form } from "formik";
import { AiFillCloseCircle } from 'react-icons/ai'

export default function Site() {
  const router = useRouter()
  const { id } = router.query
  const [site, setSite] = useState("")
  const [popUp, setPopUp] = useState(false)
  const [popUpdate, setPopUpdate] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getSite()
  }, [site])

  const getSite = async () => {
    const { data } = await supabase.from('websites').select('*').eq('id', id).single()

    setSite(data)
  }

  console.log(site)

  const handleDelete = async () => {
    
    const { data, error } = await supabase
      .from('websites')
      .delete()
      .match({ id: id })


    setPopUp(false)

    Router.push("/")

    if(data){
      toast.success(`Successfully deleted`, {position: "top-center"})
    }
    if(error){
      toast.error(`${error?.message}`, {position: "top-center"})
    }
  }

  const handleExtension = async () => {
    if(document.getElementById("extension").value !== ""){
      console.log(new Date(document.getElementById("extension").value))

      const { data, error } = await supabase
        .from('websites')
        .update({ last_paid: new Date(document.getElementById("extension").value) })
        .match({ id: id })


        if(data){
          toast.success(`Successfully extended`, {position: "top-center"})
        }
        if(error){
          toast.error(`${error?.message}`, {position: "top-center"})
        }
    }
    
  }

  const handleUpdate = async (event, values) => {
    event.preventDefault()
    setLoading(true)

    const { data, error } = await supabase
        .from('websites')
        .update(values)
        .match({ id: id })


    if(data){
      toast.success(`Successfully updated`, {position: "top-center"})
    }
    if(error){
      toast.error(`${error?.message}`, {position: "top-center"})
    }

    setLoading(false)

    setPopUpdate(false)
  }

  return (
    <div>
      <Head>
        <title>Shine Africa</title>
      </Head>
      <Navbar />

      <ToastContainer />

      <main className='mt-[70px] mx-5 md:mx-20'>
        {site && <>
          <section className="flex justify-between items-center">
            <h1 className="font-bold text-2xl my-5">{site.name}</h1>
            <button className="bg-[#1D1F20] text-white py-2 px-4 my-2 mt-4 hover:bg-[#292C2D] flex items-center gap-2"
        onClick={() => setPopUpdate(true)}
        >
          Update
        </button>
          </section>
          {popUpdate &&
            <div className={`bg-black z-20 bg-opacity-40 w-screen min-h-screen fixed top-0 left-0 right-0 flex justify-center`}>
            <div className="relative bg-white dark:bg-dark-bg max-h-screen overflow-auto dark:text-secondary-text p-10 w-10/12 md:8/12  rounded-md m-5 sm:mb-5 shadow-md top-50 z-20" >
              <div className="flex items-center justify-between">
                <h1 className="text-center font-bold text-lg my-5">Update Website</h1>
                <AiFillCloseCircle size={25} className="cursor-pointer"
                onClick={() => setPopUpdate(false)}
                 />
              </div>

              <Formik
          initialValues={{ name: site.name, website_link: site.website_link, contact_person: site.contact_person, telephone_number: site.telephone_number  }}
          
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
              <Form className="my-5" 
                onSubmit={(event) => handleUpdate(event, values)}>
                  <div className="flex flex-col gap-1 my-2">
                    <label htmlFor="name" className="">Site Name</label>
                    <input type="text" name="name" placeholder="name" className="py-2 px-2 bg-transparent  outline outline-1 outline-[#c1c7d6] rounded w-full" 
                      onChange={handleChange("name")}
                      onBlur={handleBlur("name")}
                      defaultValue={site.name}
                    />
                  </div>
                  <div className="flex flex-col gap-1 my-2">
                    <label htmlFor="contact_person">Contact Person</label>
                    <input type="text" name="contact_person" placeholder="person's name" className="py-2 px-2 bg-transparent  outline outline-1 outline-[#c1c7d6] rounded w-full"
                      onChange={handleChange("contact_person")}
                      onBlur={handleBlur("contact_person")}
                      defaultValue={site.contact_person}
                    />
                  </div>
                  <div className="flex flex-col gap-1 my-2">
                    <label htmlFor="telephone_number">Telephone</label>
                    <input type="tel" name="telephone_number" placeholder="telephone number" className="py-2 px-2 bg-transparent  outline outline-1 outline-[#c1c7d6] rounded w-full"
                    onChange={handleChange("telephone_number")}
                    onBlur={handleBlur("telephone_number")} 
                    defaultValue={"0" + site.telephone_number}
                    />
                  </div>

                  <div className="flex flex-col gap-1 my-2">
                    <label htmlFor="website_link">Website</label>
                    <input type="text" name="website_link" placeholder="website" className="py-2 px-2 bg-transparent  outline outline-1 outline-[#c1c7d6] rounded w-full"
                    onChange={handleChange("website_link")}
                    onBlur={handleBlur("website_link")} 
                    defaultValue={site.website_link}/>
                  </div>

                  <div className="flex justify-end mt-5">
              <button type="submit" className="outline outline-1 outline-[#1D1F20] bg-[#1D1F20] text-white py-2 px-4 hover:bg-[#1D1F20] hover:text-white flex items-center gap-2"
              >
                {loading && <svg className="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                    </path>
                </svg>}
                  {loading ? "Loading" : "Update"}
              </button>
                
              </div>
                </Form>
            )}}
          </Formik>

              
              </div>
            </div>
          }
          <p>{site.contact_person}, {`+256` + site.telephone_number}</p>
          <section className="my-5">
            <h1>Extension</h1>
            <div className="flex gap-5 items-center my-1">
              <input type="date" id="extension" className="py-2 px-2 bg-transparent  outline outline-2 outline-[#c1c7d6] rounded w-8/12 md:w-8/12" />
              <button className="bg-[#1D1F20] text-white py-2 px-4 hover:bg-[#292C2D] flex items-center gap-2"
                onClick={handleExtension}
              >Extend</button>
            </div>
          </section>
        

        <div className="flex gap-5 items-center my-1">
          <button className="outline outline-1 outline-[#1D1F20] text-[#1D1F20] py-2 px-4 hover:bg-[#1D1F20] hover:text-white flex items-center gap-2"
          onClick={() => setPopUp(true)}
          >
            <MdDeleteOutline size={20} /> Delete Website</button>
        </div>
        </>}


        {popUp &&
        <div className={`bg-black z-20 bg-opacity-40 w-screen min-h-screen fixed top-0 left-0 right-0 flex justify-center items-center`}>
        <div className="relative bg-white dark:bg-dark-bg max-h-screen overflow-auto dark:text-secondary-text p-10  rounded-md m-2 sm:mb-5 shadow-md top-50 z-20" >
          <h1 className="text-center font-bold text-lg my-5">Delete Website</h1>
          <p>Are you sure you want to delete <b>{site.name}</b>?</p>
          <p className="bg-[#ffe9d9] p-2 border-l-2 text-[#bc4c2e] border-[#fa703f] flex flex-col text-sm my-1">
            <span className="text-[#771505] font-bold flex items-center gap-1"><IoWarning /> Warning</span>
            By deleting this website, you won't be able to access it or it's info
          </p>
          <div className="flex justify-between mt-5">
          <button className="outline outline-1 outline-[#1D1F20] bg-[#1D1F20] text-white py-2 px-4 hover:bg-[#1D1F20] hover:text-white flex items-center gap-2"
          onClick={() => setPopUp(false)}
          >
            No, Cancel</button>
          <button className="outline outline-1 outline-[#1D1F20] text-[#1D1F20] py-2 px-4 hover:bg-[#1D1F20] hover:text-white flex items-center gap-2"
          onClick={handleDelete}
          >
            Yes, Delete</button>
            
          </div>
          </div>
        </div>
        }
      </main>
      
    </div>
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
    props: {
    }
  }
}