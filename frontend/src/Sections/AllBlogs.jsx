
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
    {blogs.map((blog) => (
      <div key={blog._id} className="bg-red-400 w-full flex mb-4">
        <div className="w-[10rem] bg-blue-400">
          {/* Loop through the blog content and display images */}
          {blog.content.map((item, index) => (
            item.type === 'image' ? (
            <div>
              <img
                key={index}
                src={`http://localhost:5000/uploads/${item.content}`}
                alt={item.filename}
                className="w-full h-auto"
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

            <h1>{blog.title}</h1>
            <p>This is a description</p>
            <p>
              <span>Likes: {blog.likes}</span>
              <span> Comments: {blog.comments.length}</span>
            </p>
          </span>
        </div>
      </div>
    ))}
  </div>
  )
}

export default AllBlogs