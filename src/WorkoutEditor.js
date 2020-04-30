import React, { useState, useEffect, useContext } from 'react';
import { useParams } from '@reach/router';
import moment from 'moment';
import Exercise from './Exercise';
import { StorageDataCtx } from './StorageDataContext';

const WorkoutEditor = () => {
  const [storageData, setStorageData] = useContext(StorageDataCtx);
  const [exercises, setExercises] = useState([]);
  const [muscleGroup, setMuscleGroup] = useState('nothing');

  const { id } = useParams();
  const parsedDate = moment(id, 'DDMMYYYY')._d;
  const day = parsedDate.getDate();
  const month = parsedDate.getMonth();
  const monthString = moment(month + 1, 'M').format('MMMM');
  const year = parsedDate.getFullYear();

  function handleChange(e) {
    setMuscleGroup(e.target.value);
    setStorageData(prevState => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        musclegroup: e.target.value
      }
    }));
  }

  function handleAddExercise() {
    setExercises([
      ...exercises,
      <Exercise key={exercises.length} index={exercises.length} dateId={id} />
    ]);
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
    const savedData = storageData[id];

    if (savedData) {
      setMuscleGroup(savedData.musclegroup);
    } else {
      setStorageData(prevState => ({
        ...prevState,
        [id]: {
          exercises: [],
          musclegroup: 'nothing'
        }
      }));
    }

    if (
      savedData &&
      savedData.exercises.length !== 0 &&
      exercises.length === 0
    ) {
      const savedExercisesCount = savedData.exercises.length;
      let savedExercises = [];

      for (let i = 0; i < savedExercisesCount; i++) {
        savedExercises = [
          ...savedExercises,
          <Exercise
            key={savedExercises.length}
            index={savedExercises.length}
            dateId={id}
          />
        ];
      }
      setExercises(savedExercises);
    }
  }, [exercises, exercises.length, id, setStorageData, storageData]);

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
      <button type="button" className="addExercise" onClick={handleAddExercise}>
        + add exercise
      </button>
    </section>
  );
};

export default WorkoutEditor;
