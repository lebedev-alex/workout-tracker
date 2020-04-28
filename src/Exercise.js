import React, { useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { isEmpty } from './helperFunctions';

const Exercise = props => {
  const { index, dateId } = props;
  const [exerciseDetails, setExerciseDetails] = useState({});
  const localStorageData = JSON.parse(localStorage.getItem('workouts'));
  // const data = localStorageData[+dateId].exercises[index];

  // let name = '';
  // let sets = '';
  // let reps = '';

  /* eslint-disable prefer-destructuring */
  // if (data !== undefined) {
  //   name = data.name;
  //   sets = data.sets;
  //   reps = data.reps;
  //   if (isEmpty(exerciseDetails)) {
  //     setExerciseDetails(data);
  //   }
  // }
  /* eslint-enable prefer-destructuring */

  return (
    <div className="exercise">
      <label htmlFor={`exercise${index}`}>
        Exercise #{index + 1}
        <input
          // defaultValue={name}
          type="text"
          id={`exercise${index}`}
          className="exerciseNameInput"
          onBlur={e => {
            const newObject = _.cloneDeep(
              JSON.parse(localStorage.getItem('workouts'))
            );
            newObject[dateId].exercises[index].name = e.target.value;
            localStorage.setItem('workouts', JSON.stringify(newObject));
          }}
        />
      </label>
      <label htmlFor={`exercise${index}Sets`} className="setNumberLabel">
        Sets:
        <input
          // defaultValue={sets}s
          type="number"
          id={`exercise${index}Sets`}
          min={1}
          max={99}
          className="setNumberInput"
          onBlur={e => {
            const newObject = Object.assign({}, exerciseDetails, {
              sets: +e.target.value
            });
            setExerciseDetails(newObject);
            localStorageData[+dateId].exercises.splice(index, 1, newObject);
            localStorage.setItem('workouts', JSON.stringify(localStorageData));
          }}
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
          // defaultValue={reps}s
          type="number"
          id={`exercise${index}Reps`}
          min={1}
          max={99}
          className="repNumberInput"
          onBlur={e => {
            const newObject = Object.assign({}, exerciseDetails, {
              reps: +e.target.value
            });
            setExerciseDetails(newObject);
            localStorageData[+dateId].exercises.splice(index, 1, newObject);
            localStorage.setItem('workouts', JSON.stringify(localStorageData));
          }}
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
      <p className="deleteExercise" data-for={index}>
        delete
      </p>
    </div>
  );
};

Exercise.propTypes = {
  index: PropTypes.number
};

export default Exercise;
