import React from 'react';
import { Form, Button, Icon } from 'semantic-ui-react';
import { MonthInput } from 'semantic-ui-calendar-react';

const DatePicker = (props) => {
  const { month, setMonth } = props;

  const handleChange = (event, { name, value }) => {
    setMonth(value);
  }
  
  return (
    <>
      <Form>
        <MonthInput 
          name="month"
          placeholder="Month"
          iconPosition="left"
          clearable={true}
          value={month}
          popupPosition="bottom left"
          onChange={handleChange}
        />
      </Form>
      <div className="button-wrapper">
        <Button primary><Icon name="home" />Safe Routes</Button>
      </div>
    </>
  )
}

export default DatePicker;