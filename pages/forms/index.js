import Head from "next/head";
import { useAuth } from "../../utils/auth";
import { MdAdd } from "react-icons/md";
import useMediaQuery from "../../hooks/useMediaQuery";
import { useRouter } from "next/router";
import { FaSort } from "react-icons/fa";
import { useRef } from "react";
import { parseCookies } from "../../utils/parseCookies";
import { supabase } from "../../utils/supabase";
import moment from "moment";

function index({ forms }) {
  const router = useRouter();
  const { user, notifications } = useAuth();
  const matches = useMediaQuery("(min-width: 800px)");
  const checkbox = useRef();

  return (
    <>
      <Head>
        <title>
          {notifications && notifications.length > 0
            ? `(${notifications.length})`
            : ""}{" "}
          Forms - Ablestate Cloud
        </title>
      </Head>

      <main className="pt-[70px] mx-3 md:mx-16 relative pb-6 min-h-screen">
        <section className="flex justify-between items-center my-10">
          <h1 className="font-bold text-2xl"></h1>
          <button
            className="bg-[#1D1F20] text-white py-2 px-4 my-2 hover:bg-transparent hover:text-black outline outline-1 outline-black flex items-center gap-2 "
            onClick={() => router.push("/forms/create-form")}
          >
            <MdAdd />
            Create Form
          </button>
        </section>

        <div className="outline outline-1 outline-[#e5e7eb] mb-5 overflow-x-scroll select-none">
          <table className="bg-white w-full table-auto p-10 select-none">
            <caption className=" bg-white py-3 outline outline-1 outline-[#e5e7eb] px-3">
              <section className="flex justify-between items-center">
                <h3 className="font-bold text-left">Forms</h3>
                {matches && (
                  <div className="flex items-center gap-2">
                    <form
                      onSubmit={(event) => {
                        event.preventDefault();
                        setPopUp(true);
                      }}
                    >
                      <select
                        name=""
                        id=""
                        className="px-3 py-2 bg-[#f7f7f7] rounded-lg placeholder:text-[#bcbfc2] outline outline-1 outline-[#f4f3f7]"
                        required
                      >
                        <option value="">Bulk Actions</option>
                        <option value="telephone_number">Delete</option>
                      </select>
                      <input
                        type="submit"
                        value="apply"
                        className="px-3 py-2 ml-2 bg-gray-700 text-white rounded-lg text-sm cursor-pointer"
                      />
                    </form>
                    <div className="flex justify-between items-center">
                      <div className="flex justify-between items-center relative focus-within:text-black ">
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="search"
                            className="px-3 py-2 bg-[#f7f7f7] rounded-lg placeholder:text-[#bcbfc2] w-full outline outline-1 outline-[#f4f3f7]"
                            onChange={(event) => {
                              setSearchText(event.target.value);

                              if (event.target.value !== "") {
                                const rightWeb = websites.filter((web) =>
                                  web.name
                                    .toLowerCase()
                                    .startsWith(
                                      event.target.value.toLowerCase()
                                    )
                                );
                                const recommendation =
                                  rightWeb.length > 0 ? rightWeb[0] : null;
                                setRecommend(
                                  recommendation?.name.toLowerCase()
                                );

                                document.getElementById("paragraph").innerHTML =
                                  rightWeb.length > 0
                                    ? rightWeb[0]?.name
                                        .toLowerCase()
                                        .replace(
                                          event.target.value,
                                          `<span class="text-black">${event.target.value}</span>`
                                        )
                                    : "";
                              } else {
                                setRecommend(null);
                                document.getElementById("paragraph").innerHTML =
                                  "";
                              }
                            }}
                          />
                          <p
                            id="paragraph"
                            className="text-gray-400 absolute top-2 left-3 pointer-events-none"
                          ></p>
                        </div>
                        <select
                          name=""
                          id=""
                          className="absolute right-1 px-1 py-2 ml-2 bg-white rounded-lg outline outline-1 outline-[#ededed] text-sm"
                          onChange={(event) => setSearchBy(event.target.value)}
                        >
                          <option value="name">name</option>
                          <option value="telephone_number">no.</option>
                          <option value="contact_person">person</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </section>
            </caption>
            <thead>
              <tr className="border-b bg-[#f7f7f7] text-[#555b6d]">
                {matches && (
                  <th className="py-4 text-center px-3 w-1">
                    <input
                      type="checkbox"
                      className="accent-[#ca3011]"
                      name=""
                      id=""
                      ref={checkbox}
                      onChange={() => {
                        if (checkbox.current.checked === true) {
                          Object.values(
                            document.getElementsByClassName("checkboxes")
                          ).map((checkbox) => (checkbox.checked = true));
                          setDeleteArray(
                            websites.map((site) => [site.id, site.name])
                          );
                        } else {
                          Object.values(
                            document.getElementsByClassName("checkboxes")
                          ).map((checkbox) => (checkbox.checked = false));
                          setDeleteArray([]);
                        }
                      }}
                    />
                  </th>
                )}
                <th className="py-4 text-left pl-3 font-light">
                  <div className="flex items-center">
                    Created At
                    <i className="cursor-pointer" onClick={() => {}}>
                      <FaSort size={13} />
                    </i>
                  </div>
                </th>
                <th className="py-4 text-left pl-3 font-light">
                  <div className="flex items-center">
                    Title
                    <i className="cursor-pointer" onClick={() => {}}>
                      <FaSort size={13} />
                    </i>
                  </div>
                </th>
                {matches && (
                  <>
                    <th className="py-4 text-left pl-3 font-light flex items-center">
                      Description
                      <i className="cursor-pointer" onClick={() => {}}>
                        <FaSort size={13} />
                      </i>
                    </th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {forms &&
                forms.map((form, index) => (
                  <>
                    <tr
                      className={`border-b border-l-2 border-l-transparent hover:border-l-[#ca3011] cursor-pointer mb-10`}
                      key={index}
                      onClick={() => router.push(`/forms/v1/${form.id}`)}
                    >
                      {matches && (
                        <>
                          <td
                            className="py-4 text-center px-3"
                            onClick={(event) => event.stopPropagation()}
                          >
                            <input
                              type="checkbox"
                              name=""
                              id=""
                              className="checkboxes accent-[#ca3011]"
                              // onChange={(event) => {
                              //   event.stopPropagation();
                              //   checkbox.current.checked = false;
                              //   return event.target.checked
                              //     ? setDeleteArray([
                              //         ...deleteArray,
                              //         [site.id, site.name],
                              //       ])
                              //     : setDeleteArray(
                              //         deleteArray.filter(
                              //           (element) => element[0] !== site.id
                              //         )
                              //       );
                              // }}
                            />
                          </td>
                        </>
                      )}
                      <td className="py-2 text-left pl-3">
                        {moment(new Date(form.created_at)).format("DD-MM-YYYY")}
                      </td>
                      <td className="py-2 text-left pl-3">{form.title}</td>
                      {matches && (
                        <td className="py-2 text-left pl-3 overflow-hidden overflow-ellipsis h-3">
                          {form.description}
                        </td>
                      )}
                    </tr>
                  </>
                ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}

export default index;

export const getServerSideProps = async ({ req, res }) => {
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

  const { data: forms } = await supabase
    .from("forms")
    .select("*")
    .order("created_at", { ascending: false });

  return {
    props: {
      forms,
    },
  };
};
