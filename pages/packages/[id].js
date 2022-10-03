import Head from "next/head";
import { useRouter } from "next/router";
import { supabase } from "../../utils/supabase";
import { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { IoWarning } from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify";
import Router from "next/router";
import { Formik, Form } from "formik";
import { AiFillCloseCircle } from "react-icons/ai";
import { useAuth } from "../../utils/auth";
import { TbEdit } from 'react-icons/tb'
import AddCustomerModal from "../../components/AddCustomerModal";
import { MdAdd } from "react-icons/md";
import useMediaQuery from "../../hooks/useMediaQuery";
import Footer from "../../components/Footer";
import Starter from "../../components/Starter";

function Packages() {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth()
  const matches = useMediaQuery("(min-width: 800px)");

  return (
    <div>
      <Head>
        <title>Packages - Shine Africa</title>
      </Head>

      <ToastContainer />

      <main className={`pt-[70px] mx-5 md:mx-20 relative pb-6 min-h-screen ${!user && matches && " justify-between flex flex-row"} gap-10 `}>
        <section>
          <div className="">
            {id == 1 ?
              <Starter />
            : id == 2 ?
              <>Scaler Package</>
            :
              <>Stablizer Package</>
            }
          </div>
        </section>
        {!user &&
          <section>
            <h1>Login</h1>
          </section>
        }
      </main>
      <Footer />
    </div>
  );
}

export default Packages;

// export const getServerSideProps = async ({ req, params }) => {
//   const { user } = await supabase.auth.api.getUserByCookie(req);

//   // const { data: product } = await supabase
//   //   .from("websites")
//   //   .select("*")
//   //   .eq("id", params.id)
//   //   .single();

//   if (!user) {
//     return {
//       redirect: {
//         permanent: false,
//         destination: "/login",
//       },
//       props: {},
//     };
//   }

//   return {
//     props: {  },
//   };
// };
