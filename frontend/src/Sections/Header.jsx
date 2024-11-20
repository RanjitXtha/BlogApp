import React from 'react'
import { IoSearch } from "react-icons/io5";

const Header = () => {
  return (
    <div className='w-full px-[3rem] py-[1rem] grid grid-cols-[10%_1fr_16%] items-center'>
        <div className='font-extrabold text-2xl  '>Blogger</div>
        <div className='flex h-full '>
            <span className='h-full py-[0.3rem] pl-[0.7rem] pr-[0.3rem] text-2xl rounded-tl-full rounded-bl-full bg-bgColor flex items-center'><IoSearch/></span>
            <input className='h-full py-[0.3rem] px-[0.5rem] rounded-tr-full rounded-br-full bg-bgColor focus:outline-none' type="search" placeholder='Search' />
        </div>
        <div className='flex justify-end  items-center'>
            <div className='flex gap-3 items-center rounded-full bg-bgColor px-[1rem] py-[0.2rem]'>
                <p>Username</p>
                <div className='bg-cyan-500 rounded-full w-10 h-10'>

                </div>
            </div>
        </div>
    </div>
  )
}

export default Header