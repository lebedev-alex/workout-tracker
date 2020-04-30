import React, { useState } from 'react';
import DatePicker from 'react-date-picker';
import moment from 'moment';
import CalendarCell from './CalendarCell';
import { countDaysInMonth, addZ } from './helperFunctions';

const Calendar = () => {
  const [fullDate, setFullDate] = useState(new Date());
  const day = fullDate.getDate();
  const month = fullDate.getMonth();
  const year = fullDate.getFullYear();
  const monthString = moment(month + 1, 'M').format('MMMM');
  const daysInMonth = countDaysInMonth(
    fullDate.getMonth() + 1,
    fullDate.getFullYear()
  );
  const calendarCells = []; // сделать стейт? как передавать id?

  for (let i = 0; i < daysInMonth; i++) {
    const id = `${addZ(i + 1)}${addZ(month + 1)}${year}`;

    calendarCells.push(
      <CalendarCell key={i} date={i + 1} isToday={i + 1 === day} id={id} />
    );
  }

  return (
    <main>
      <section className="calendar">
        <h2>{`${monthString} ${year}`}</h2>
        <DatePicker
          value={fullDate}
          onChange={updatedDate => setFullDate(updatedDate)}
          format="dd-MM-yyyy"
        />
        <div className="cellsContainer">{calendarCells}</div>
      </section>
    </main>
  );
};

export default Calendar;
