import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from '@reach/router';
import Header from './Header';
import Calendar from './Calendar';
import WorkoutEditor from './WorkoutEditor';
import { StorageDataProvider } from './StorageDataContext';

const App = () => (
  <div>
    <Header />
    <StorageDataProvider>
      <Router>
        <Calendar path="/" />
        <WorkoutEditor path="/workout/:id" />
      </Router>
    </StorageDataProvider>
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
