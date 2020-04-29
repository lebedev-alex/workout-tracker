import React, { useContext } from 'react';
import DatePicker from 'react-date-picker';
import CalendarCell from './CalendarCell';
import DateContext from './DateContext';
import { countDaysInMonth } from './helperFunctions';

const Calendar = () => {
  const [date, setDate] = useContext(DateContext);
  const { fullDate } = date;
  const day = fullDate.getDate();
  const month = fullDate.getMonth();
  const year = fullDate.getFullYear();
  const monthString = new Intl.DateTimeFormat('en-US', {
    month: 'long'
  }).format(fullDate);
  const daysInMonth = countDaysInMonth(
    fullDate.getMonth() + 1,
    fullDate.getFullYear()
  );
  const calendarCells = [];

  for (let i = 0; i < daysInMonth; i++) {
    const id = +`${i + 1}${month}${year}`;

    calendarCells.push(
      <CalendarCell key={i} date={i + 1} isSelected={i + 1 === day} id={id} />
    );
  }

  function handleClick(e) {
    if (e.target.className === 'cell' || e.target.className === 'cellDate') {
      const targetDate = e.target.dataset.date || e.target.innerText;
      setDate({ fullDate: new Date(year, month, targetDate) });
    }
  }

  return (
    <main>
      <section
        className="calendar"
        onClick={handleClick}
        onKeyDown={handleClick}
        role="landmark"
      >
        <h2>{`${monthString} ${year}`}</h2>
        <DatePicker
          value={fullDate}
          onChange={updatedDate => setDate({ fullDate: updatedDate })}
          format="dd-MM-yyyy"
        />
        <div className="cellsContainer">{calendarCells}</div>
      </section>
    </main>
  );
};

export default Calendar;
