import React, { useState, useEffect } from 'react';
import { Link } from '@reach/router';
import PropTypes from 'prop-types';

const CalendarCell = props => {
  const { isSelected, date, id } = props;
  const [text, setText] = useState('');

  useEffect(() => {
    setText('');
    const workouts = JSON.parse(localStorage.getItem('workouts'));

    if (workouts[id]) {
      setText(workouts[id]);
    }
  });

  return (
    <Link
      to={`/workout/${id}`}
      className="cell"
      style={{
        backgroundColor: `${isSelected ? 'rgba(43, 82, 120, 0.8)' : ''}`
      }}
      data-date={date}
    >
      <textarea
        className="cellTextarea"
        type="text"
        placeholder={date}
        value={text}
        onChange={e => {
          setText(e.target.value);
          const workouts = JSON.parse(localStorage.getItem('workouts'));
          workouts[id] = e.target.value;
          localStorage.setItem('workouts', JSON.stringify(workouts));
        }}
      />
    </Link>
  );
};

CalendarCell.propTypes = {
  isSelected: PropTypes.bool,
  date: PropTypes.number,
  id: PropTypes.string
};

export default CalendarCell;
