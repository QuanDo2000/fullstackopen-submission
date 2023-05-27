import React, { useEffect, useState } from 'react';
import { DiaryEntry, Visibility, Weather } from './types';
import { getAllDiaries } from './diaryService';
import { createDiary } from './diaryService';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [newDate, setNewDate] = useState('');
  const [newWeather, setNewWeather] = useState('');
  const [newVisibility, setNewVisibility] = useState('');
  const [newComment, setNewComment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getAllDiaries().then((data) => {
      setDiaries(data);
    });
  }, []);

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    createDiary({
      date: newDate,
      weather: newWeather as Weather,
      visibility: newVisibility as Visibility,
      comment: newComment,
    })
      .then((data) => {
        setDiaries(diaries.concat(data));
        setNewDate('');
        setNewWeather('');
        setNewVisibility('');
        setNewComment('');
      })
      .catch((error) => {
        setErrorMessage(error.response.data);
        setTimeout(() => {
          setErrorMessage('');
        }, 5000);
      });
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <p
        style={{
          color: 'red',
        }}
      >
        {errorMessage}
      </p>
      <form onSubmit={diaryCreation}>
        <div>
          date
          <input
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
          />
        </div>
        <div>
          weather
          <input
            type="radio"
            name="weather"
            value="sunny"
            onChange={(e) => setNewWeather(e.target.value)}
          />
          sunny
          <input
            type="radio"
            name="weather"
            value="rainy"
            onChange={(e) => setNewWeather(e.target.value)}
          />
          rainy
          <input
            type="radio"
            name="weather"
            value="cloudy"
            onChange={(e) => setNewWeather(e.target.value)}
          />
          cloudy
          <input
            type="radio"
            name="weather"
            value="windy"
            onChange={(e) => setNewWeather(e.target.value)}
          />
          windy
          <input
            type="radio"
            name="weather"
            value="stormy"
            onChange={(e) => setNewWeather(e.target.value)}
          />
          stormy
        </div>
        <div>
          visibility
          <input
            type="radio"
            name="visibility"
            value="great"
            onChange={(e) => setNewVisibility(e.target.value)}
          />
          great
          <input
            type="radio"
            name="visibility"
            value="good"
            onChange={(e) => setNewVisibility(e.target.value)}
          />
          good
          <input
            type="radio"
            name="visibility"
            value="ok"
            onChange={(e) => setNewVisibility(e.target.value)}
          />
          ok
          <input
            type="radio"
            name="visibility"
            value="poor"
            onChange={(e) => setNewVisibility(e.target.value)}
          />
          poor
        </div>
        <div>
          comment
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
      <h2>Diary Entries</h2>
      {diaries.map((diary) => (
        <div key={diary.id}>
          <h4>{diary.date}</h4>
          <div>
            visibility: {diary.visibility}
            <br />
            weather: {diary.weather}
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
