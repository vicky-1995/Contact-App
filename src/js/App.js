import React, { useState } from "react";
import { render } from "react-dom";
import { Router, Link } from "@reach/router";
import ContactHome from "./ContactHome";
import Footer from "./Footer";

const App = () => {
  
  const [searchTerm, setSearchTerm] = useState(""); // useState is use for declaring and setting the state of the variable. Here, it stores the value to be searched.
  const handleChange = event => {
    setSearchTerm(event.target.value); // will assign the input to search term.
  };

  return (
    <div>
      <div className="set-width">
        <div className="flex header">
          <header>
            <Link to="/" className="logo">
              <img src={require('../images/vodafone_logo.svg')} alt="vodafone_icon" onClick={()=>{setSearchTerm("")}}/>
            </Link>
          </header>
          <input
            className="searchbox"
            type="text"
            placeholder="Search for contacts"
            value={searchTerm}
            onChange={handleChange}
          />
        </div>
        <Router>
          {/* setting up the routing whenever /* is used that means we will do nested route*/}
          <ContactHome path="/*" searchTerm={searchTerm}/>
        </Router>
      </div>
      <Footer />
    </div>
  );
};

render(<App />, document.getElementById("root"));
