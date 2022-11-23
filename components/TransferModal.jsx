import { Formik, Form } from "formik";
import { motion } from "framer-motion";
import { dropIn } from "../utils/dropIn";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import { amountValidationSchema } from "../utils/validation";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";

function TransferModal({ setTransferPop, account_balance }) {
  const [customers, setCustomers] = useState([]);
  const [selected, setSelected] = useState(false);
  const [cookie] = useCookies(["user"]);
  const [customerId, setCustomerId] = useState(null);
  useEffect(() => {
    getCustomers();
  }, [selected]);

  const getCustomers = async () => {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .order("first_name", { ascending: true });
    setCustomers(data);
  };

  const handleSubmit = async (event, values, resetForm) => {
    event.preventDefault();
    const { amount, transfer_to } = values;
    if (amount < 1000) {
      toast.error(`Please enter an amount more than 10,000`, {
        position: "top-center",
      });
    } else if (account_balance < amount) {
      toast.error(`insufficient balance`, {
        position: "top-center",
      });
    } else {
      const { data, error } = await supabase
        .from("accounts")
        .update({
          account_balance: +account_balance - +amount,
        })
        .eq("id", cookie.user?.user?.id);

      if (data) {
        const { data: transfered, error } = await supabase
          .from("accounts")
          .select("id, account_balance")
          .eq("id", customerId)
          .single();

        if (transfered?.account_balance) {
          const { data, error } = await supabase
            .from("accounts")
            .update({
              account_balance: +transfered?.account_balance + +amount,
            })
            .eq("id", transfered.id);

          console.log(transfered.id);
          toast.success(`Transaction was successful`, {
            position: "top-center",
          });
        }
      }
    }

    resetForm({
      amount: "",
      transfer_to: "",
    });

    setTransferPop(false);
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setTransferPop(false)}
      className={`bg-black z-20 bg-opacity-40 w-screen min-h-screen fixed top-0 left-0 right-0 flex justify-center items-center`}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="relative bg-white dark:bg-dark-bg max-h-screen overflow-auto dark:text-secondary-text py-2 md:p-10  rounded-sm m-2 sm:mb-5 shadow-md top-50 z-20 w-11/12 md:w-10/12"
      >
        <div className="flex justify-between my-5 border-b-[1px] px-2">
          <h1 className="text-center font-bold text-lg">Make Transfer</h1>
          <span
            className="text-md cursor-pointer"
            onClick={() => {
              setTransferPop(false);
            }}
          >
            <AiOutlineCloseCircle size={22} />
          </span>
        </div>
        <Formik
          initialValues={{ amount: "", transfer_to: "" }}
          validationSchema={amountValidationSchema}
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
            setFieldValue,
          }) => {
            return (
              <Form
                onSubmit={(event) => handleSubmit(event, values, resetForm)}
                className="mt-5 px-2"
              >
                <div className="flex flex-col my-2">
                  <label htmlFor="secret_code">Enter amount</label>
                  <input
                    type="text"
                    name="amount"
                    id="amount"
                    className="outline outline-1 px-2 py-1 bg-transparent rounded-sm"
                    placeholder="Enter amount"
                    onChange={handleChange("amount")}
                    value={values.amount}
                    required
                  />
                </div>
                <div className="flex flex-col my-2">
                  <label htmlFor="secret_code">Transfer to</label>
                  <select
                    name="transfer_to"
                    id="transfer_to"
                    className="py-2 px-2 bg-transparent  outline outline-1 outline-[#121212] rounded-sm w-full"
                    onChange={async (e) => {
                      setCustomerId(e.target.value);
                      setFieldValue("transfer_to", e.target.value);
                      const { data, error } = await supabase
                        .from("profiles")
                        .select("email, contact_number")
                        .eq("id", e.target.value)
                        .single();
                      setSelected(!selected);
                    }}
                    onBlur={handleBlur("transfer_to")}
                    value={values.transfer_to}
                    required
                  >
                    <option value="">Select Customer</option>
                    {customers &&
                      customers.map((customer, index) => (
                        <option value={customer.id} key={index}>
                          {customer.first_name + " " + customer.last_name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-[#121212] text-white p-1 px-2 mt-5 rounded-sm"
                  >
                    Transfer
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </motion.div>
    </motion.div>
  );
}

export default TransferModal;
