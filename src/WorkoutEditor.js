import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Exercise from './Exercise';
import DateContext from './DateContext';

const WorkoutEditor = props => {
  const [dateInfo] = useContext(DateContext);
  const { date, monthString, year } = dateInfo;
  const { id: dateId } = props;
  const [exercises, setExercises] = useState([]);

  function handleMuscleGroupChange(e) {
    const localStorageData = JSON.parse(localStorage.getItem('workouts'));
    localStorageData[dateId].musclegroup = e.target.value;
    localStorage.setItem('workouts', JSON.stringify(localStorageData));
  }
  function handleMuscleGroupBlur(e) {
    const localStorageData = JSON.parse(localStorage.getItem('workouts'));
    localStorageData[dateId].musclegroup = e.target.value;
    localStorage.setItem('workouts', JSON.stringify(localStorageData));
  }

  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem('workouts'));
    // если загружаем впервые, создаётся запись в localStorage (если не было до этого)
    if (!([dateId] in localStorageData)) {
      localStorageData[dateId] = {
        musclegroup: 'nothing',
        exercises: []
      };
      localStorage.setItem('workouts', JSON.stringify(localStorageData));
    }

    // загружаем сохранённую группу мышц
    const muscleGroupSelect = document.getElementById('muscleGroupSelect');
    let savedMuscleGroup = null;
    savedMuscleGroup = localStorageData[dateId].musclegroup;
    muscleGroupSelect.value = savedMuscleGroup;

    // наполняем сохранёнными упражнениями
    if (
      localStorageData[+dateId].exercises.length !== 0 &&
      exercises.length === 0
    ) {
      const exerciseCount = localStorageData[+dateId].exercises.length;
      let savedExercises = [];

      for (let i = 0; i < exerciseCount; i++) {
        savedExercises = [
          ...savedExercises,
          <Exercise
            key={savedExercises.length}
            index={savedExercises.length}
            dateId={dateId}
          />
        ];
      }
      setExercises(savedExercises);
    }
    // event listener (добавить \ удалить упражнение)
    function handleClick(e) {
      if (e.target.className === 'addExercise') {
        setExercises([
          ...exercises,
          <Exercise
            key={exercises.length}
            index={exercises.length}
            dateId={dateId}
          />
        ]);
        localStorageData[dateId].exercises.push({
          name: '',
          sets: 0,
          reps: 0
        });

        localStorage.setItem('workouts', JSON.stringify(localStorageData));
      }
    }
    const workoutEditor = document.querySelector('.workoutEditor');
    workoutEditor.addEventListener('click', handleClick);

    return () => {};
  }, [dateId, exercises]);

  // useEffect(() => {
  //   const workoutEditor = document.querySelector('.workoutEditor');

  //   function handleClick(e) {
  //     if (e.target.className === 'addExercise' && addExerciseEnabled) {
  //       setExercises([
  //         ...exercises,
  //         <Exercise
  //           key={exercises.length}
  //           index={exercises.length}
  //           dateId={dateId}
  //         />
  //       ]);
  //     }

  //     if (e.target.className === 'deleteExercise') {
  //       const deletedExerciseIndex = +e.target.dataset.for;
  //       const storageData = JSON.parse(localStorage.getItem('workouts'));
  //       const updatedStorageData = JSON.stringify(
  //         storageData[dateId].exercises.splice(deletedExerciseIndex, 1)
  //       );
  //       localStorage.setItem('workouts', updatedStorageData);
  // =============================================================================

  // let updatedExercises = exercises.filter(
  //   item => item.props.index !== deletedExerciseIndex
  // );
  // setExercises(updatedExercises);

  // const updatedStorageData = localStorageData[+dateId].exercises.splice(
  //   deletedExerciseIndex,
  //   1
  // );

  // console.log(updatedStorageData);
  // localStorage.setItem('workouts', JSON.stringify(updatedStorageData));

  // updatedExercises = [];
  // const updatedExercsiesCount = exercises.length - 1;
  // for (let i = 0; i < updatedExercsiesCount; i++) {
  //   updatedExercises = [
  //     ...updatedExercises,
  //     <Exercise
  //       key={updatedExercises.length}
  //       index={updatedExercises.length}
  //       dateId={dateId}
  //     />
  //   ];
  // }
  // setExercises(updatedExercises);
  // =====================================================================
  //     }
  //   }
  //   workoutEditor.addEventListener('click', handleClick);

  //   return () => {
  //     workoutEditor.removeEventListener('click', handleClick);
  //   };
  // }, [addExerciseEnabled, dateId, exercises]);

  return (
    <section className="workoutEditor">
      <h3>
        Workout date: {monthString} {date}, {year}
      </h3>
      <div className="workoutDetails">
        <label htmlFor="muscleGroup">
          What are you going to smash today?
          <select
            id="muscleGroupSelect"
            onChange={e => handleMuscleGroupChange(e)}
            onBlur={e => handleMuscleGroupBlur(e)}
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
      <p className="addExercise">+ add exercise</p>
    </section>
  );
};

WorkoutEditor.propTypes = {
  id: PropTypes.string
};

export default WorkoutEditor;
