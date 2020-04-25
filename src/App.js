import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Router } from '@reach/router';
import Header from './Header';
import Calendar from './Calendar';
import WorkoutEditor from './WorkoutEditor';
import DateContext from './DateContext';
import { countDaysInMonth } from './helperFunctions';

const App = () => {
  const dateInfo = useState({
    date: new Date().getDate(),
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
    fullDate: new Date(),
    daysInMonth: countDaysInMonth(
      new Date().getMonth() + 1,
      new Date().getFullYear()
    ),
    monthString: new Intl.DateTimeFormat('en-US', { month: 'long' }).format(
      new Date()
    )
  });

  return (
    <div>
      <Header />
      <DateContext.Provider value={dateInfo}>
        <Router>
          <Calendar path="/" />
          <WorkoutEditor path="/workout/:id" />
        </Router>
      </DateContext.Provider>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
