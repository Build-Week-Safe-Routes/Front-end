import React from 'react'
import { Button, Header, Image, Modal, Checkbox, Form } from 'semantic-ui-react'
// import {Link} from 'react-router-dom';

const Login = () => {
  
  return (

  // <Link to = "/">
  <Modal trigger={<Button>Login</Button>} centered={false}>
    <Modal.Header>Log In</Modal.Header>
    <Modal.Content image>
      <Image wrapped size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' />
      <Modal.Description>
        <Header>Default Profile Image</Header>
        <Form>
    <Form.Field>
      <label>First Name</label>
      <input placeholder='First Name' />
    </Form.Field>
    <Form.Field>
      <label>Last Name</label>
      <input placeholder='Last Name' />
    </Form.Field>
    <Form.Input label='Enter Password' type='password' />
    <Form.Field>
      <Checkbox label='I agree to the Terms and Conditions' />
    </Form.Field>
    <Button type='submit'>Submit</Button>
  </Form>
       
      </Modal.Description>
    </Modal.Content>
  </Modal>
  //  </Link>
)
  }
export default Login