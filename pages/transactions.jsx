import React from "react";
import AccountLayout from "../components/AccountLayout";
import { parseCookies } from "../utils/parseCookies";
import { supabase } from "../utils/supabase";
import moment from "moment/moment";
import { currencyFormatter } from "../utils/currencyFormatter";

function transactions({ transactions }) {
  return (
    <AccountLayout>
      <section className="my-5 flex-grow flex flex-col md:px-8">
        <h1 className="font-bold text-lg border-b-2 p-2 mb-2">Transactions</h1>
        <div className="outline outline-1 outline-[#e5e7eb] mb-5 overflow-x-scroll select-none mt-2">
          <table className="bg-white w-full table-auto p-10 select-none">
            <thead>
              <tr className="border-b bg-[#f7f7f7] text-[#555b6d]">
                <th className="py-2 text-left pl-3 font-light">
                  <div className="flex items-center">Created At</div>
                </th>
                <th className="py-2 text-left pl-3 font-light">
                  <div className="flex items-center">Amount (UGX)</div>
                </th>
                <th className="py-2 text-left pl-3 font-light">
                  <div className="flex items-center">Type</div>
                </th>
                <th className="py-2 text-left pl-3 font-light">
                  <div className="flex items-center">Status</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions &&
                transactions.map((transaction, index) => (
                  <tr className="border-b" key={index}>
                    <td className="py-2 text-left pl-3">{moment(new Date(transaction.created_at)).format("DD-MM-YYYY")}</td>
                    <td className="py-2 text-left pl-3">{currencyFormatter(transaction.amount)}</td>
                    <td className="py-2 text-left pl-3">{transaction.transaction_type}</td>
                    <td className="py-2 text-left pl-3">{transaction.status}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>
    </AccountLayout>
  );
}

export default transactions;

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

  const { data: transactions } = await supabase
    .from("transactions")
    .select("*")
    .eq("actor_id", JSON.parse(person.user).user.id)
    .order("created_at", { ascending: false });

  return {
    props: { transactions },
  };
};
