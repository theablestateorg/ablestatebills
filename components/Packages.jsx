import React from 'react'
import Starter from './Starter'
import Stablizer from './Stablizer'
import Scaler from './Scaler'

function Packages({myPackage}) {
  
  return (
      <main className='flex gap-5 flex-wrap items-center justify-center'>
        <Starter selected={myPackage && myPackage.toLowerCase() === "starter"} />
        <Scaler selected={myPackage && myPackage.toLowerCase() === "scaler"} />
        <Stablizer selected={myPackage && myPackage.toLowerCase() === "stablizer"} />
      </main>
  )
}

export default Packages