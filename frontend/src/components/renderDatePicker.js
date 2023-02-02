import React from 'react';
import DatePicker from 'react-datepicker';

const renderDatePicker = ({input, placeholder, defaultValue, meta: {touched, error} }) => (
  <div>
    <DatePicker {...input} dateForm="MM/DD/YYYY" selected={input.value ? input.value : null} />
    
  </div>
);

export default renderDatePicker