import React, { useContext } from 'react'
import { IoSearch } from "react-icons/io5";
import { UserAuthContext } from '../Context/userAuth';
const Header = () => {
  const {username , profilePic} = useContext(UserAuthContext);
  console.log(profilePic)
  return (
    <div className='w-full px-[3rem] py-[0.5rem] grid grid-cols-[10%_1fr_16%] items-center'>
        <div className='font-extrabold text-xl  '>Blogger</div>
        <div className='flex h-full '>
            <span className='h-full py-[0.3rem] pl-[0.7rem] pr-[0.3rem] text-xl rounded-tl-full rounded-bl-full bg-bgColor flex items-center'><IoSearch/></span>
            <input className='h-full py-[0.3rem] px-[0.3rem] rounded-tr-full rounded-br-full bg-bgColor focus:outline-none' type="search" placeholder='Search' />
        </div>
        <div className='flex justify-end  items-center'>
            <div className='flex gap-3 items-center rounded-full bg-bgColor px-[1rem] py-[0.2rem]'>
                <p>{username}</p>
                <div className='bg-cyan-500 rounded-full w-8 h-8'>
                  <img src={`http://localhost:5000/uploads/${profilePic}`} alt={username} />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Header