import { useState } from "react";

const AddTags = ({tags , setTags}) => {

  const [input, setInput] = useState("");

  const addTag = () => {
    if (input && !tags.includes(input)) {
      setTags([...tags, input.trim()]);
      setInput(""); // Clear input
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div>
      <div className="tag-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a tag"
        />
        <button onClick={addTag}>Add</button>
      </div>

      <div className="tags">
        {tags.map((tag, index) => (
          <span key={index} className="tag">
            {tag} <button onClick={() => removeTag(tag)}>x</button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default AddTags;