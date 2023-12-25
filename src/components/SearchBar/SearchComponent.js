import React, { useState } from 'react';
import './SearchComponent.css'; // Import the CSS file for styling
import 'font-awesome/css/font-awesome.min.css';

const SearchComponent = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async () => {
    try {
      // Perform API request using fetch or axios
      const response = await fetch(`https://api.spacexdata.com/v3/capsules/${searchTerm}`);
      const data = await response.json();

      // Pass the fetched data to the parent component or function
      onSearch(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleInputChange}
        className="search-input"
      />
      <button onClick={handleSearch} className="search-button">
        <i className="fa fa-search"></i>
      </button>
    </div>
  );
};

export default SearchComponent;