import React, { useContext } from 'react'
import {useEffect, useState} from 'react';
import { UserAuthContext } from '../Context/userAuth';
import Header from '../Sections/Header';
import AllBlogs from '../Sections/AllBlogs';

const Home = () => {
  return (
    <div>
      <Header />
      <section className='px-[5rem] py-[1rem] grid grid-cols-[25%_75%] gap-2 '>
        <section className='bg-cyan-500'>
            a
        </section>

        <section className='bg-cyan-500'>
          <div className='bg-red-400 w-full flex '>
            <div className='w-[10rem]  bg-blue-400'>

            </div>

            <div>
              <span className='flex gap-2 p-3 flex-col mb-6'>
                <div className='flex gap-2 items-center'>
                  <div className='bg-red-500 w-[1.5rem] h-[1.5rem] rounded-full'></div>
                  <p className='text-sm'>By Username</p>
                </div>
               
                <h1>THis is the title</h1>
                <p>THis is the description</p>
                <p>
                  <span>Likes</span>
                  <span>Comments</span>
                </p>
              </span>
            </div>
          </div>
        </section>
      </section>
      
    </div>
  )
}

export default Home