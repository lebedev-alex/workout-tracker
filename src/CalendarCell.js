import React from 'react';

const CalendarCell = props => {
  const { isSelected } = props;
  const { date } = props;

  return (
    <div
      className="cell"
      style={{
        backgroundColor: `${isSelected ? 'rgba(43, 82, 120, 0.8)' : ''}`
      }}
      data-date={date}
    />
  );
};

export default CalendarCell;
