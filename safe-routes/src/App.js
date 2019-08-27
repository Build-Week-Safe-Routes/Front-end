import React from 'react';
import './App.css';
import SampleMap from "./assets/SampleMap.png"
import ResizeImage from 'react-resize-image'
import {Button, Dropdown, Icon} from 'semantic-ui-react'



const App = () => {

 
  
  return (
    
    <section>    
      <div class="login-button">
         <Button primary>Login</Button>
    </div>
  
    
  <Dropdown
    text='Filter'
    icon='filter'
    floating
    labeled
    button
    className='icon'
  >
    <Dropdown.Menu>
      <Dropdown.Header icon='tags' content='Filter by tag' />
      <Dropdown.Divider />
      <Dropdown.Item>
        <Icon name='wrench' className='right floated' />
        Important
      </Dropdown.Item>
      <Dropdown.Item>
        <Icon name='wrench' className='right floated' />
        Announcement
      </Dropdown.Item>
      <Dropdown.Item>
        <Icon name='conversation' className='right floated' />
        Discussion
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
   
    <ResizeImage src= {SampleMap} alt="googleMap"
      width="100%" height="100%" gravity="faces" crop="fill" />
          
    </section>

  )
}

export default App;
