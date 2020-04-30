import React, { useState, useEffect, useContext } from 'react';
import { useParams } from '@reach/router';
import moment from 'moment';
import Exercise from './Exercise';
import { StorageDataContext } from './StorageDataContext';

const WorkoutEditor = () => {
  const [storageData, setStorageData] = useContext(StorageDataContext);
  const [muscleGroup, setMuscleGroup] = useState('nothing');

  const { id } = useParams();
  const parsedDate = moment(id, 'DDMMYYYY')._d;
  const day = parsedDate.getDate();
  const month = parsedDate.getMonth();
  const monthString = moment(month + 1, 'M').format('MMMM');
  const year = parsedDate.getFullYear();

  function handleMuscleGroupChange(e) {
    const newMuscleGroup = e.target.value;
    setMuscleGroup(newMuscleGroup);
    setStorageData(prevState => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        musclegroup: newMuscleGroup
      }
    }));
  }

  function handleAddExercise() {
    if (!storageData[id].exercises) {
      setStorageData(prevState => ({
        ...prevState,
        [id]: {
          ...prevState[id],
          exercises: []
        }
      }));
    }

    setStorageData(prevState => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        exercises: [
          ...prevState[id].exercises,
          {
            name: '',
            sets: 0,
            reps: 0
          }
        ]
      }
    }));
  }

  useEffect(() => {
    if (storageData[id] && storageData[id].musclegroup !== 'nothing') {
      setMuscleGroup(storageData[id].musclegroup);
    }
  }, [id, storageData]);

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
            onChange={handleMuscleGroupChange}
            onBlur={handleMuscleGroupChange}
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
      {storageData[id] && storageData[id].exercises
        ? storageData[id].exercises.map((item, index) => (
            <Exercise key={index} index={index} dateId={id} />
          ))
        : null}
      <button type="button" className="addExercise" onClick={handleAddExercise}>
        + add exercise
      </button>
    </section>
  );
};

export default WorkoutEditor;
