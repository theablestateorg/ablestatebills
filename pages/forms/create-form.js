import { ToastContainer } from "react-toastify";
import Head from "next/head";
import { Formik, Form, FieldArray } from "formik";
import { supabase } from "../../utils/supabase";

function createForm() {
  const handleSubmit = async (values) => {
    const { title, description, questions } = values;
    const { data, error: err } = await supabase
      .from("forms")
      .insert({ title: title, description: description });

    if (data) {
      const myAnswers = Object.values(questions);
      const obj = myAnswers.map((v, index) => ({
        ...v,
        set_id: data[0].id,
        sequence_no: index,
      }));
      const { error } = await supabase.from("questions").insert(obj);

      if (error) {
        console.log(error);
      }
    }
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
          description: "",
          questions: [
            {
              question: "",
              field_type: "input",
              field_name: "",
              required: false,
            },
          ],
        }}
      >
        {({ values, handleChange, handleBlur }) => {
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
                    className="bg-transparent w-full px-3 py-2 rounded"
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
                    className="bg-transparent w-full px-3 py-2 rounded"
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
                    {values.questions &&
                      values.questions.length > 0 &&
                      values.questions.map((question, index) => (
                        <div className="bg-white mt-5 rounded-md w-[90%] md:w-[60%] lg:w-[50%] p-8 border shadow-sm relative overflow-hidden">
                          <input
                            type="text"
                            name={`questions[${index}].question`}
                            onChange={handleChange(
                              `questions[${index}].question`
                            )}
                            id="formTitle"
                            placeholder="Untitled Question"
                            className="w-full px-2 py-1 mb-3"
                          />
                          <input
                            type="text"
                            onChange={handleChange(
                              `questions[${index}].field_name`
                            )}
                            id="formTitle"
                            placeholder="Unique question ID"
                            className="w-full px-2 py-1 mb-3"
                          />
                          <div className="flex gap-1 items-center">
                            <input
                              type="checkbox"
                              onChange={handleChange(
                                `questions[${index}].required`
                              )}
                              id="required"
                              placeholder="required"
                              className="px-2 py-1"
                            />
                            <label htmlFor="required">Required</label>
                          </div>

                          <select
                            onChange={handleChange(
                              `questions[${index}].field_type`
                            )}
                            className="px-5 py-2 bg-transparent border-[1px] rounded-lg"
                          >
                            <option value="text">text</option>
                            <option value="textarea">textarea</option>
                            <option value="tel">tel</option>
                            <option value="email">email</option>
                          </select>
                        </div>
                      ))}

                    <div className=" text-white mt-4 flex gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          fieldArrayProp.push({
                            question: "",
                            field_type: "text",
                            field_name: "",
                            required: false,
                          });
                        }}
                        className="bg-gray-700 rounded px-3 py-2"
                      >
                        Add Question
                      </button>

                      <button
                        type="button"
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
