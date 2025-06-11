'use client'

import React from 'react'
import useFileStore from '@/zustand/useFileStore'
import { RemotionRoot } from '@/components/remotion/Root'



const page = () => {

  const { currentFile } = useFileStore()

  return (
    <div className='w-full relative py-[150px] text-[#323232]'>
      <div
        className="w-full text-[70px] text-center leading-[1.1] bg-gradient-to-r from-[#4F80FF] to-[#B86EFF] text-transparent bg-clip-text"
      >
        Dashboard
      </div>

      <div className='w-full  bg-red-500'>

        <div className='w-full  relative py-[150px] bg-red-500'>
          {/* {currentFile ?
            <div>
              {currentFile.scenes.map((scene: any, index: any) => (
                <div key={index}>
                  <div>{scene?.text}</div>
                  <img src={scene?.image} className="w-[360px] h-[640px] object-cover rounded-lg shadow-lg" />
                </div>
              ))}
            </div>
            : (
              <p className='text-white text-center'>Loading image...</p>
            )} */}

          {currentFile && <RemotionRoot />}
        </div>

      </div>

    </div >
  )
}

export default page