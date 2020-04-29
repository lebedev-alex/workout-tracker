import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Router } from '@reach/router';
import Header from './Header';
import Calendar from './Calendar';
import WorkoutEditor from './WorkoutEditor';
import DateContext from './DateContext';
import { StorageDataContext } from './StorageDataContext';

const App = () => {
  const date = useState({ fullDate: new Date() });

  return (
    <div>
      <Header />
      <DateContext.Provider value={date}>
        <StorageDataContext>
          <Router>
            <Calendar path="/" />
            <WorkoutEditor path="/workout/:id" />
          </Router>
        </StorageDataContext>
      </DateContext.Provider>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
