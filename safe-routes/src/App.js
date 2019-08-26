import React from 'react';
import './App.css';
import Map from "./components/Map"
import Search from "./components/Search"

const App = () => {
  return (
    <div className="App">
      <h1>This is the app component</h1>
      {/* <Search /> */}
      <Map />
    </div>
  );
}

export default App;
