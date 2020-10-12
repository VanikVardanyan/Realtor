import React, { useState } from 'react';
import Calendar from 'react-calendar';

import './style.scss';

const CalendarForm = ({setRoomDate}) => {
  const [date, setDate] = useState(new Date());
  const onChange = (date) => {
    setDate(date)
    setRoomDate(Date.parse(date))
  };

  console.log(Date.parse(date))
  const today = new Date();
  return (
    <div
      className="calendarStyleWH"
    >
      <Calendar
        onChange={onChange}
        value={date}
        minDate={today}
      />
    </div>
  );
};

export default CalendarForm;
