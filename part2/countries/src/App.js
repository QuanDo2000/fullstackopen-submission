import { useEffect, useState } from 'react';
import axios from 'axios';
import Country from './components/Country';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const shownCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      find countries <input value={filter} onChange={handleFilterChange} />
      {shownCountries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : shownCountries.length === 1 ? (
        <Country country={shownCountries[0]} />
      ) : (
        shownCountries.map((country) => (
          <p key={country.name.common}>
            {country.name.common}{' '}
            <button onClick={() => setFilter(country.name.common)}>show</button>
          </p>
        ))
      )}
    </div>
  );
};

export default App;
