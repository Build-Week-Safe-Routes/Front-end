import React from 'react';
// import {Route, Switch} from 'react-router-dom'
import './App.css';
import Map from './components/Map';
import SampleMap from "./assets/SampleMap.png";
// import Login from "./Login"
import {Button, Image, Input} from 'semantic-ui-react';





const App = () => {
  return (

    // ***************UI Elements ***************

  <section className="container">
    {/* <h1 className="title">Safe Routes</h1> */}
    <Map />
   {/* <Image src={SampleMap} 
      alt="googleMap" className= "main-image" zindex= "-1" /> */}

  {/* <section className='contents'> 
    <div className="button-container">
     <Input className="search-box" icon='search' placeholder='Search...' />    
      <Button primary>Login</Button>

    </div>
            
    </section> */}
 {/* // ***************Routing *************** */}

{/* <section className="routing">
  <Switch>
          <Route path="/" exact component={App} />
          <Route path="/login" component={Login} />
       
  </Switch>
</section> */}
</section>

  )
}

export default App;
