import { BiCheckCircle } from 'react-icons/bi'

function Starter({pack}) {
  return (
    <div className="w-72 text-center">
      <header className="bg-[#CA3011] text-white py-3">
        <h1 className="font-bold text-2xl text-center">{pack}</h1>
        <p className="text-center">Take your business online</p>
      </header>
      <section className="bg-gray-200">
        <h1 className="py-5">
          <span className="text-sm font-light">UGX</span>
          <span className="text-xl font-bold mx-2">175,000</span>
          <span className="font-medium">Annually</span>
        </h1>

        <div className='flex gap-2 items-center justify-start py-3 px-3 mx-3 border-b-[1px] border-gray-400'>
          <BiCheckCircle size={20} />
          <p>2GB Storage</p>
        </div>

        <div className='flex gap-2 items-center justify-start py-3 px-3 mx-3 border-b-[1px] border-gray-400'>
          <BiCheckCircle size={20} />
          <p>10GB bandwidith</p>
        </div>

        <div className='flex gap-2 items-center justify-start py-3 px-3 mx-3 border-b-[1px] border-gray-400'>
          <BiCheckCircle size={20} />
          <p>99.9% uptime</p>
        </div>

        <div className='flex gap-2 items-center justify-start py-3 px-3 mx-3 border-b-[1px] border-gray-400'>
          <BiCheckCircle size={20} />
          <p>Unlimited E-mails</p>
        </div>

        <div className='flex gap-2 items-center justify-start py-3 px-3 mx-3 '>
          <BiCheckCircle size={20} />
          <p>	Free .com/.org domain </p>
        </div>
        
      </section>
    </div>
  );
}

export default Starter;
