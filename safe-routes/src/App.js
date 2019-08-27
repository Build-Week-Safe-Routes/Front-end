import React from 'react';
import './App.css';
import SampleMap from "./assets/SampleMap.png";
// import LoginForm from "./LoginForm"
// import ResizeImage from 'react-resize-image'
import {Button, Image, Input} from 'semantic-ui-react';
// import Modal from "./LoginForm"
// import {Switch, Route} from 'react-router-dom'



const App = () => {
  return (
   

  
  
  <section className="container">  

   <h1>Safe Routes</h1>
   <Image src={SampleMap} 
      alt="googleMap" className= "main-image" zindex= "-1" />


  <section className='contents'> 
    <div className="button-container">
     <Input className="search-box" icon='search' placeholder='Search...' />    
      <Button primary>Login</Button>
    </div>
  

          
    </section>
<section className="routing">
{/* <Switch>
<Route path="/" exact component={App} />
<Route path="/Login" component={LoginForm} />

</Switch> */}
</section>
</section>

  )
}

export default App;
