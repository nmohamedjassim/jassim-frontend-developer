import React, { useState, useEffect } from 'react';
import Banner from './components/Banner/Banner';
import SearchComponent from './components/SearchBar/SearchComponent';
import SpaceBanner from './assets/space_banner.jpg';
import './App.css';

function App() {
  
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Function to fetch initial data from API when component mounts
    const fetchData = async () => {
      try {
        // Perform API request using fetch or axios
        const response = await fetch(`https://api.spacexdata.com/v3/capsules`);
        const data = await response.json();

        // Update search results state with fetched data
        setSearchResults(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call the fetch function when the component mounts
    fetchData();
  }, []); // Empty dependency array ensures this effect runs only once (on mount)


  const handleSearch = (data) => {
    // Ensure the received data is an array before updating the state
    if (Array.isArray(data)) {      
      setSearchResults(data);
    } else {
      if([data].length==1){
        if([data.error]=='Not Found'){
          setSearchResults();
        }else{
          setSearchResults([data]);
        }
      }
      // console.error('Search results data is not an array, so convert as array');
      // console.log('Search term:', [data]);
    }
  };

  
  return (
    <div className="App">
      <Banner
        imageUrl={SpaceBanner}
        title="Welcome to our SpaceX!"
        description="Explore our amazing space Launches."
      />
      <SearchComponent onSearch={handleSearch} />
      {/* Display search results */}
      <div className="search-results">
        {searchResults && searchResults.length > 0 ? (
          searchResults.map((result) => (
            <div className="result-card" key={result.capsule_serial}>
              <p>Serial No : {result.capsule_serial}</p>
              <p>Name : {result.details}</p>
              <p>Status : {result.status}</p>
              <p>Type : {result.type}</p> 
            </div>
          ))
        ) : (
          <p>No search results found</p>
        )}
      </div>
    </div>
  );
}

export default App;
