import React from 'react';
import DatePicker from 'react-datepicker';

const renderDatePicker = ({input, placeholder, defaultValue, meta: {touched, error} }) => (
  <div>
    <DatePicker {...input} dateForm="MM/DD/YYYY" selected={input.value ? input.value : null} />
    {touched && error ? <div style={{color: "red", fontSize: 12}}>{error}</div> : <div style={{marginBottom: 18}}></div>}
  </div>
);

export default renderDatePicker