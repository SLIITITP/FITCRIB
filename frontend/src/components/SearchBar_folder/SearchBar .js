import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SearchBar() {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(false);

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  }

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(`http://localhost:2080/dietplan/search/${searchText}`);
        setSearchResults(response.data);
        setError(false); // Reset error state if search is successful
      } catch (err) {
        console.log(err);
        setError(true); // Set error state if search fails
        toast.error('Error with searching diet plan');
      }
    }

    // Only search when searchText is not empty
    if (searchText !== '') {
      fetchSearchResults();
    } else {
      setSearchResults([]);
    }
  }, [searchText]);

  return (
    <div className='containesearch' style={{background: "#ffffff"}}>
      <div className="search-bar">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={handleInputChange} value={searchText} />
      </div>
      {error && <p>Error with searching diet plan</p>}
      {searchResults.map((dietplan) => (
        <div className='center' key={dietplan._id}>
          <h2>{dietplan.mealName}</h2>
          <p>{dietplan.dayofMeal}</p>
          
          <ul>
            {dietplan.mealplan.map((meal) => (
              <li key={meal._id}>
                <p>{meal.meal}- {meal.size}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
      
      <ToastContainer />
    </div>
  );
}

export default SearchBar;
