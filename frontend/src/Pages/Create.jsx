import React, { useContext } from 'react'
import {useEffect, useState} from 'react';
import { UserAuthContext } from '../Context/userAuth';
import Header from '../Sections/Header';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const navigate = useNavigate();
    const { userId, username } = useContext(UserAuthContext);

    const [mainTitle, setMainTitle] = useState('');
    const [components, setComponents] = useState([]);
    const [imagePreview, setImagePreview] = useState(null); 

    const addComponent = (type) => {
        setComponents([...components, { type, content: '' }]);
        console.log(components)
      };

      const updateContent = (index, newContent) => {
        const updatedComponents = [...components];
        updatedComponents[index].content = newContent;
        setComponents(updatedComponents);
      };

      const handleImageChange = (e, index) => {
        const file = e.target.files[0];
        if (!file) return;
      
        const updatedComponents = [...components];
        updatedComponents[index].content = file;  
        setComponents(updatedComponents);
      
        console.log('Updated components:', updatedComponents);
      };


      const handleSubmit = async (e) => {
        e.preventDefault();
        try{

        const formData = new FormData();
    
        formData.append('title', mainTitle);
        formData.append('author', username);
        formData.append('userId', userId);
        formData.append("content", JSON.stringify(components));

        components.forEach((component, index) => {
          if (component.type === "image") {
            formData.append(`image-${index}`, component.content); // Append File objects
          }
        });

        //console.log(formData)
        
        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
          }
      
        const response = await fetch('http://localhost:5000/api/addblog', {
          method: 'POST',
          body: formData,  
        });
    
        const data = await response.json();
        if(response.ok){
          navigate('/');
        }
      }catch(err){
        console.log(err)
      }
      };

      const deleteComponent = (index)=>{
        const filteredComponent = components.filter((_,i)=>i !== index)
        setComponents(filteredComponent);
      }


  return (
    <div>
     
      
        <form onSubmit={handleSubmit}>
        <div className="p-8 bg-white rounded-md shadow-md px-[5rem]">
          <input
            type="text"
            onChange={(e) => setMainTitle(e.target.value)}
            placeholder="Title..."
            className="w-full p-3 text-2xl mb-4 border rounded-md focus:outline-none"
          />
          {components.map((component, index) => {
            if (component.type === 'text') {
              return (
                <div>
                    <textarea
                  key={index}
                  placeholder="Enter text here..."
                  className="w-full p-2 mb-4 border rounded-md focus:outline-none"
                  value={component.content}
                  onChange={(e) => updateContent(index, e.target.value)}
                />  
                <button onClick={()=>deleteComponent(index)}>X</button>
                </div>
                
              );
            } else if (component.type === 'image') {
              return (
                <div key={index} className="mb-4">
                  <input
                    type="file"
                    className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:border-0 file:text-white file:bg-blue-600 hover:file:bg-blue-700"
                    onChange={(e) => handleImageChange(e, index)}
                  />
          
                <button className='' onClick={()=>deleteComponent(index)}>X</button>
                </div>
              );
            } else if (component.type === 'title') {
              return (
                <div>
                  <input
                    key={index}
                    type="text"
                    placeholder="Enter title here..."
                    className="w-full p-2 mb-4 border rounded-md focus:outline-none"
                    value={component.content}
                    onChange={(e) => updateContent(index, e.target.value)}
                  />
                  <button onClick={()=>deleteComponent(index)}>X</button>
                </div>
              );
            }
            return null;
          })
          }

          <div className="mt-4">
            <select
              className="p-2 border rounded-lg"
              onChange={(e) => {
                const type = e.target.value;
                if (type) addComponent(type);
              }}
            >
              <option value="">+</option>
              <option value="text">Text</option>
              <option value="image">Image</option>
              <option value="title">Title</option>
            </select>
          </div>

          <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default Create;