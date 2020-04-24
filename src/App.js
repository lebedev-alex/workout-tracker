import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import Calendar from './Calendar';

const App = () => (
  <React.StrictMode>
    <div className="container">
      <Header />
      <Calendar />
    </div>
  </React.StrictMode>
);

ReactDOM.render(<App />, document.getElementById('root'));
