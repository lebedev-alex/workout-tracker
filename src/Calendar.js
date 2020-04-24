import React, { useState } from 'react';
import DatePicker from 'react-date-picker';
import CalendarCell from './CalendarCell';

const Calendar = () => {
  const moment = require('moment');

  function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }

  const [date, setDate] = useState({
    date: new Date().getDate(),
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
    fullDate: new Date(),
    daysInMonth: daysInMonth(
      new Date().getMonth() + 1,
      new Date().getFullYear()
    ),
    monthString: new Intl.DateTimeFormat('en-US', { month: 'long' }).format(
      new Date()
    )
  });

  const calendarCells = [];
  for (let i = 0; i < date.daysInMonth; i++) {
    calendarCells.push(
      <CalendarCell key={i} isSelected={i + 1 === date.date} />
    );
  }

  return (
    <main>
      <section className="calendar">
        <h2>{`${date.monthString} ${date.year}`}</h2>
        <DatePicker
          value={date.fullDate}
          onChange={updatedDate => {
            const newObject = Object.assign({}, date, {
              fullDate: updatedDate,
              date: updatedDate.getDate(),
              month: updatedDate.getMonth(),
              year: updatedDate.getFullYear(),
              daysInMonth: daysInMonth(
                updatedDate.getMonth() + 1,
                updatedDate.getFullYear()
              ),
              monthString: new Intl.DateTimeFormat('en-US', {
                month: 'long'
              }).format(updatedDate)
            });
            setDate(newObject);
          }}
          format="dd-MM-yyyy"
        />
        <div className="cellsContainer">{calendarCells}</div>
      </section>
    </main>
  );
};

export default Calendar;
