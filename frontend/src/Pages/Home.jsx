import React, { useContext } from 'react'
import {useEffect, useState} from 'react';
import { UserAuthContext } from '../Context/userAuth';

const Home = () => {
    const {userId,username} = useContext(UserAuthContext);
    
    const [mainTitle , setMainTitle] = useState('');
    const [components, setComponents] = useState([]);
  
  
    const addComponent = (type) => {
      setComponents([...components, { type, content: "" }]);
    };
  
  
    const updateContent = (index, newContent) => {
      const updatedComponents = [...components];
      updatedComponents[index].content = newContent;
      setComponents(updatedComponents);
    };
    
  
    const handleSubmit = async(e)=>{
      e.preventDefault();
      console.log('submit cliked');
      const Data = {
        title:mainTitle,
        author:username,
        authorId:userId,
        content: components,
      }
      const response = await fetch('http://localhost:5000/api/addblog',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(Data),
      })
  
      const data = await response.json();
      console.log(data);
    }
  
    useEffect(()=>{
      const getBlogs =async()=>{
        const response = await fetch('http://localhost:5000/api/blogs');
        const data = response.json();
      }
      getBlogs();
    },[])
  
    return (
      <div>
        <h1>{username + userId}</h1>
        <form onSubmit={handleSubmit}>
          <div className="p-8 bg-white rounded-md shadow-md">
            <input type="text" onChange={(e)=>setMainTitle(e.target.value)} placeholder="Enter title here..." className="w-full p-2 mb-4 border rounded-md focus:outline-none" />
            {components.map((component, index) => {
              if (component.type === "text") {
                return (
                  <textarea
                    key={index}
                    placeholder="Enter text here..."
                    className="w-full p-2 mb-4 border rounded-md focus:outline-none"
                    value={component.content}
                    onChange={(e) => updateContent(index, e.target.value)}
                  />
                );
              } else if (component.type === "image") {
                return (
                  <div key={index} className="mb-4">
                    <input
                      type="file"
                      className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:border-0 file:text-white file:bg-blue-600 hover:file:bg-blue-700"
                      onChange={(e) => updateContent(index, e.target.files[0])}
                    />
                    {/* Optionally, add image preview here */}
                  </div>
                );
              } else if (component.type === "title") {
                return (
                  <input
                    key={index}
                    type="text"
                    placeholder="Enter title here..."
                    className="w-full p-2 mb-4 border rounded-md focus:outline-none"
                    value={component.content}
                    onChange={(e) => updateContent(index, e.target.value)}
                  />
                );
              }
              // Add more component types as needed
              return null;
            })}
  
            {/* Add Component Section */}
            <div className="flex justify-center mt-4">
              <select
                className="px-4 py-2 border rounded-md"
                onChange={(e) => {
                  const type = e.target.value;
                  if (type) addComponent(type);
                }}
              >
                <option value="">Select component to add</option>
                <option value="text">Text</option>
                <option value="image">Image</option>
                <option value="title">Title</option>
                {/* Add more options as needed */}
              </select>
            </div>
  
            <button type="submit">Submit</button>
          </div>
        </form>
  
        </div>
    )
}

export default Home