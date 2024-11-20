import React from 'react';
import { useEffect , useState} from 'react';

const AllBlogs = () => {
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
          <div>
            <img src="" alt="" />
            <div>
              <p></p>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default AllBlogs