// Import Dependencies
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

// Import Components
import BirdProfile from "./BirdProfile.jsx";

// Create Functional Component
const BirdingCheckList = () => {
  const [birdSearch, setBirdSearch] = useState("");
  const [birdList, setBirdList] = useState([]);
  const [userId, setUserId] = useState();
  const [userName, setUserName] = useState();
  const [birdSightings, setBirdSightings] = useState([]);


  // Call useEffect on Page Load
  useEffect(() => {
    axios.get("/api/birdList")
      .then((response) => { 
        console.log('got birds');
        setBirdList(response.data) 
      })
      .catch((err) => console.error("ERROR:", err));
    axios.get("/api/birdSightings")
      .then((response) => setBirdSightings(response.data))
      .catch((err) => console.error("ERROR:", err));
    axios.get('/profile')
      .then((profile) => {
          const user = profile.data;
          setUserId(user._id)
          setUserName(user.fullName)
      })
      .catch((err) => console.error("ERROR:", err));
  }, []);

  // Create Search Input Handler
  const handelBirdSearchInput = (event) => setBirdSearch(event.target.value);

  // Create Search Submit Handler
  const handelBirdSearchSubmit = (event) => {
    event.preventDefault();
    setBirdList(birdList
      .filter(bird => bird.scientificName.toLowerCase().includes(birdSearch) || 
        bird.commonName.toLowerCase().includes(birdSearch) || 
        bird.commonFamilyName.toLowerCase().includes(birdSearch) || 
        bird.scientificFamilyName.toLowerCase().includes(birdSearch))
      );    
  }

  // Return Component Template
  return (
    <div>
      <br></br>
      <h3
        className="content has-text-centered"
        padding="20px 40px"
        margin-left="40px"
      >
        {userName}'s Birding Checklist
      </h3>
      <br></br>
      <div className="content has-text-centered">
        <p>Your one stop shop to keep track of all your Louisiana bird sightings.<br></br> 
          There is no better way to celebrate the great state of Louisiana than <br></br> 
          spotting all the wonderful birds that inhabit it. So get to hiking!</p>
      </div>
      <br></br>
      <form >
        <label>
          <input
            className="input is-info is-medium"
            type="text"
            placeholder="Enter Bird Name Here"
            value={birdSearch}
            onChange={handelBirdSearchInput}
          />
        </label>
        <input
          className="button is-info"
          type="submit"
          value="Search for Bird"
          onClick={handelBirdSearchSubmit}
        />
      </form>
      <div className="birds">
        <div>
        {birdList.map((bird) => {
            return <BirdProfile 
              bird={bird} 
              key={bird._id} 
              userId={userId} 
              birdSightings={birdSightings} />;
          })}
        </div>
      </div>
    </div>
  );
};

// Export Component
export default BirdingCheckList;