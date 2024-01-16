import React, { useState, useRef } from 'react';
import './Suggestion.css';

// Import the images directly from the 'images' folder
import johnIcon from './images/john_icon.png';
import janeIcon from './images/jane_icon.png';
import bobIcon from './images/bob_icon.png';
import aliceIcon from './images/alice_icon.png';
import charlieIcon from './images/charlie_icon.png';
import davidIcon from './images/david_icon.png';
import emmaIcon from './images/emma_icon.png';
import frankIcon from './images/frank_icon.png';
import harryIcon from './images/harry_icon.png';

const Suggestion = () => {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedNames, setSelectedNames] = useState([]);
  const inputRef = useRef(null);

  const suggestionData = [
    { name: 'John Doe', email: 'john.doe@example.com', iconFileName: 'john_icon.png', icon: johnIcon },
  { name: 'Jane Doe', email: 'jane.doe@example.com', iconFileName: 'jane_icon.png', icon: janeIcon },
  { name: 'Bob Smith', email: 'bob.smith@example.com', iconFileName: 'bob_icon.png', icon: bobIcon },
  { name: 'Alice Johnson', email: 'alice.johnson@example.com', iconFileName: 'alice_icon.png', icon: aliceIcon },
  { name: 'Charlie Brown', email: 'charlie.brown@example.com', iconFileName: 'charlie_icon.png', icon: charlieIcon },
  { name: 'David Williams', email: 'david.williams@example.com', iconFileName: 'david_icon.png', icon: davidIcon },
  { name: 'Emma Davis', email: 'emma.davis@example.com', iconFileName: 'emma_icon.png', icon: emmaIcon },
  { name: 'Frank Miller', email: 'frank.miller@example.com', iconFileName: 'frank_icon.png', icon: frankIcon },
  { name: 'Harry Taylor', email: 'harry.taylor@example.com', iconFileName: 'harry_icon.png', icon: harryIcon }
    // Add more suggestions as needed
  ];

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const getSuggestions = (inputValue) => {
    const inputValueLower = inputValue.toLowerCase();
    return suggestionData.filter(
      (item) => item.name.toLowerCase().includes(inputValueLower) || item.email.toLowerCase().includes(inputValueLower)
    );
  };

  const onSuggestionsFetchRequested = () => {
    setSuggestions(getSuggestions(inputRef.current.innerText));
  };

  const onChange = () => {
    setValue(inputRef.current.innerText);
    onSuggestionsFetchRequested();
  };

  const onSuggestionSelected = (suggestion) => {
    setSelectedNames([...selectedNames, { name: suggestion.name, email: suggestion.email, color: getRandomColor(), icon: suggestion.icon }]);
    setValue('');
    inputRef.current.innerHTML = '';
    setSuggestions([]); // Clear suggestions after selection
  };

  const handleBackspace = (event) => {
    const content = inputRef.current.innerText;
    if (event.key === 'Backspace' && !content && selectedNames.length > 0) {
      event.preventDefault();
      setSelectedNames((prevNames) => prevNames.slice(0, -1));
    }
  };

  const renderSuggestion = (suggestion) => (
    <div key={suggestion.email} className="suggestion" onClick={() => onSuggestionSelected(suggestion)}>
      <div className="suggestion-content">
        <img
          src={suggestion.icon}
          alt={`Icon for ${suggestion.name}`}
          className="suggestion-icon suggestion-image"
        />
        <div className="suggestion-text">
          <span className="suggestion-name">{suggestion.name} </span>
          <span className="suggestion-email">{suggestion.email}</span>
        </div>
      </div>
    </div>
  );
  
  

  const renderChip = (chip, index) => (
    <div key={index} className="chip" style={{ backgroundColor: chip.color, color: '#fff' }}>
      <img
        src={chip.icon}
        alt={`Icon for ${chip.name}`}
        className="chip-icon"
      />
      <span>{chip.name}</span>
      <span className="close-icon" onClick={() => handleChipRemove(index)}>
        &#10006;
      </span>
    </div>
  );

  const handleChipRemove = (index) => {
    const updatedNames = [...selectedNames];
    updatedNames.splice(index, 1);
    setSelectedNames(updatedNames);
  };

  return (
    <div className="suggestion-container">
      <h2 className="pick-user-heading">Pick Users</h2>
      <div className="contenteditable" onKeyDown={handleBackspace}>
        {selectedNames.map(renderChip)}
        <div
          ref={inputRef}
          className="input-for-suggestions"
          contentEditable="true"
          onInput={onChange}
        />
        <div className="suggestions">
          {suggestions.map(renderSuggestion)}
        </div>
      </div>
    </div>
  );
};

export default Suggestion;
