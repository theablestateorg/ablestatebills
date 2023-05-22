import Router, { useRouter } from "next/router";

function FreePackage({ selected }) {
  const router = useRouter();

  return (
    <div
      className={`w-72 text-center rounded-2xl bg-white shadow-lg ${
        selected && "outline outline-[#CA3011] shadow-2xl"
      }`}
    >
      <header className=" py-3">
        <h1 className="font-bold text-2xl text-center text-[#CA3011]">Free</h1>
        <p className="text-center text-gray-600">Create your home on the web</p>

        <h1 className="py-5 flex flex-col justify-center items-center">
          <div className="flex justify-center items-center">
            <span className="text-sm font-medium">UGX</span>
            <span className="text-4xl font-bold mx-2">0</span>
          </div>
          <h5 className="font-medium">Yearly</h5>
        </h1>
      </header>

      <section className="px-8 flex flex-col items-center">
        <div className="border-b-[1px] border-gray-400 w-full py-2 mb-2">
          <p>200MB Storage</p>
        </div>
        <div className="border-b-[1px] border-gray-400 w-full py-2 mb-2">
          <p>1 GB bandwidith</p>
        </div>
        <div className="border-b-[1px] border-gray-400 w-full py-2 mb-2">
          <p>99.9% uptime</p>
        </div>
        <div className="w-full py-2 mb-3">
          <p>Free sub-domain name</p>
        </div>
        <div className="w-full py-2 mb-3">
          <p> </p>
        </div>
        <div className="w-full py-2 mb-3">
          <p> </p>
        </div>
        <div className="w-full py-2 mb-3">
          {selected ? (
            <p className="py-2 px-5">You are Ordering</p>
          ) : (
            <button
              className="bg-[#CA3011] text-white py-2 px-5 font-bold rounded-full"
              onClick={() => {
                Router.push(`/packages/free/0/?domain=${router.query.domain}`);
              }}
            >
              Order
            </button>
          )}
        </div>
      </section>
    </div>
  );
}

export default FreePackage;
