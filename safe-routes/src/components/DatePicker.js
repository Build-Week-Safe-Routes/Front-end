import React from 'react';
import { Form, Button, Icon } from 'semantic-ui-react';
import { MonthInput, YearInput } from 'semantic-ui-calendar-react';

const DatePicker = (props) => {
  const { month, setMonth, year, setYear } = props;

  const handleChange = (event, { name, value }) => {
    if (name === "month") {
      setMonth(value);
    } else if (name === "year") {
      setYear(Number(value));
    }
  }
  
  return (
    <>
      <Form>
        <YearInput
          name="year"
          placeholder="Year"
          iconPosition="left"
          value={String(year)}
          popupPosition="bottom left"
          onChange={handleChange}
          maxDate="2017"
          minDate="2008"
        />
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
        <Button primary><Icon name="home" />Home</Button>
      </div>
    </>
  )
}

export default DatePicker;