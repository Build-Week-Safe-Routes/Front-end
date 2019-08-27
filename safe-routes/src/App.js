import React from 'react';
import './App.css';
import SampleMap from "./assets/SampleMap.png"
// import ResizeImage from 'react-resize-image'
import {Button, Image, Input} from 'semantic-ui-react';

const App = () => {

 
  
  return (
    
  <section className='contents'> 
    <div className="button-container">
     <Input className="search-box" icon='search' placeholder='Search...' />    
      <Button primary>Login</Button>
    </div>
  
    
    <Image src={SampleMap} object-fit='contain' bordered  alt="googleMap" className= "main-image"/>

 
          
    </section>

  )
}

export default App;
