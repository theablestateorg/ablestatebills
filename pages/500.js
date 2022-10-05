import React from 'react'
import { CK404 } from '../components/ck'

function ServerError() {
  return (
    <main className='flex flex-col h-screen w-screen justify-center items-center'>
      <i className='absolute w-screen h-screen overflow-hidden'>
        <CK404 />
      </i>

      <div className="flex gap-1">
        <h1 className='font-black text-9xl'>500</h1>
      </div>
      <h1 className='font-medium text-3xl'>Server Error</h1>
      <h4 className='font-medium'>Something went wrong</h4>
      <h4 className='w-64 text-gray-500'>
        we suggest that you go back to the homepage while we fix the problem.
      </h4>
      <button className='outline outline-1 outline-black rounded-full px-3 py-2 mt-10'>Back to home</button>
    </main>
  )
}

export default ServerError