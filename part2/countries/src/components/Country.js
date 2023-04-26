import React, { useState, useEffect } from 'react';
import axios from 'axios';

const openWeatherMapKey = process.env.REACT_APP_OPENWEATHERMAP_KEY;

const Country = ({ country }) => {
  const [weather, setWeather] = useState({});

  useEffect(() => {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&units=metric&appid=${openWeatherMapKey}`
      )
      .then((response) => {
        setWeather(response.data);
        console.log(response.data);
      });
  }, [country]);

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital[0]}</p>
      <p>population {country.population}</p>
      <p>area {country.area}</p>
      <h2>languages</h2>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img
        src={country.flags.png}
        alt={`flag of ${country.name.common}`}
        width="200"
      />
      <h2>Weather in {country.capital[0]}</h2>
      <p>temperature {!weather.main ? null : weather.main.temp} Celcius</p>
      {weather.weather ? (
        <img
          src={`http://openweathermap.org/img/wn/${
            !weather.weather ? null : weather.weather[0].icon
          }@2x.png`}
          alt={`weather icon of ${country.capital[0]}`}
        />
      ) : null}
      <p>wind {!weather.wind ? null : weather.wind.speed} m/s</p>
    </div>
  );
};

export default Country;
