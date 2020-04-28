import React, { useEffect, useContext } from 'react';
import DatePicker from 'react-date-picker';
import CalendarCell from './CalendarCell';
import DateContext from './DateContext';
import { countDaysInMonth } from './helperFunctions';

const Calendar = () => {
  const [dateInfo, setDateInfo] = useContext(DateContext);
  const { date, daysInMonth, month, year, monthString, fullDate } = dateInfo;
  const calendarCells = [];

  for (let i = 0; i < daysInMonth; i++) {
    const id = `${i + 1}${month}${year}`;
    calendarCells.push(
      <CalendarCell key={i} date={i + 1} isSelected={i + 1 === date} id={id} />
    );
  }

  if (localStorage.getItem('workouts') === null) {
    localStorage.setItem('workouts', '{}');
  }

  useEffect(() => {
    const calendar = document.querySelector('.calendar');

    function handleClick(e) {
      if (e.target.className === 'cell') {
        const newObject = Object.assign({}, dateInfo, {
          date: e.target.dataset.date,
          fullDate: new Date(year, month, e.target.dataset.date)
        });
        setDateInfo(newObject);
      } else if (e.target.className === 'cellDate') {
        const newObject = Object.assign({}, dateInfo, {
          date: e.target.innerText,
          fullDate: new Date(year, month, e.target.innerText)
        });
        setDateInfo(newObject);
      }
    }
    calendar.addEventListener('click', handleClick);

    return () => {
      calendar.removeEventListener('click', handleClick);
    };
  }, [dateInfo, month, setDateInfo, year]);

  return (
    <main>
      <section className="calendar">
        <h2>{`${monthString} ${year}`}</h2>
        <DatePicker
          value={fullDate}
          onChange={updatedDate => {
            const newObject = Object.assign({}, dateInfo, {
              fullDate: updatedDate,
              date: updatedDate.getDate(),
              month: updatedDate.getMonth(),
              year: updatedDate.getFullYear(),
              daysInMonth: countDaysInMonth(
                updatedDate.getMonth() + 1,
                updatedDate.getFullYear()
              ),
              monthString: new Intl.DateTimeFormat('en-US', {
                month: 'long'
              }).format(updatedDate)
            });
            setDateInfo(newObject);
          }}
          format="dd-MM-yyyy"
        />
        <div className="cellsContainer">{calendarCells}</div>
      </section>
    </main>
  );
};

export default Calendar;
