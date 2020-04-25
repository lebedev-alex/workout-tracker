import React from 'react';

const Exercise = props => {
  const { index } = props;
  return (
    <div className="exercise">
      <label htmlFor={`exercise${index}`}>
        Exercise #{index + 1}
        <input
          type="text"
          id={`exercise${index}`}
          className="exerciseNameInput"
        />
      </label>
      <label htmlFor={`exercise${index}Sets`} className="setNumberLabel">
        Sets:
        <input
          type="number"
          id={`exercise${index}Sets`}
          min="1"
          max="99"
          value="1"
          className="setNumberInput"
        />
        <i className="addSet">+</i>
      </label>
      <label htmlFor={`exercise${index}Reps`} className="repNumberLabel">
        Reps:
        <input
          type="number"
          id={`exercise${index}Reps`}
          min="1"
          max="99"
          value="1"
          className="repNumberInput"
        />
        <i className="addRep">+</i>
      </label>
    </div>
  );
};

export default Exercise;
