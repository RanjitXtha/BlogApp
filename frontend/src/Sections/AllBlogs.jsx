
import { useEffect , useState} from 'react';
import React from 'react'
import { AiOutlineLike } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";

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
    {blogs.map((blog) => (
      <div key={blog._id} className="bg-white w-full flex gap-6 border-b-[1px] border-gray-200">
        <div className="w-[10rem] my-auto">
          {/* Loop through the blog content and display images */}
          {blog.content.map((item, index) => (
            item.type === 'image' ? (
            <div className='w-full h-[6rem] bg-red-500'>
               <img
                key={index}
                src={`http://localhost:5000/uploads/${item.content}`}
                alt={item.filename}
                className="w-full object-cover"
              />
              </div>
            ) : null
          ))}
        </div>

        <div className="p-3">
          <span className="flex gap-2 flex-col mb-6">
            <div className="flex gap-2 items-center">
              <div className="bg-red-500 w-[1.5rem] h-[1.5rem] rounded-full"></div>
              <p className="text-sm">By {blog.author}</p>
            </div>

            <h1 className='text-2xl font-bold'>{blog.title}</h1>
            <p>This is a description</p>
            <p className='flex gap-6'>
              <span className='flex items-center'><AiOutlineLike className='mr-2 text-2xl' />{blog.likes}</span>
              <span className='flex items-center'>< FaRegCommentAlt className='mr-2 text-lg'/> {blog.comments.length}</span>
            </p>
          </span>
        </div>
      </div>
    ))}
  </div>
  )
}

export default AllBlogs