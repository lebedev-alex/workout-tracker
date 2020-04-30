import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StorageDataCtx } from './StorageDataContext';

const Exercise = props => {
  const { index, dateId } = props;
  const [exerciseDetails, setExerciseDetails] = useState({});
  const [storageData, setStorageData] = useContext(StorageDataCtx);
  const localStorageData = JSON.parse(localStorage.getItem('workouts'));

  const [inputState, setInputState] = useState({
    name: '',
    sets: '',
    reps: ''
  });

  function handleInputChange(e) {
    const { target } = e;
    const { name } = target;
    const value = name === 'name' ? target.value : +target.value;
    setInputState(prevState => ({ ...prevState, [name]: value }));

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

  function handleDeleteExercise(e) {
    console.log(e.target.dataset.for);
  }

  useEffect(() => {
    const savedInfo = storageData[dateId].exercises[index];
    if (savedInfo) {
      setInputState(savedInfo);
    }
  }, [dateId, index, storageData]);

  return (
    <div className="exercise">
      <label htmlFor={`exercise${index}`}>
        Exercise #{index + 1}
        <input
          value={inputState.name}
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
          value={inputState.sets}
          name="sets"
          type="number"
          id={`exercise${index}Sets`}
          className="setNumberInput"
        />
        <button
          type="button"
          className="addSet"
          onClick={() => {
            const targetEl = document.getElementById(`exercise${index}Sets`);
            const newObject = Object.assign({}, exerciseDetails, {
              sets: +targetEl.value + 1
            });
            targetEl.value = +targetEl.value + 1;
            setExerciseDetails(newObject);
            localStorageData[+dateId].exercises.splice(index, 1, newObject);
            localStorage.setItem('workouts', JSON.stringify(localStorageData));
          }}
        >
          +
        </button>
        <button
          type="button"
          className="removeSet"
          onClick={() => {
            const targetEl = document.getElementById(`exercise${index}Sets`);
            const newObject = Object.assign({}, exerciseDetails, {
              sets: +targetEl.value - 1
            });
            targetEl.value = +targetEl.value - 1;
            setExerciseDetails(newObject);
            localStorageData[+dateId].exercises.splice(index, 1, newObject);
            localStorage.setItem('workouts', JSON.stringify(localStorageData));
          }}
        >
          −
        </button>
      </label>
      <label htmlFor={`exercise${index}Reps`} className="repNumberLabel">
        Reps:
        <input
          value={inputState.reps}
          onChange={handleInputChange}
          name="reps"
          type="number"
          id={`exercise${index}Reps`}
          className="repNumberInput"
        />
        <button
          type="button"
          className="addRep"
          onClick={() => {
            const targetEl = document.getElementById(`exercise${index}Reps`);
            const newObject = Object.assign({}, exerciseDetails, {
              reps: +targetEl.value + 1
            });
            targetEl.value = +targetEl.value + 1;
            setExerciseDetails(newObject);
            localStorageData[+dateId].exercises.splice(index, 1, newObject);
            localStorage.setItem('workouts', JSON.stringify(localStorageData));
          }}
        >
          +
        </button>
        <button
          type="button"
          className="removeRep"
          onClick={() => {
            const targetEl = document.getElementById(`exercise${index}Reps`);
            const newObject = Object.assign({}, exerciseDetails, {
              reps: +targetEl.value - 1
            });
            targetEl.value = +targetEl.value - 1;
            setExerciseDetails(newObject);
            localStorageData[+dateId].exercises.splice(index, 1, newObject);
            localStorage.setItem('workouts', JSON.stringify(localStorageData));
          }}
        >
          −
        </button>
      </label>
      <button
        type="button"
        className="deleteExercise"
        data-for={index}
        onClick={handleDeleteExercise}
      >
        delete
      </button>
    </div>
  );
};

Exercise.propTypes = {
  index: PropTypes.number
};

export default Exercise;
