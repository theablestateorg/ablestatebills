import { Formik, Form } from "formik";
import { motion } from "framer-motion";
import { dropIn } from "../../utils/dropIn";
import { CKAirtel, CKMtn } from "../../components/ck";
import { UG } from "../../components/react-flags";
import { currencyFormatter } from "../../utils/currencyFormatter";
import { AiOutlineCloseCircle } from "react-icons/ai";
import axios from "axios";

function RenewModal({
  product,
  paymentMethod,
  setPaymentMethod,
  account_balance,
  renewPeriod,
  setPopRenew,
  setRenewPeriod,
  complete,
  setComplete,
  handleRenew,
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setPopRenew(false)}
      className={`bg-black z-20 bg-opacity-40 w-screen min-h-screen fixed top-0 left-0 right-0 flex justify-center items-center`}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="relative bg-white dark:bg-dark-bg max-h-screen overflow-auto dark:text-secondary-text py-2 md:p-10  rounded-md m-2 sm:mb-5 shadow-md top-50 z-20 w-11/12 md:w-10/12"
      >
        <div className="flex justify-between my-5 border-b-[1px] px-2">
          <h1 className="text-center font-bold text-lg">
            Renew {product.name}
          </h1>
          <span
            className="text-md cursor-pointer"
            onClick={() => {
              setPopRenew(false);
            }}
          >
            <AiOutlineCloseCircle size={22} />
          </span>
        </div>
        <section className="mt-5 px-2">
          <div className="flex gap-2">
            <h3>Choose a Payment Method</h3>
          </div>
          <div className="flex flex-wrap gap-5 mt-2 md:ml-10 px-2">
            <span
              className={`bg-[#ca3011] px-2 w-[120px] md:w-[150px] flex justify-around items-center py-1 md:py-2 gap-2 cursor-pointer rounded-sm ${
                paymentMethod === 0 && "outline outline-2 outline-black"
              }`}
              onClick={() => setPaymentMethod(0)}
            >
              {/* <CKMtn /> */}
              <span className="font-bold text-white text-sm">
                <p>ShineAfrika</p>
                <p>Wallet</p>
              </span>
            </span>
            <span
              className={`bg-[#FFCC00] px-2 w-[120px] md:w-[150px] py-1 md:py-2 flex justify-around items-center gap-2 cursor-pointer rounded-sm ${
                paymentMethod === 1 && "outline outline-2 outline-black"
              }`}
              onClick={() => setPaymentMethod(1)}
            >
              <CKMtn />
              <span className="font-bold text-sm">
                <p>MTN</p>
                <p>MoMo</p>
              </span>
            </span>
            <span
              className={`bg-[#FF0000] p-2 text-white w-[120px] md:w-[150px] py-1 md:py-2 flex justify-around cursor-pointer rounded-sm ${
                paymentMethod === 2 && "outline outline-2 outline-black"
              }`}
              onClick={() => setPaymentMethod(2)}
            >
              <CKAirtel />
              <span className="font-medium text-sm">
                <p>Airtel</p>
                <p>Money</p>
              </span>
            </span>
          </div>
        </section>
        <section className="mt-2">
          {[1, 2].includes(paymentMethod) && (
            <div className="flex gap-2">
              <h3>Get Secret Code</h3>
            </div>
          )}

          <div className="md:ml-10 px-4">
            {paymentMethod === 0 && (
              <>
                <Formik initialValues={{ amount: product.product_price }}>
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
                        onSubmit={(event) =>
                          handleRenew(event, values, resetForm)
                        }
                        className="mt-5"
                        name="loginForm"
                      >
                        <div className="flex gap-4">
                          <label htmlFor="">Current Balance:</label>
                          <label htmlFor="" className="font-bold">
                            <span className="text-sm">UGX</span>{" "}
                            {currencyFormatter(account_balance)}
                          </label>
                        </div>
                        <div className="select-none">
                          <div className="flex flex-col my-2">
                            <label htmlFor="">Extension Period (years)</label>
                            <div className="flex items-center py-2">
                              <span
                                className="px-3 py-1 rounded-sm mr-2 bg-gray-200 outline outline-1 outline-gray-400 cursor-pointer"
                                onClick={() => {
                                  if (renewPeriod > 1) {
                                    setRenewPeriod((prev) => prev - 1);
                                  }
                                }}
                              >
                                -
                              </span>
                              <input
                                type="text"
                                name="renewPeriod"
                                id="renewPeriod"
                                className="outline outline-1 px-2 py-1 bg-transparent rounded-sm"
                                value={renewPeriod}
                              />
                              <span
                                className="px-3 py-1 rounded-sm ml-2 bg-gray-200 outline outline-1 outline-gray-400 cursor-pointer"
                                onClick={() => {
                                  if (renewPeriod < 5) {
                                    setRenewPeriod((prev) => prev + 1);
                                  }
                                }}
                              >
                                +
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-col my-2">
                            <label htmlFor="amount">Amount To Pay</label>
                            <input
                              type="text"
                              name="amount"
                              id="amount"
                              className="outline outline-1 px-2 py-1 bg-transparent rounded-sm"
                              placeholder="Enter Amount"
                              onChange={handleChange("amount")}
                              value={currencyFormatter(
                                values.amount * renewPeriod
                              )}
                            />
                          </div>
                          <div className="">
                            <button
                              type="submit"
                              className="text-white bg-[#121212] px-2 py-1 rounded-sm outline outline-1 outline-black hover:bg-transparent hover:text-black mt-4 w-full mb-2"
                            >
                              Make Payment
                            </button>
                          </div>
                        </div>
                      </Form>
                    );
                  }}
                </Formik>
              </>
            )}
            {paymentMethod === 1 && (
              <>
                <p>MTN MoMo</p>
                <p>
                  Enter your mtn phone number to receive a{" "}
                  <span className="font-bold">*secret code*</span> then press
                  next to continue
                </p>

                <div className="flex flex-col my-2">
                  <label htmlFor="number">MTN phone Number</label>
                  <div className="outline outline-1 flex pl-2 gap-2">
                    <div className="flex gap-1 items-center">
                      <UG />
                      +256
                    </div>
                    <input
                      type="text"
                      name=""
                      id="number"
                      className="outline outline-1 px-2 py-1 bg-transparent flex-grow"
                      placeholder="771234567"
                      onChange={({ target }) => setPhoneNumber(target.value)}
                      required
                    />
                  </div>
                </div>
              </>
            )}
            {paymentMethod === 2 && (
              <>
                <p>Airtel Money</p>
                <p>
                  You will be required to inital the withdraw from you airtel
                  money to get a{" "}
                  <span className="font-bold">*secret code*</span> then press
                  next to continue
                </p>
              </>
            )}
            {paymentMethod != null && paymentMethod != 0 && (
              <div className="flex justify-end">
                <button
                  className="text-white bg-[#121212] px-2 py-1"
                  onClick={async () => {
                    if (paymentMethod === 1) {
                      const phoneno =
                        /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/;
                      if (phoneNumber.match(phoneno)) {
                        const results = await axios
                          .post("/api/send-token", {
                            phone: `256${phoneNumber}`,
                          })
                          .then((res) => setComplete(true))
                          .catch((error) => console.log(error.message));
                        setComplete(true);
                      }
                    } else {
                      setComplete(true);
                    }
                  }}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </section>
        <Formik initialValues={{ amount: "", phone: "", secret_code: "" }}>
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
                onSubmit={(event) => handleSubmit(event, values, resetForm)}
                className="mt-2"
              >
                {["1", "2"].includes(paymentMethod) && (
                  <div className="flex gap-2">
                    <h3>Complete Payment</h3>
                  </div>
                )}

                {paymentMethod != null &&
                  paymentMethod !== 0 &&
                  complete != null && (
                    <div className="ml-10">
                      <div className="flex flex-col my-2">
                        <label htmlFor="number">Amount</label>
                        <label htmlFor="number" className="text-lg font-bold">
                          <span className="font-medium">ugx </span>
                          {product.product_price}
                        </label>
                      </div>
                      <div className="flex flex-col my-2">
                        <label htmlFor="secret_code">Secret Code</label>
                        <input
                          type="text"
                          name="secret_code"
                          id="secret_code"
                          className="outline outline-1 px-2 py-1 bg-transparent rounded-sm"
                          placeholder="Enter secret code"
                          onChange={handleChange("secret_code")}
                        />
                      </div>
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="bg-[#121212] text-white p-1 px-2 mt-5"
                        >
                          Make Payment
                        </button>
                      </div>
                    </div>
                  )}
              </Form>
            );
          }}
        </Formik>
      </motion.div>
    </motion.div>
  );
}

export default RenewModal;
