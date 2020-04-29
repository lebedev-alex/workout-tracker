import React, { useState, useEffect, useContext } from 'react';
import { Link } from '@reach/router';
import PropTypes from 'prop-types';

const CalendarCell = props => {
  const { isSelected, date, id } = props;
  const [text, setText] = useState('');

  // useEffect(() => {
  //   setText('');
  //   const workouts = JSON.parse(localStorage.getItem('workouts'));

  //   if (workouts[id] && workouts[id].musclegroup !== 'nothing') {
  //     const preview = JSON.parse(localStorage.getItem('workouts'))[id]
  //       .musclegroup;
  //     setText(preview);
  //   }
  // }, [id]);

  return (
    <Link
      to={`/workout/${id}`}
      className="cell"
      style={{
        backgroundColor: `${isSelected ? 'rgba(43, 82, 120, 0.8)' : ''}`
      }}
      data-date={date}
    >
      <p className="cellDate">{date}</p>
      <p className="cellPreview">{text || null}</p>
      {/* убрать из дома? */}
    </Link>
  );
};

CalendarCell.propTypes = {
  isSelected: PropTypes.bool,
  date: PropTypes.number,
  id: PropTypes.number
};

export default CalendarCell;
