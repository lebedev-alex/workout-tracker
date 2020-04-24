import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import Calendar from './Calendar';

const App = () => (
  <div className="container">
    <Header />
    <Calendar />
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
