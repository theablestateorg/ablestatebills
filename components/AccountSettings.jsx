import { Form, Formik } from "formik";
import { MdEdit, MdOutlineMail } from "react-icons/md";
import { supabase } from "../utils/supabase";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import useMediaQuery from "../hooks/useMediaQuery";
import { BsFillCameraFill } from "react-icons/bs";

function AccountSettings({ user, avatar }) {
  const [loading, setLoading] = useState(false);
  const [img, setImg] = useState(null);

  const handleSubmit = async (event, values) => {
    event.preventDefault();

    const { first_name, last_name, email } = values;
    if (img) {
      const { data } = await supabase.storage
        .from("avatars")
        .upload(`public/${img.name}`, img, {
          cacheControl: "3600",
          upsert: false,
        });

      const { error } = await supabase
        .from("profiles")
        .update({ avatar_url: data.Key })
        .match({ id: user.id });

      if (data) {
        toast.success(`Profile Updated successfully`, {
          position: "top-center",
        });
      }
    } else {
      const { error } = await supabase
        .from("profiles")
        .update({ first_name, last_name })
        .match({ id: user.id });
      toast.success(`Profile Updated successfully`, {
        position: "top-center",
      });
    }
  };

  return (
    <section className="my-5 flex-grow flex flex-col md:px-8">
      <h1 className="font-bold text-lg border-b-2 p-2">Account Settings</h1>
      <Formik initialValues={{ first_name: "", last_name: "", email: "" }}>
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
              className="my-5 flex-grow py-5"
              name="signUpForm"
            >
              <div className="mb-5 w-36 h-36 rounded-lg overflow-hidden relative flex justify-center">
                <div
                  className={`w-36 h-36 overflow-hidden dialog cursor-pointer mb-5`}
                >
                  {avatar ? (
                    <img src={avatar} alt="profile" />
                  ) : (
                    <span className="text-white font-bold bg-[#CA3011] flex items-center justify-center relative w-36 h-36">
                      {user?.user_metadata.first_name[0].toUpperCase()}
                      {user?.user_metadata.last_name[0].toUpperCase()}
                    </span>
                  )}
                </div>
                <label
                  htmlFor="profile-upload"
                  className="absolute bottom-1 bg-white bg-opacity-50 p-1 text-sm text-white rounded-full z-10 cursor-pointer"
                >
                  <span className="flex gap-1 justify-center items-center">
                    <BsFillCameraFill /> Change photo
                  </span>
                  <input
                    className="hidden"
                    id="profile-upload"
                    type="file"
                    onChange={(event) => setImg(event.target.files[0])}
                  />
                </label>
                <label
                  htmlFor=""
                  className="absolute bottom-1 bg-white bg-opacity-10 p-1 text-sm text-white rounded-full blur-sm"
                >
                  <span className="flex gap-1 justify-center items-center">
                    <BsFillCameraFill /> Change photo
                  </span>
                  <input
                    className="hidden"
                    type="file"
                    onChange={(event) => setImg(event.target.files[0])}
                  />
                </label>
              </div>
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-5">
                <div className="w-full md:w-6/12">
                  <input
                    type="text"
                    name="first_name"
                    className="outline outline-1 outline-[#e7e5e4] py-1 bg-[#f5f5f5] px-2 placeholder:text-[#bcbfc2] w-full"
                    placeholder="enter first name"
                    defaultValue={user && user.user_metadata.first_name}
                    onChange={handleChange("first_name")}
                    onBlur={handleBlur("first_name")}
                  />
                </div>
                <div className="w-full md:w-6/12">
                  <input
                    type="text"
                    name="last_name"
                    className="outline outline-1 outline-[#e7e5e4] bg-[#f5f5f5] py-1 px-2 placeholder:text-[#bcbfc2] w-full"
                    placeholder="enter last name"
                    defaultValue={user && user.user_metadata.last_name}
                    onChange={handleChange("last_name")}
                    onBlur={handleBlur("last_name")}
                  />
                </div>
              </div>
              <div className="w-full outline outline-1 flex items-center outline-[#e7e5e4] bg-[#f5f5f5]  my-5">
                <i className="p-2">
                  <MdOutlineMail size={20} />
                </i>
                <input
                  type="email"
                  name="email"
                  className=" py-1 px-2 bg-transparent placeholder:text-[#bcbfc2] w-full focus:outline-none"
                  placeholder="enter email"
                  defaultValue={user && user.email}
                  onChange={handleChange("email")}
                  onBlur={handleBlur("email")}
                />
              </div>
              {/* <div className="flex gap-5 items-end  my-2">
                      <div className="w-full outline outline-1 flex items-center outline-[#e7e5e4] bg-[#f5f5f5]">
                        <div
                          className={`${
                            errors?.email && touched?.email ? "block" : "hidden"
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
                    </div> */}

              <button
                type="submit"
                // disabled={!(isValid && dirty)}
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
                {loading ? "Loading" : "Submit"}
              </button>
            </Form>
          );
        }}
      </Formik>
    </section>
  );
}

export default AccountSettings;
