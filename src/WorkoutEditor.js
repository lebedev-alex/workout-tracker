import React, { useState, useEffect, useContext } from 'react';
import Exercise from './Exercise';
import DateContext from './DateContext';

const WorkoutEditor = () => {
  const [dateInfo] = useContext(DateContext);
  const { date, monthString } = dateInfo;

  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const addExercise = document.querySelector('.addExercise');

    function handleClick() {
      setExercises([
        ...exercises,
        <Exercise key={Date.now()} index={exercises.length} />
      ]);
    }
    addExercise.addEventListener('click', handleClick);

    return () => {
      addExercise.removeEventListener('click', handleClick);
    };
  }, [exercises]);

  return (
    <section className="workoutEditor">
      <h3>
        Workout date: {monthString}, {date}
      </h3>
      <div className="workoutDetails">
        <label htmlFor="muscleGroup">
          What are you going to smash today?
          <select id="muscleGroup">
            <option value="chest">Nothing</option>
            <option value="chest">Chest</option>
            <option value="arms">Arms</option>
            <option value="shoulders">Shoulders</option>
            <option value="legs">Legs</option>
            <option value="back">Back</option>
          </select>
        </label>
      </div>
      {exercises.map(item => item)}
      <p className="addExercise">+ add exercise</p>
    </section>
  );
};

export default WorkoutEditor;
