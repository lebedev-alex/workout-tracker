import React, { useContext } from 'react';
import { Link } from '@reach/router';
import PropTypes from 'prop-types';
import { StorageDataContext } from './StorageDataContext';

const CalendarCell = props => {
  const { isToday, date, id } = props;
  const [storageData] = useContext(StorageDataContext);

  return (
    <Link
      to={`/workout/${id}`}
      className="cell"
      style={{
        backgroundColor: `${isToday ? 'rgba(43, 82, 120, 0.8)' : ''}`
      }}
    >
      <p className="cellDate">{date}</p>

      {storageData[id] && storageData[id].musclegroup !== 'nothing' ? (
        <p className="cellPreview">{storageData[id].musclegroup}</p>
      ) : null}
    </Link>
  );
};

CalendarCell.propTypes = {
  isToday: PropTypes.bool,
  date: PropTypes.number,
  id: PropTypes.string
};

export default CalendarCell;
