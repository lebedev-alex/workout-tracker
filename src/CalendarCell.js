import React, { useState, useContext, useEffect } from 'react';
import { Link } from '@reach/router';
import PropTypes from 'prop-types';
import { StorageDataCtx } from './StorageDataContext';

const CalendarCell = props => {
  const { isToday, date, id } = props;
  const [text, setText] = useState('');
  const [storageData] = useContext(StorageDataCtx);

  useEffect(() => {
    if (storageData[id] && storageData[id].musclegroup !== 'nothing') {
      const preview = storageData[id].musclegroup;
      setText(preview);
    }
  }, [id, storageData]);

  return (
    <Link
      to={`/workout/${id}`}
      className="cell"
      style={{
        backgroundColor: `${isToday ? 'rgba(43, 82, 120, 0.8)' : ''}`
      }}
      data-date={date}
    >
      <p className="cellDate">{date}</p>
      <p className="cellPreview">{text}</p>
      {/* hide from DOM? */}
    </Link>
  );
};

CalendarCell.propTypes = {
  isToday: PropTypes.bool,
  date: PropTypes.number,
  id: PropTypes.string
};

export default CalendarCell;
