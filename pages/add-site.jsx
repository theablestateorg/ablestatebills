import Head from "next/head";
import { supabase } from "../utils/supabase";
import { addSiteValidationSchema } from "../utils/validation";
import { Formik, Form } from "formik";
import { toast, ToastContainer } from "react-toastify";
import { useState, useEffect } from "react";
import { useAuth } from "../utils/auth";
import { TbSend } from "react-icons/tb";
import { MdAdd } from "react-icons/md";
import AddCustomerModal from "../components/AddCustomerModal";
import useMediaQuery from "../hooks/useMediaQuery";
import axios from "axios";

export default function AddSite() {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const matches = useMediaQuery("(min-width: 800px)");
  const tablet = useMediaQuery("(max-width: 1000px)");

  const [customers, setCustomers] = useState([]);
  const [customerModel, setCustomerModel] = useState(false);
  const [customerId, setCustomerId] = useState(null);
  const [contact, setContact] = useState({});
  const [countryCode, setCountryCode] = useState("+256");
  const [selected, setSelected] = useState(false);
  const [ password, setPassword ] = useState(null)

  useEffect(() => {
    getCustomers();
    getContact(customerId);
  }, [selected]);

  const getCustomers = async () => {
    const { data } = await supabase.from("profiles").select("*");
    // .eq("role", "customer")
    setCustomers(data);
  };

  const getContact = async (id) => {
    const { data } = await supabase.from("profiles").select("*").eq("id", id);
    setContact(data);
  };

  const handleSubmit = async (values, resetForm) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("websites").insert([
        {
          ...values,
          added_by: user.first_name + " " + user.last_name,
          contact_id: customerId,
          telephone_number: countryCode + values.telephone_number,
        },
      ]);

      if (data) {
        toast.success(`${values.name} was added successfully`, {
          position: "top-center",
        });

        await supabase.from("logs").insert([
          {
            name: `[Added] ${values.name}`,
            details: `added by ${user.first_name} ${user.last_name}`,
            status: "success",
          },
        ]);

        resetForm({
          name: "",
          website_link: "",
          contact_person: "",
          telephone_number: "",
          email: "",
          last_paid: "",
          expiry_date: "",
          status: "active",
        });
      }
      if (error) {
        toast.error(`${error?.message}`, { position: "top-center" });

        await supabase.from("logs").insert([
          {
            name: `[Added] ${values.name}`,
            details: `attempt by ${user.first_name} ${user.last_name}`,
            status: "failed",
          },
        ]);
      }
    } catch (error) {}
    setLoading(false);
  };

  const [contactDetails, setContactDetails] = useState({email: "", contact_number: ""})
  const getContactPersonDetails = async (contact_id) => {
    const { data, error } = await supabase
                          .from("profiles")
                          .select("email, contact_number")
                          .eq('id', contact_id)
                          .single()

    if(data){
      setContactDetails(data)
    }

    console.log(data)
  }

  
  const addNewCustomer = async (values) => {
    if(password){
      setLoading(true);
      const { email, first_name, last_name, role, contact_number } = values;
      const data = await axios.post("/api/add-customer", {
        email: email,
        password: password,
        added_by: user.id,
        details: {
          first_name: first_name,
          last_name: last_name,
          email: email,
          contact_number: contact_number,
          role: role
        },
      }).then(res => {
        setLoading(false);
        setCustomerModel(false);
        setSelected(!selected)
      })
      .catch(error => {
        setLoading(false);
        toast.error(`${error?.message}`, { position: "top-center" });
      })
      // if (data) {}
      // if (error) {}
      setLoading(false);
    }else{
      setLoading(false);
      toast.error(`No password`, { position: "top-center" });
    }
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Add Product - Shine Afrika</title>
      </Head>
      <ToastContainer />
      <main className="pt-[70px] mx-5 md:mx-20 relative pb-6 min-h-screen">
        <section className="flex justify-between items-center">
          <h1 className="font-bold text-2xl my-5">Add Site</h1>
        </section>

        <Formik
          initialValues={{
            name: "",
            website_link: "",
            contact_person: "",
            telephone_number: "",
            email: "",
            last_paid: "",
            expiry_date: "",
            status: "active",
          }}
          validationSchema={addSiteValidationSchema}
          onSubmit={(values, { resetForm }) => {
            handleSubmit(values, resetForm);
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
            setFieldValue,
          }) => {
            return (
              <Form className="my-5">
                <div className="flex items-center gap-10 my-5">
                  <label
                    htmlFor="website_link"
                    className="text-xl w-4/12 md:w-2/12"
                  >
                    Website
                  </label>
                  <div className="w-8/12 md:w-8/12">
                    <input
                      type="text"
                      name="website_link"
                      placeholder="Website"
                      id="website_link"
                      className=" py-2 px-2 bg-transparent  outline outline-1 outline-[#121212] rounded w-full"
                      onChange={handleChange("website_link")}
                      onBlur={handleBlur("website_link")}
                      value={values.website_link}
                    />
                    <div
                      className={`${
                        errors?.website_link && touched?.website_link
                          ? "block"
                          : "block"
                      }`}
                    >
                      <label
                        className={`${
                          errors?.website_link && touched?.website_link
                            ? "text-red-500 text-xs"
                            : "text-transparent text-xs"
                        }`}
                      >{`${
                        errors?.website_link && touched?.website_link
                          ? errors.website_link
                          : "hide"
                      }`}</label>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-10 my-2">
                  <label htmlFor="name" className="text-xl w-4/12 md:w-2/12">
                    Add Site Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Name"
                    className=" py-2 px-2 bg-transparent  outline outline-1 outline-[#121212] rounded w-8/12 md:w-8/12"
                    onChange={handleChange("name")}
                    onBlur={handleBlur("name")}
                    value={values.name}
                  />
                </div>
                <div className="flex items-center gap-10 my-5">
                  <label
                    htmlFor="contact_person"
                    className="text-xl w-4/12 md:w-2/12"
                  >
                    Contact Person
                  </label>
                  <div className="flex justify-between items-center gap-2 w-8/12">
                    <select
                      name=""
                      id="contact_person"
                      className=" py-2 px-2 bg-transparent  outline outline-1 outline-[#121212] rounded w-10/12 md:w-8/12"
                      onChange={(e) => {
                        setFieldValue("contact_person", e.target.value);
                        setCustomerId(e.target.value);
                        getContactPersonDetails(e.target.value)
                        setSelected(!selected)
                      }}
                      onBlur={handleBlur("contact_person")}
                      value={values.contact_person}
                    >
                      {/* <input type="text" name="" id="" /> */}
                      <option value="">Select Customer</option>
                      {customers &&
                        customers.map((customer, index) => (
                          <option value={customer.id} key={index}>
                            {customer.first_name + " " + customer.last_name}
                          </option>
                        ))}
                    </select>
                    <button
                      type="button"
                      className="bg-[#1D1F20] text-white py-2 px-4 hover:bg-transparent hover:text-black outline outline-1 outline-black flex items-center gap-2 "
                      onClick={() => setCustomerModel(true)}
                    >
                      <MdAdd />
                      {tablet && matches ? "Add" : matches ? "Add Customer" : ""}
                    </button>
                    {customerModel && <AddCustomerModal loading={loading} setCustomerModel={setCustomerModel} addNewCustomer={addNewCustomer} password={password} setPassword={setPassword} contactDetails={contactDetails} />}
                  </div>
                </div>
                <div className="flex items-center gap-10 my-5">
                  <label
                    htmlFor="telephone_number"
                    className="text-xl w-4/12 md:w-2/12"
                  >
                    Telephone
                  </label>
                  <div className="w-8/12 md:w-8/12 relative outline outline-1 outline-[#121212] rounded flex">
                    <input
                      type="tel"
                      id="telephone_number"
                      name="telephone_number"
                      placeholder="Telephone number"
                      className=" py-2 px-2 ml-16 bg-transparent flex-grow focus:outline-none"
                      onChange={handleChange("telephone_number")}
                      onBlur={handleBlur("telephone_number")}
                      value={values.telephone_number}
                    />
                    <select
                      name=""
                      id=""
                      className="bg-transparent absolute left-0 h-full w-16 border-r-2"
                      onChange={(e) => setCountryCode(e.target.value)}
                    >
                      <option value="+256">+256</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center gap-10 my-5">
                  <label htmlFor="email" className="text-xl w-4/12 md:w-2/12">
                    Email
                  </label>
                  <div className="w-8/12 md:w-8/12">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Email"
                      className=" py-2 px-2 bg-transparent  outline outline-1 outline-[#121212] rounded w-full"
                      onChange={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values.email}
                    />
                    <div
                      className={`${
                        errors?.email && touched?.email ? "block" : "block"
                      }`}
                    >
                      <label
                        className={`${
                          errors?.email && touched?.email
                            ? "text-red-500 text-xs"
                            : "text-transparent text-xs"
                        }`}
                      >{`${
                        errors?.email && touched?.email ? errors.email : "hide"
                      }`}</label>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-10 my-5">
                  <label
                    htmlFor="last_paid"
                    className="text-xl w-4/12 md:w-2/12"
                  >
                    Upload Date
                  </label>
                  <input
                    type="date"
                    id="last_paid"
                    name="date"
                    className=" py-2 px-2 bg-transparent  outline outline-1 outline-[#121212] rounded w-8/12 md:w-8/12"
                    onChange={handleChange("last_paid")}
                    onBlur={handleBlur("last_paid")}
                    value={values.last_paid}
                  />
                </div>
                <div className="flex items-center gap-10 my-5">
                  <label
                    htmlFor="expiry_date"
                    className="text-xl w-4/12 md:w-2/12"
                  >
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    id="expiry_date"
                    className=" py-2 px-2 bg-transparent  outline outline-1 outline-[#121212] rounded w-8/12 md:w-8/12"
                    onChange={handleChange("expiry_date")}
                    onBlur={handleBlur("expiry_date")}
                    value={values.expiry_date}
                  />
                </div>
                <div className="flex justify-end mt-10">
                  <button
                    type="submit"
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
                    {!loading && (
                      <i>
                        <TbSend />
                      </i>
                    )}
                    {loading ? "Loading" : "Submit"}
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
        <footer className="text-center text-sm text-gray-500 absolute bottom-1 h-6 w-full">
          <p>
            Copyright &#169; {new Date().getFullYear()} A service of Gagawala
            Graphics Limited
          </p>
        </footer>
      </main>
    </>
  );
}

export const getServerSideProps = async ({ req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      props: {},
    };
  }

  return {
    props: {},
  };
};
