import React from 'react'

import Header from '../Sections/Header';
import AllBlogs from '../Sections/AllBlogs'

const Home = () => {
  return (
    <div>
      <Header />
      <section className='px-[5rem] py-[1rem] grid grid-cols-[25%_75%] gap-2 '>
        <section className='bg-cyan-500'>
            a
        </section>

        <section className='bg-cyan-500'>
            <AllBlogs />
        </section>
      </section>
      
    </div>
  )
}

export default Home