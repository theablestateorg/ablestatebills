import Head from "next/head";
import Footer from "../../components/Footer";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ToastContainer, toast } from "react-toastify";
import { rfqValidationSchema } from "../../utils/validation";
import { BiErrorCircle } from "react-icons/bi";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef, useEffect, useState, Fragment } from "react";
import { supabase } from "../../utils/supabase";
import { useAuth } from "../../utils/auth";
import EditForm from "../../components/roles/EditForm";
import { MdEdit, MdOutlineClose, MdCheck } from "react-icons/md";
import { useRouter } from "next/router";
import { parseCookies } from "../../utils/parseCookies";

function formDetails() {
  // {form, questions}
  const captchaRef = useRef(null);
  const [form, setForm] = useState(null);
  const [desc, setDesc] = useState(null);
  const [questions, setQuestions] = useState(null);
  const { user } = useAuth();
  const [editMode, toggleEditMode] = useState(false);
  const [responses, toggleResponse] = useState(false);
  const [email, setEmail] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getForm();
  }, [editMode]);

  const getForm = async () => {
    const { data, error } = await supabase
      .from("forms")
      .select()
      .eq("id", id)
      .single();

    if (data) {
      const { data: ques, error: quErrors } = await supabase
        .from("questions")
        .select("*, answers (answer, person_id)")
        .order("sequence_no", { ascending: true })
        .eq("set_id", data.id);

      const { data: answers, error: ansErrors } = await supabase
        .from("answers")
        .select()
        .order("created_at", { ascending: true })
        .eq("question_id", ques.id);

      setQuestions(ques);

      //     const { data, error } = await supabase
      // .from('Calorie')
      // .select(`
      //   calorieAmount,
      //   profiles (userName)
      // `);
    } else {
      // console.log("something lost");
    }

    // const text = data.description;
    // const lines = text.split("\n");
    // setDesc(lines);
    setForm(data);
    // // console.log(data);
  };

  // console.log(form);
  // console.log(questions);

  const handleSubmit = async (values) => {
    const { data, error: err } = await supabase
      .from("survey_activity")
      .insert({ email: email, set_id: form.id });

    if (data) {
      const myAnswers = Object.values(values);
      const obj = myAnswers.map((v) => ({ ...v, person_id: data[0].id }));
      console.log(obj);
      const { error } = await supabase.from("answers").insert(obj);

      if (error) {
        console.log(error);
      }
    }
  };

  // console.log(form);
  // console.log(email)

  return (
    <div className="w-screen pt-[70px]">
      <Head>
        <title>{form && form.title} - Ablestate Cloud</title>
      </Head>
      <ToastContainer />

      <Formik
        initialValues={{
          name: {
            question_id: "",
            answer: "",
          },
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
          setFieldValue,
          resetForm,
        }) => {
          return (
            <Form
              onSubmit={(event) => {
                event.preventDefault();
                const token = captchaRef.current.getValue();
                captchaRef.current.reset();
                handleSubmit(values);
              }}
              className="w-screen flex flex-col gap-2 items-center pb-5 relative"
            >
              {responses ? (
                <>
                  <div className="bg-white mt-5 rounded-md w-[90%] md:w-[60%] lg:w-[50%] p-8 border shadow-sm relative overflow-hidden">
                    <div className="bg-red-500 w-full h-3 absolute left-0 -top-1"></div>
                    <h1 className="text-2xl font-bold mb-5">
                      {form && form.title}
                    </h1>
                    {form && form.description}
                  </div>

                  {/* lower sections */}
                  {questions &&
                    questions.map((question, index) => (
                      <div
                        className={`bg-white mt-5 rounded-md w-[90%] md:w-[60%] lg:w-[50%] p-8 border shadow-sm overflow-hidden`}
                        key={index}
                      >
                        {console.log(question)}
                        <h3 className="mb-2">{question.question}</h3>
                        <div className="px-2 py-2">
                          {question.answers &&
                            question.answers.map((answer, index) => (
                              <p
                                className="bg-gray-100 px-2 py-1 rounded"
                                key={index}
                              >
                                {answer.answer}
                              </p>
                            ))}
                        </div>
                      </div>
                    ))}
                </>
              ) : (
                <>
                  <div className="bg-white mt-5 rounded-md w-[90%] md:w-[60%] lg:w-[50%] p-8 border shadow-sm relative overflow-hidden">
                    <div className="bg-red-500 w-full h-3 absolute left-0 -top-1"></div>
                    <h1 className="text-2xl font-bold mb-5">
                      {editMode ? (
                        <div className="border-b-[1px] flex justify-between items-center relative">
                          <input
                            type="text"
                            id="formTitle"
                            placeholder={form && form.title}
                            className="w-full px-2 py-1"
                          />
                          <span className="absolute right-1 flex gap-1">
                            <MdOutlineClose
                              className="cursor-pointer"
                              onClick={() => {
                                // console.log("yes")
                                toggleEditMode(false);
                              }}
                            />
                            <MdCheck
                              className="cursor-pointer"
                              onClick={async () => {
                                const { error } = await supabase
                                  .from("forms")
                                  .update({
                                    title:
                                      document.getElementById("formTitle")
                                        .value,
                                  })
                                  .eq("id", form.id);

                                toggleEditMode(false);
                              }}
                            />
                          </span>
                        </div>
                      ) : (
                        form && form.title
                      )}
                    </h1>
                    {editMode ? (
                      <div className="border-b-[1px] flex justify-between items-center relative">
                        <input
                          type="textarea"
                          id="formDesc"
                          placeholder={form && form.description}
                          className="w-full px-2 py-1"
                        />
                        <span className="absolute right-1 flex gap-1">
                          <MdOutlineClose
                            className="cursor-pointer"
                            onClick={() => {
                              toggleEditMode(false);
                            }}
                          />
                          <MdCheck
                            className="cursor-pointer"
                            onClick={async () => {
                              const { error } = await supabase
                                .from("forms")
                                .update({
                                  description:
                                    document.getElementById("formDesc").value,
                                })
                                .eq("id", form.id);

                              toggleEditMode(false);
                            }}
                          />
                        </span>
                      </div>
                    ) : (
                      form && form.description
                    )}
                    <div className="mt-5 py-2">
                      <p>Email (Required)</p>
                      <input
                        type="text"
                        placeholder="Your answer"
                        onChange={(event) => setEmail(event.target.value)}
                        className="py-2 border-b-[1px] w-56 focus:border-red-400 focus:outline-none"
                      />
                    </div>
                  </div>
                  {questions &&
                    questions.map((question, index) => (
                      <div
                        className={`bg-white mt-5 rounded-md w-[90%] md:w-[60%] lg:w-[50%] p-8 border shadow-sm overflow-hidden ${
                          errors[`${question.field_name}`] &&
                          touched[`${question.field_name}`] &&
                          "border-red-500"
                        }`}
                        key={index}
                      >
                        <h3 className="mb-2">
                          {editMode ? (
                            <div className="border-b-[1px] flex justify-between items-center relative">
                              <input
                                type="text"
                                id={`question-${question.id}`}
                                placeholder={question.question}
                                className="w-full px-2 py-1"
                              />
                              <span className="absolute right-1 flex gap-1">
                                <MdOutlineClose
                                  className="cursor-pointer"
                                  onClick={() => {
                                    toggleEditMode(false);
                                  }}
                                />
                                <MdCheck
                                  className="cursor-pointer"
                                  onClick={async () => {
                                    const { error } = await supabase
                                      .from("questions")
                                      .update({
                                        question: document.getElementById(
                                          `question-${question.id}`
                                        ).value,
                                      })
                                      .eq("id", question.id);

                                    // toggleEditMode(false);
                                  }}
                                />
                              </span>
                            </div>
                          ) : (
                            question.question
                          )}
                        </h3>
                        <input
                          type="text"
                          placeholder="Your answer"
                          name={question.field_name}
                          // onChange={handleChange(question.field_name)}
                          onChange={(event) => {
                            setFieldValue(question.field_name, {
                              question_id: question.id,
                              answer: event.target.value,
                              user_id: user ? user.id : null,
                            });
                          }}
                          onBlur={handleBlur(question.field_name)}
                          value={values[`${question.field_name}`].answer}
                          id=""
                          className="py-2 border-b-[1px] w-56 focus:border-red-400 focus:outline-none"
                        />
                        {errors[`${question.field_name}`] &&
                          touched[`${question.field_name}`] && (
                            <p className="text-xs text-red-500 flex gap-1 mt-2">
                              {/* <BiErrorCircle /> */}
                              {errors[`${question.field_name}`]?.answer}
                            </p>
                          )}
                      </div>
                    ))}
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
                </>
              )}
            </Form>
          );
        }}
      </Formik>

      {user &&
        (user?.user_metadata.role === "manager" ||
          user?.user_metadata.role === "admin") && (
          <EditForm
            editMode={editMode}
            toggleEditMode={toggleEditMode}
            responses={responses}
            toggleResponse={toggleResponse}
          />
        )}

      <div className="relative w-screen mt-10">
        <Footer />
      </div>
    </div>
  );
}

export default formDetails;

export const getServerSideProps = async ({ req, res, params }) => {
  const person = parseCookies(req);
  if (res) {
    if (!person.user) {
      return {
        redirect: {
          permanent: false,
          destination: "/login",
        },
        props: {},
      };
    }
  }

  let questions = [];

  const { data: form, error } = await supabase
    .from("forms")
    .select()
    .eq("id", params.id)
    .single();

  if (form) {
    const { data, error: quErrors } = await supabase
      .from("questions")
      .select()
      .order("sequence_no", { ascending: true })
      .eq("set_id", form.id);

    questions = data;
  }

  return {
    props: {
      form,
      questions,
    },
  };
};
