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
import PasswordGenerator from "../components/PasswordGenerator";
import axios from "axios";

export default function AddClient() {
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
  const [password, setPassword] = useState(null);

  useEffect(() => {
    // getCustomers();
    // getContact(customerId);
  }, [selected]);

  const addNewCustomer = async (values, resetForm) => {
    if (password) {
      const { email, first_name, last_name, role, contact_number } = values;
      setLoading(true);
      await axios.post("/api/add-customer", {
        email: email,
        password: password,
        added_by: user.id,
        details: {
          first_name: first_name,
          last_name: last_name,
          email: email,
          contact_number: countryCode + contact_number,
          role: role
        },
      }).then(res => toast.success(`Successfully added customer`, { position: "top-center" }))
      .catch(error => toast.error(`Error adding customer`, { position: "top-center" }))
    } else {
      toast.error(`No password`, { position: "top-center" });
    }
    setLoading(false);

    setPassword(null);

    resetForm({
      password: password,
      first_name: "",
      last_name: "",
      role: "customer",
      email: "",
      contact_number: "",
    });
  };

  return (
    <>
      <Head>
        <title>Add Customer - Shine Afrika</title>
      </Head>
      <ToastContainer />
      <main className="pt-[70px] mx-5 md:mx-20 relative pb-6 min-h-screen">
        <section className="flex justify-between items-center">
          <h1 className="font-bold text-2xl my-5">Add Customer</h1>
        </section>

        <Formik
          initialValues={{
            password: password,
            first_name: "",
            last_name: "",
            role: "customer",
            email: "",
            contact_number: "",
          }}
          onSubmit={(values, { resetForm }) => {
            addNewCustomer(values, resetForm);
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
                  <label htmlFor="" className="text-xl w-4/12 md:w-2/12">
                    Email
                  </label>
                  <div className="w-8/12 md:w-8/12">
                    <input
                      type="email"
                      name="email"
                      className="py-2 px-2 bg-transparent  outline outline-1 outline-[#121212] rounded w-full"
                      placeholder="Enter email"
                      onChange={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values.email}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-10 my-5">
                  <label htmlFor="" className="text-xl w-4/12 md:w-2/12">
                    First Name
                  </label>
                  <div className="w-8/12 md:w-8/12">
                    <input
                      type="text"
                      name="text"
                      className="py-2 px-2 bg-transparent  outline outline-1 outline-[#121212] rounded w-full"
                      placeholder="Enter first name"
                      onChange={handleChange("first_name")}
                      onBlur={handleBlur("first_name")}
                      value={values.first_name}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-10 my-5">
                  <label htmlFor="" className="text-xl w-4/12 md:w-2/12">
                    Last Name
                  </label>
                  <div className="w-8/12 md:w-8/12">
                    <input
                      type="text"
                      name="text"
                      className="py-2 px-2 bg-transparent  outline outline-1 outline-[#121212] rounded w-full"
                      placeholder="Enter last name"
                      onChange={handleChange("last_name")}
                      onBlur={handleBlur("last_name")}
                      value={values.last_name}
                    />
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
                      onChange={handleChange("contact_number")}
                      onBlur={handleBlur("contact_number")}
                      value={values.contact_number }
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
                <PasswordGenerator
                  password={password}
                  setPassword={setPassword}
                  resize={true}
                />

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
        Copyright &#169; {new Date().getFullYear()} A service of Ablestate Creatives Limited
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
