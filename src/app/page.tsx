
import React from 'react'
import Link from 'next/link'

const page = () => {
  return (
    <div className='w-full h-[100vh] relative py-[200px] bg-white text-[#323232]'>

      <div
        className="w-full text-[70px] text-center leading-[1.1] bg-gradient-to-r from-[#4F80FF] to-[#B86EFF] text-transparent bg-clip-text"
      >
        Create Pro level<br />
        videos in the Blink of AI
      </div>

      <div className='text-[22px] w-full text-center'>
        Make short videos faster. AI-powered video creation
      </div>

      <div className='w-full flex items-center justify-center my-[50px]'>
        <Link href='/create-new' className='py-[25px] px-[50px] rounded-full bg-[#7F81FF] cursor-pointer text-white'>Start For Free</Link>
      </div>


    </div>
  )
}

export default page