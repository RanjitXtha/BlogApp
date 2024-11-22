
import { useEffect , useState} from 'react';
import React from 'react'


const AllBlogs = () => {
  console.log("run")
  const [blogs , setBlogs] = useState([]);
  useEffect(()=>{
    const getBlogs =async()=>{
      const response = await fetch('http://localhost:5000/api/getallblogs');
      const data = await response.json();
      setBlogs(data.blogs)
      console.log(data.blogs)
    }
    getBlogs();
  },[])
  return (
    <div>
      {
        blogs.map((blog)=>(
          <div className='bg-red-400 w-full flex '>
            <div className='w-[10rem]  bg-blue-400'>
              <img src={`http://localhost:5000/uploads/${blog.author}`} alt="" />
            </div>

            <div>
              <span className='flex gap-2 p-3 flex-col mb-6'>
                <div className='flex gap-2 items-center'>
                  <div className='bg-red-500 w-[1.5rem] h-[1.5rem] rounded-full'></div>
                  <p className='text-sm'>By {blog.author}</p>
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
        ))
      }
    </div>
  )
}

export default AllBlogs