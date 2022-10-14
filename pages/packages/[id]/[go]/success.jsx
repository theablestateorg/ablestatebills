import React from 'react'
import PackageNav from "../../../../components/PackageNav";
import HelpDeck from "../../../../components/HelpDeck";
import Checkmark from '../../../../components/Checkmark';

function success() {
  return (
    <div>
      <PackageNav />
      <HelpDeck />
      <main
        className={`pt-[70px] mx-5 md:mx-20 relative pb-6 min-h-screen gap-10 flex justify-center items-center`}
      >
        <div className='p-10'>
          <Checkmark />
          <h1 className='text-3xl font-bold'>Successful</h1>
        </div>
        
      </main>
    </div>
  )
}

export default success