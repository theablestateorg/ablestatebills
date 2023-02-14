import Head from "next/head";
import Footer from "../../components/Footer";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ToastContainer, toast } from "react-toastify";
import { rfqValidationSchema } from "../../utils/validation";
import { BiErrorCircle } from "react-icons/bi";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from "react";

function requestForQuote() {
  const captchaRef = useRef(null);
  return (
    <div className="w-screen">
      <Head>
        <title>Request For Quote (RFQ) - Shine Africa</title>
      </Head>
      <ToastContainer />
      <Formik
        initialValues={{
          name: "",
          email: "",
          phone: "",
          purpose: "",
          audience: "",
          brandGuide: "",
          features: "",
          existingWebsites: "",
          timeline: "",
          contentCreation: "",
          maintenance: "",
          target: "",
        }}
        validationSchema={rfqValidationSchema}
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
              onSubmit={(event) => {
                event.preventDefault();
                const token = captchaRef.current.getValue();
                captchaRef.current.reset();
                console.log(values);
              }}
              className="w-screen flex flex-col gap-2 items-center pb-5 relative"
            >
              <div className="bg-white mt-5 rounded-md w-[90%] md:w-[60%] lg:w-[50%] p-8 border shadow-sm relative overflow-hidden">
                <div className="bg-red-500 w-full h-3 absolute left-0 -top-1"></div>
                <h1 className="text-2xl font-bold mb-5">
                  Request For Quote (RFQ)
                </h1>
                <p>
                  Are you in need of a new website for your business or
                  organization? Our Request for Quote (RFQ) form is the perfect
                  starting point. The RFQ form is a simple and easy-to-use
                  document that allows you to request a proposal and pricing
                  from our website development team.
                </p>
                <br />
                <p>
                  The information you will provide will help us to understand
                  the scope of the project and provide you with an accurate
                  proposal and pricing.
                </p>
                <br />
                <p>
                  The RFQ form is an important tool for both you and our website
                  development team, as it allows both parties to establish a
                  clear understanding of the project requirements, timeline, and
                  pricing before the project begins. So if you're in need of a
                  new website, start by completing our RFQ form today!
                </p>
              </div>
              <div
                className={`bg-white mt-5 rounded-md w-[90%] md:w-[60%] lg:w-[50%] p-8 border shadow-sm overflow-hidden ${
                  errors.name && "border-red-500"
                }`}
              >
                <h3 className="mb-2">
                  Full Name <span className="text-red-500">*</span>
                </h3>
                <input
                  type="text"
                  placeholder="Your answer"
                  name="name"
                  onChange={handleChange("name")}
                  onBlur={handleBlur("name")}
                  value={values.name}
                  id=""
                  className="py-2 border-b-[1px] w-56 focus:border-red-400 focus:outline-none"
                />
                <ErrorMessage name="name">
                  {(msg) => (
                    <p className="text-xs text-red-500 flex gap-1 mt-2">
                      <BiErrorCircle />
                      {msg}
                    </p>
                  )}
                </ErrorMessage>
              </div>
              <div
                className={`bg-white mt-5 rounded-md w-[90%] md:w-[60%] lg:w-[50%] p-8 border shadow-sm overflow-hidden ${
                  errors.email && "border-red-500"
                }`}
              >
                <h3 className="mb-2">
                  Email Address <span className="text-red-500">*</span>
                </h3>
                <input
                  type="text"
                  placeholder="Your answer"
                  name="email"
                  onChange={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  id=""
                  className={`py-2 border-b-[1px] w-56 focus:border-red-400 focus:outline-none ${
                    errors.email && "border-red-500"
                  }`}
                />
                <ErrorMessage name="email">
                  {(msg) => (
                    <p className="text-xs text-red-500 flex gap-1 mt-2">
                      <BiErrorCircle />
                      {msg}
                    </p>
                  )}
                </ErrorMessage>
              </div>
              <div className="bg-white mt-5 rounded-md w-[90%] md:w-[60%] lg:w-[50%] p-8 border shadow-sm overflow-hidden">
                <h3 className="mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </h3>
                <input
                  type="text"
                  placeholder="Your answer"
                  name="phone"
                  onChange={handleChange("phone")}
                  onBlur={handleBlur("phone")}
                  value={values.phone}
                  id=""
                  className="py-2 border-b-[1px] w-56 focus:border-red-400 focus:outline-none"
                />
                <ErrorMessage name="phone">
                  {(msg) => (
                    <p className="text-xs text-red-500 flex gap-1 mt-2">
                      <BiErrorCircle />
                      {msg}
                    </p>
                  )}
                </ErrorMessage>
              </div>
              <div className="bg-white mt-5 rounded-md w-[90%] md:w-[60%] lg:w-[50%] p-8 border shadow-sm overflow-hidden">
                <h3 className="mb-2">
                  What is the purpose of the website? Is it to provide
                  information, sell products or services, or something else? To
                  help better understand your project, please write as much as
                  you can. <span className="text-red-500">*</span>
                </h3>
                <input
                  type="text"
                  placeholder="Your answer"
                  name="purpose"
                  onChange={handleChange("purpose")}
                  onBlur={handleBlur("purpose")}
                  value={values.purpose}
                  id=""
                  className="py-2 border-b-[1px] w-full focus:border-red-400 focus:outline-none"
                />
                <ErrorMessage name="purpose">
                  {(msg) => (
                    <p className="text-xs text-red-500 flex gap-1 mt-2">
                      <BiErrorCircle />
                      {msg}
                    </p>
                  )}
                </ErrorMessage>
              </div>
              <div className="bg-white mt-5 rounded-md w-[90%] md:w-[60%] lg:w-[50%] p-8 border shadow-sm overflow-hidden">
                <h3 className="mb-2">
                  Who is the target audience for the website?
                </h3>
                <input
                  type="text"
                  placeholder="Your answer"
                  name="audience"
                  onChange={handleChange("audience")}
                  onBlur={handleBlur("audience")}
                  value={values.audience}
                  id=""
                  className="py-2 border-b-[1px] w-full focus:border-red-400 focus:outline-none"
                />
              </div>
              <div className="bg-white mt-5 rounded-md w-[90%] md:w-[60%] lg:w-[50%] p-8 border shadow-sm overflow-hidden">
                <h3 className="mb-2">
                  Are there any specific design or branding requirements for the
                  website? For example, do you have a logo, and brand guide yet?
                </h3>
                <input
                  type="text"
                  placeholder="Your answer"
                  name="brandGuide"
                  onChange={handleChange("brandGuide")}
                  onBlur={handleBlur("brandGuide")}
                  value={values.brandGuide}
                  id=""
                  className="py-2 border-b-[1px] w-full focus:border-red-400 focus:outline-none"
                />
              </div>
              <div className="bg-white mt-5 rounded-md w-[90%] md:w-[60%] lg:w-[50%] p-8 border shadow-sm overflow-hidden">
                <h3 className="mb-2">
                  Are there any specific features or functionality that are
                  required for the website?
                </h3>
                <input
                  type="text"
                  placeholder="Your answer"
                  name="features"
                  onChange={handleChange("features")}
                  onBlur={handleBlur("features")}
                  value={values.features}
                  id=""
                  className="py-2 border-b-[1px] w-full focus:border-red-400 focus:outline-none"
                />
              </div>
              <div className="bg-white mt-5 rounded-md w-[90%] md:w-[60%] lg:w-[50%] p-8 border shadow-sm overflow-hidden">
                <h3 className="mb-2">
                  Are there any existing websites that the you like or dislike,
                  and why?
                </h3>
                <input
                  type="text"
                  placeholder="Your answer"
                  name="existingWebsites"
                  onChange={handleChange("existingWebsites")}
                  onBlur={handleBlur("existingWebsites")}
                  value={values.existingWebsites}
                  id=""
                  className="py-2 border-b-[1px] w-full focus:border-red-400 focus:outline-none"
                />
              </div>
              <div className="bg-white mt-5 rounded-md w-[90%] md:w-[60%] lg:w-[50%] p-8 border shadow-sm overflow-hidden">
                <h3 className="mb-2">
                  What is the timeline for the website project?{" "}
                  <span className="text-red-500">*</span>
                </h3>
                <div
                  role="group"
                  aria-labelledby="my-radio-group"
                  className="flex flex-col gap-1"
                >
                  <label>
                    <Field type="radio" name="timeline" value="30 days" />
                    30 days
                  </label>
                  <label>
                    <Field type="radio" name="timeline" value="60 days" />
                    60 days
                  </label>
                  <label>
                    <Field type="radio" name="timeline" value="90 days" />
                    90 days
                  </label>
                  <label>
                    <Field type="radio" name="timeline" value="4 months" />4
                    months
                  </label>
                  <label>
                    <Field type="radio" name="timeline" value="6 months" />6
                    months
                  </label>
                </div>
                <ErrorMessage name="timeline">
                  {(msg) => (
                    <p className="text-xs text-red-500 flex gap-1 mt-2">
                      <BiErrorCircle />
                      {msg}
                    </p>
                  )}
                </ErrorMessage>
              </div>
              <div className="bg-white mt-5 rounded-md w-[90%] md:w-[60%] lg:w-[50%] p-8 border shadow-sm overflow-hidden">
                <h3 className="mb-2">
                  Who will be responsible for creating and providing the website
                  content? (Text, Photos, Videos etc)
                </h3>
                <input
                  type="text"
                  placeholder="Your answer"
                  name="contentCreation"
                  onChange={handleChange("contentCreation")}
                  onBlur={handleBlur("contentCreation")}
                  value={values.contentCreation}
                  id=""
                  className="py-2 border-b-[1px] w-full focus:border-red-400 focus:outline-none"
                />
              </div>
              <div className="bg-white mt-5 rounded-md w-[90%] md:w-[60%] lg:w-[50%] p-8 border shadow-sm overflow-hidden">
                <h3 className="mb-2">
                  Will you need ongoing maintenance or support for the website
                  after it is launched?
                </h3>
                <input
                  type="text"
                  placeholder="Your answer"
                  name="maintenance"
                  onChange={handleChange("maintenance")}
                  onBlur={handleBlur("maintenance")}
                  value={values.maintenance}
                  id=""
                  className="py-2 border-b-[1px] w-full focus:border-red-400 focus:outline-none"
                />
              </div>
              <div className="bg-white mt-5 rounded-md w-[90%] md:w-[60%] lg:w-[50%] p-8 border shadow-sm overflow-hidden">
                <h3 className="mb-2">
                  If you have a target, what is the expected traffic volume for
                  the website?
                </h3>
                <input
                  type="text"
                  placeholder="Your answer"
                  name="target"
                  onChange={handleChange("target")}
                  onBlur={handleBlur("target")}
                  value={values.target}
                  id=""
                  className="py-2 border-b-[1px] w-full focus:border-red-400 focus:outline-none"
                />
              </div>
              <div className="">
                <ReCAPTCHA
                  sitekey={process.env.NEXT_PUBLIC_SITE_KEY}
                  ref={captchaRef}
                />
              </div>

              <div className="mt-5 w-[90%] md:w-[60%] lg:w-[50%] px-8 relative overflow-hidden flex justify-between">
                <button
                  type="button"
                  className="px-3 py-2 text-red-500"
                  onClick={() => {
                    resetForm({
                      name: "",
                      email: "",
                      phone: "",
                      purpose: "",
                      audience: "",
                      brandGuide: "",
                      features: "",
                      existingWebsites: "",
                      timeline: "",
                      contentCreation: "",
                      maintenance: "",
                      target: "",
                    });
                  }}
                >
                  Clear form
                </button>
                <button
                  type="submit"
                  className="px-3 py-2 text-white bg-gray-800 rounded"
                >
                  Submit
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>

      <div className="relative w-screen mt-10">
        <Footer />
      </div>
    </div>
  );
}

export default requestForQuote;
