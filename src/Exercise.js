import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { StorageDataContext } from './StorageDataContext';

const Exercise = props => {
  const { index, dateId } = props;
  const [storageData, setStorageData] = useContext(StorageDataContext);

  function handleInputChange(e) {
    const { target } = e;
    const { name } = target;
    const value = name === 'name' ? target.value : +target.value;
    const updatedExercises = [...storageData[dateId].exercises];
    updatedExercises[index][name] = value;
    setStorageData(prevState => ({
      ...prevState,
      [dateId]: {
        ...prevState[dateId],
        exercises: updatedExercises
      }
    }));
  }

  function handleDeleteExercise() {
    const updatedExercises = [...storageData[dateId].exercises];
    updatedExercises.splice(index, 1);
    setStorageData(prevState => ({
      ...prevState,
      [dateId]: {
        ...prevState[dateId],
        exercises: updatedExercises
      }
    }));
  }

  function handleSetChange(e) {
    let updatedNumber = null;
    if (e.target.className === 'addSet') {
      updatedNumber = storageData[dateId].exercises[index].sets + 1;
    } else {
      updatedNumber = storageData[dateId].exercises[index].sets - 1;
    }
    const updatedExercises = [...storageData[dateId].exercises];
    updatedExercises[index].sets = updatedNumber;
    setStorageData(prevState => ({
      ...prevState,
      [dateId]: {
        ...prevState[dateId],
        exercises: updatedExercises
      }
    }));
  }

  function handleRepChange(e) {
    let updatedNumber = null;
    if (e.target.className === 'addRep') {
      updatedNumber = storageData[dateId].exercises[index].reps + 1;
    } else {
      updatedNumber = storageData[dateId].exercises[index].reps - 1;
    }
    const updatedExercises = [...storageData[dateId].exercises];
    updatedExercises[index].reps = updatedNumber;
    setStorageData(prevState => ({
      ...prevState,
      [dateId]: {
        ...prevState[dateId],
        exercises: updatedExercises
      }
    }));
  }

  return (
    <div className="exercise">
      <label htmlFor={`exercise${index}`}>
        Exercise #{index + 1}
        <input
          value={storageData[dateId].exercises[index].name || ''}
          type="text"
          name="name"
          id={`exercise${index}`}
          className="exerciseNameInput"
          onChange={handleInputChange}
        />
      </label>
      <label htmlFor={`exercise${index}Sets`} className="setNumberLabel">
        Sets:
        <input
          onChange={handleInputChange}
          value={storageData[dateId].exercises[index].sets || ''}
          type="number"
          name="sets"
          id={`exercise${index}Sets`}
          className="setNumberInput"
        />
        <button type="button" className="addSet" onClick={handleSetChange}>
          +
        </button>
        <button type="button" className="removeSet" onClick={handleSetChange}>
          −
        </button>
      </label>
      <label htmlFor={`exercise${index}Reps`} className="repNumberLabel">
        Reps:
        <input
          value={storageData[dateId].exercises[index].reps || ''}
          type="number"
          onChange={handleInputChange}
          name="reps"
          id={`exercise${index}Reps`}
          className="repNumberInput"
        />
        <button type="button" className="addRep" onClick={handleRepChange}>
          +
        </button>
        <button type="button" className="removeRep" onClick={handleRepChange}>
          −
        </button>
      </label>
      <button
        type="button"
        className="deleteExercise"
        onClick={handleDeleteExercise}
      >
        delete
      </button>
    </div>
  );
};

Exercise.propTypes = {
  index: PropTypes.number,
  dateId: PropTypes.string
};

export default Exercise;
