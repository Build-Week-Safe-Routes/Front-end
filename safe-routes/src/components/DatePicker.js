import React from 'react';
import { Form } from 'semantic-ui-react';
import { MonthInput } from 'semantic-ui-calendar-react';

const DatePicker = (props) => {
  const { month, setMonth } = props;

  const handleChange = (event, { name, value }) => {
    setMonth(value);
  }
  
  return (
    <Form>
      <MonthInput 
        name="month"
        placeholder="Month"
        iconPosition="left"
        value={month}
        popupPosition="bottom left"
        onChange={handleChange}
      />
    </Form>
  )
}

export default DatePicker;