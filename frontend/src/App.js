import logo from './logo.svg';
import {useState} from 'react';
import './App.css';

function App() {
  const [components, setComponents] = useState([]);

  // Function to add a new component
  const addComponent = (type) => {
    setComponents([...components, { type, content: "" }]);
  };

  // Function to update content of a component
  const updateContent = (index, newContent) => {
    const updatedComponents = [...components];
    updatedComponents[index].content = newContent;
    setComponents(updatedComponents);
  };
  return (
    <div className="p-8 bg-white rounded-md shadow-md">
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

    {/* Add Button */}
    <div className="flex justify-center mt-4">
      <button
        className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        onClick={() => {
          // Open a dropdown or modal to choose the component type
          const type = window.prompt("Enter component type: text, image, title");
          if (type) addComponent(type);
        }}
      >
        +
      </button>
    </div>
  </div>
  );
}

export default App;
