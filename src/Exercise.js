import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StorageDataCtx } from './StorageDataContext';

const Exercise = props => {
  const { index, dateId, editorStateHandler, editorState } = props;

  const [exerciseDetails, setExerciseDetails] = useState({});
  const [storageData, setStorageData] = useContext(StorageDataCtx);
  const localStorageData = JSON.parse(localStorage.getItem('workouts'));

  const [inputState, setInputState] = useState({
    name: '',
    sets: 0,
    reps: 0
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

  function handleDeleteExercise() {
    const updatedEditorState = [...editorState];
    updatedEditorState.pop();
    editorStateHandler(updatedEditorState);

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

  function handleAddSet() {
    const updatedNumber = storageData[dateId].exercises[index].sets + 1;
    setInputState(prevState => ({
      ...prevState,
      sets: updatedNumber
    }));
    // const updatedExercises = [...storageData[dateId].exercises];
    // updatedExercises[index] = { ...inputState };
    // setStorageData(prevState => ({
    //   ...prevState,
    //   [dateId]: {
    //     ...prevState[dateId],
    //     exercises: updatedExercises
    //   }
    // }));
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
          value={inputState.sets.toString()}
          type="number"
          name="sets"
          id={`exercise${index}Sets`}
          className="setNumberInput"
        />
        <button type="button" className="addSet" onClick={handleAddSet}>
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
          value={inputState.reps.toString()}
          type="number"
          onChange={handleInputChange}
          name="reps"
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
