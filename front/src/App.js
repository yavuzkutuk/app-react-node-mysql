import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [movie, setMovie] = useState('');
  const [results, setResults] =useState('');

  const handleOnchange = (e) => {
    setMovie(e.target.value);
  }

  useEffect(() => {
      axios.get(`http://localhost:3001/movies?movie=${movie}`)
      .then((response) => {
        console.log(response);
        setResults(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }, [movie])

  return (
    <>
      <div className="uk-position-center">
        <form>
          Nom du film : {movie}
          <input type="text" className="uk-input" value={movie} onChange={handleOnchange} />
        </form>
        <div className="uk-text-center uk-divider-small"></div>
        {results && results.map( result => <div>{result.name}</div>)}
      </div>
    </>
  );
}

export default App;
