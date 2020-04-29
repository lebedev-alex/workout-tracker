import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Exercise from './Exercise';
import DateContext from './DateContext';
import { StorageDataCtx } from './StorageDataContext';

const WorkoutEditor = props => {
  const [date, setDate] = useContext(DateContext);
  const [storageData, setStorageData] = useContext(StorageDataCtx);
  const { fullDate } = date;
  const day = fullDate.getDate();
  const monthString = new Intl.DateTimeFormat('en-US', {
    month: 'long'
  }).format(fullDate);
  const year = fullDate.getFullYear();
  const { id: dateId } = props;

  const [exercises, setExercises] = useState([]);
  const [muscleGroup, setMuscleGroup] = useState('nothing');

  function handleChange(e) {
    setMuscleGroup(e.target.value);
    setStorageData({
      [dateId]: {
        musclegroup: e.target.value
      }
    });
  }

  function handleClick(e) {
    setExercises([
      ...exercises,
      <Exercise
        key={exercises.length}
        index={exercises.length}
        dateId={dateId}
      />
    ]);
    setStorageData({
      [dateId]: {
        musclegroup: storageData[dateId].musclegroup,
        exercises: [
          ...storageData[dateId].exercises,
          { name: '', sets: 0, reps: 0 }
        ]
      }
    });
  }

  useEffect(() => {
    const savedData = storageData[dateId];
    if (savedData) {
      setMuscleGroup(savedData.musclegroup);
    } else {
      storageData[dateId] = {
        musclegroup: 'nothing',
        exercises: []
      };
      setStorageData(storageData);
    }
  }, [dateId, setStorageData, storageData]);

  return (
    <section className="workoutEditor">
      <h3>
        Workout date: {monthString} {day}, {year}
      </h3>
      <div className="workoutDetails">
        <label htmlFor="muscleGroup">
          What are you going to smash today?
          <select
            id="muscleGroupSelect"
            value={muscleGroup}
            onChange={handleChange}
            onBlur={handleChange}
          >
            <option value="nothing">nothing</option>
            <option value="chest">chest</option>
            <option value="arms">arms</option>
            <option value="shoulders">shoulders</option>
            <option value="legs">legs</option>
            <option value="back">back</option>
          </select>
        </label>
      </div>
      {exercises.map(item => item)}
      <button type="button" className="addExercise" onClick={handleClick}>
        + add exercise
      </button>
    </section>
  );
};

WorkoutEditor.propTypes = {
  id: PropTypes.string
};

export default WorkoutEditor;
