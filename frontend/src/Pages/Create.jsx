import React, { useContext } from 'react'
import {useEffect, useState} from 'react';
import { UserAuthContext } from '../Context/userAuth';
import Header from '../Sections/Header';

const Create = () => {
  const { userId, username } = useContext(UserAuthContext);

  const [mainTitle, setMainTitle] = useState('');
  const [components, setComponents] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);  // To show the image preview

  const addComponent = (type) => {
    setComponents([...components, { type, content: '' }]);
  };

  const updateContent = (index, newContent) => {
    const updatedComponents = [...components];
    updatedComponents[index].content = newContent;
    setComponents(updatedComponents);
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    const updatedComponents = [...components];
    updatedComponents[index].content = file;  // Save the file object
    setComponents(updatedComponents);

    // Show image preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);  // Set the preview
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submit clicked');

    // Prepare form data for uploading
    const formData = new FormData();
    formData.append('title', mainTitle);
    formData.append('author', username);
    formData.append('userId', userId);
    formData.append('content', JSON.stringify(components));

    // Append image if available
    if (imagePreview) {
      const imageComponent = components.find((component) => component.type === 'image');
      if (imageComponent && imageComponent.content) {
        formData.append('image', imageComponent.content);  // Attach the image file
      }
    }

    // Send POST request
    const response = await fetch('http://localhost:5000/api/addblog', {
      method: 'POST',
      body: formData,  // Send form data including image
    });

    const data = await response.json();
    console.log(data);
  };

  return (
    <div>
      <Header />
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
                <textarea
                  key={index}
                  placeholder="Enter text here..."
                  className="w-full p-2 mb-4 border rounded-md focus:outline-none"
                  value={component.content}
                  onChange={(e) => updateContent(index, e.target.value)}
                />
              );
            } else if (component.type === 'image') {
              return (
                <div key={index} className="mb-4">
                  <input
                    type="file"
                    className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:border-0 file:text-white file:bg-blue-600 hover:file:bg-blue-700"
                    onChange={(e) => handleImageChange(e, index)}
                  />
                  {/* Display image preview */}
                  {imagePreview && <img src={imagePreview} alt="Image Preview" className="mt-4 w-full h-auto" />}
                </div>
              );
            } else if (component.type === 'title') {
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
            return null;
          })}

          {/* Add Component Section */}
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
  );
};

export default Create;
