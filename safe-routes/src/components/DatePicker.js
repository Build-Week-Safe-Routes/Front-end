import React from 'react';
import { Form } from 'semantic-ui-react';
import { MonthInput } from 'semantic-ui-calendar-react';

const DatePicker = (props) => {
  const { month, setMonth } = props;

  const getNumberedMonth = (mon) => {
    return new Date(Date.parse(mon + " 1, 2012")).getMonth() + 1;
  }

  const handleChange = (event, { name, value }) => {
    console.log(getNumberedMonth(value));
    setMonth(value);
  }
  
  return (
    <Form>
      <MonthInput 
        name="month"
        placeholder="Month"
        iconPosition="left"
        value={month}
        onChange={handleChange}
      />
    </Form>
  )
}

export default DatePicker;