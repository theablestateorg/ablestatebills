import { ToastContainer, toast } from "react-toastify";
import Head from "next/head";
import { Formik, Form, FieldArray, ErrorMessage, Field } from "formik";

function createForm() {
  const handleSubmit = (values) => {
    console.log(values);
  };
  return (
    <div className="w-screen pt-[70px]">
      <Head>
        <title>Create Form - Ablestate Cloud</title>
      </Head>
      <ToastContainer />

      <Formik
        initialValues={{
          title: "",
          descripton: "",
          questions: [
            {
              question: "",
              field_type: "input",
              field_name: "",
              required: false,
              // sequence_no: ""
            },
          ],
        }}
        // validationSchema={rfqValidationSchema}
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
          resetForm,
        }) => {
          return (
            <Form
              onSubmit={(event) => {
                event.preventDefault();
                handleSubmit(values);
              }}
              className="w-screen flex flex-col gap-2 items-center py-5 relative"
            >
              <div className="bg-white mt-5 rounded-md w-[90%] md:w-[60%] lg:w-[50%] p-8 border shadow-sm relative overflow-hidden">
                <div className="bg-red-500 w-full h-3 absolute left-0 -top-1"></div>

                <div className="w-full mb-2">
                  <h1>Title</h1>
                  <input
                    type="text"
                    placeholder="Enter title"
                    className="outline outline-1 bg-transparent w-full px-3 py-2 rounded"
                    name="title"
                    onChange={handleChange("title")}
                    onBlur={handleBlur("title")}
                    id=""
                  />
                </div>

                <div className="w-full mb-2">
                  <h1>Description</h1>
                  <input
                    type="text"
                    placeholder="Enter description"
                    className="outline outline-1 bg-transparent w-full px-3 py-2 rounded"
                    name="description"
                    onChange={handleChange("description")}
                    onBlur={handleBlur("description")}
                    id=""
                  />
                </div>
              </div>

              <FieldArray
                name="questions"
                render={(fieldArrayProp) => (
                  <>
                    <div className="bg-white mt-5 rounded-md w-[90%] md:w-[60%] lg:w-[50%] p-8 border shadow-sm relative overflow-hidden">
                      <input
                        type="text"
                        id="formTitle"
                        placeholder="Untitled Question"
                        className="w-full px-2 py-1 mb-3"
                      />
                      <input
                        type="text"
                        id="formTitle"
                        placeholder="Your Answer"
                        className="w-full px-2 py-1"
                      />
                    </div>

                    <div className=" text-white mt-4 flex gap-3">
                      <button
                        onClick={() => {
                          console.log("hello world!");
                          fieldArrayProp.push({
                            name: "",
                            contact: "",
                          });
                        }}
                        className="bg-gray-700 rounded px-3 py-2"
                      >
                        Add Question
                      </button>

                      <button
                        onClick={() => {
                          console.log("hello world!");
                          fieldArrayProp.pop();
                        }}
                        className="bg-red-600 rounded px-3 py-2"
                      >
                        Remove Question
                      </button>

                      <input
                        className="bg-gray-700 rounded px-3 py-2 text-white"
                        value="Submit"
                        type="submit"
                      />
                    </div>
                  </>
                )}
              ></FieldArray>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default createForm;
