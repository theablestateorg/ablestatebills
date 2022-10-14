import { AiFillCloseCircle } from "react-icons/ai";
import PasswordGenerator from './PasswordGenerator'
import { Formik, Form } from "formik";

function AddCustomerModal( { loading, setCustomerModel, addNewCustomer, password, setPassword, contactDetails}) {
  return (
      <div
        className={`bg-black z-20 bg-opacity-40 w-screen min-h-screen fixed top-0 left-0 right-0 flex justify-center`}
      >
        <div className="relative bg-white dark:bg-dark-bg max-h-screen overflow-auto dark:text-secondary-text p-10 w-10/12 md:8/12  rounded-md m-5 sm:mb-5 shadow-md top-50 z-20">
          <div className="flex items-center justify-between">
            <h1 className="text-center font-bold text-lg my-5">
              Add New Customer
            </h1>
            <AiFillCloseCircle
              size={25}
              className="cursor-pointer"
              onClick={() => setCustomerModel(false)}
            />
          </div>
          <Formik
            initialValues={{
              password: password,
              first_name: "",
              last_name: "",
              role: "customer",
              email: contactDetails.email,
              contact_number: contactDetails.contact_number,
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
              resetForm,
            }) => {
              return (
                <Form
                  className="bg-white p-5"
                  name="customerForm"
                >
                  <div className="flex flex-col gap-2  my-2">
                    <label htmlFor="">Email</label>
                    <div className="w-full">
                      <input
                        type="email"
                        name="email"
                        className="outline outline-1 py-1 px-2 placeholder:text-[#bcbfc2] w-full"
                        placeholder="Enter email"
                        onChange={handleChange("email")}
                        onBlur={handleBlur("email")}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2  my-2">
                    <label htmlFor="">First Name</label>
                    <div className="w-full">
                      <input
                        type="text"
                        name="first_name"
                        className="outline outline-1 py-1 px-2 placeholder:text-[#bcbfc2] w-full"
                        placeholder="Enter first name"
                        onChange={handleChange("first_name")}
                        onBlur={handleBlur("first_name")}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2  my-2">
                    <label htmlFor="">Last Name</label>
                    <div className="w-full">
                      <input
                        type="text"
                        name="last_name"
                        className="outline outline-1 py-1 px-2 placeholder:text-[#bcbfc2] w-full"
                        placeholder="Enter last name"
                        onChange={handleChange("last_name")}
                        onBlur={handleBlur("last_name")}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2  my-2">
                    <label htmlFor="">Telephone Number</label>
                    <div className="w-full">
                      <input
                        type="text"
                        name="contact_number"
                        className="outline outline-1 py-1 px-2 placeholder:text-[#bcbfc2] w-full"
                        placeholder="Enter telephone"
                        onChange={handleChange("contact_number")}
                        onBlur={handleBlur("contact_number")}
                        value={contactDetails.contact_number}
                      />
                    </div>
                  </div>
                  <PasswordGenerator password={password} setPassword={setPassword} />
                  <button
                    type="button"
                    disabled={!(isValid && dirty)}
                    className="bg-[#1D1F20] text-white py-1 px-3 my-2 mt-4 hover:bg-[#292C2D] flex items-center cursor-pointer"
                    onClick={() => {
                      addNewCustomer(values);
                    }}
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
                    {loading ? "Loading" : "Add"}
                  </button>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
  )
}

export default AddCustomerModal