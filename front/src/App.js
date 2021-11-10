import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [movie, setMovie] = useState('');
  const [newMovie, setNewMovie] = useState(false);
  const [idMovie, setIdMovie] = useState('');
   const [nameMovie, setNameMovie] = useState('');
  const [descriptionMovie, setDescriptionMovie] = useState('');
  const [results, setResults] = useState('');
  const [message, setMessage] = useState('');

  const handleOnchange = (e) => {
    setMovie(e.target.value);
  }

   const handleNameMovie = (e) => {
    setNameMovie(e.target.value);
  }

  const handleDescriptionMovie = (e) => {
    setDescriptionMovie(e.target.value);
  }

  const handleOnClick = (e) => {
    setNewMovie(true);
  }

   const handleOnClickUpdate = (e) => {
    e.preventDefault();
    if(nameMovie){
      let movie = {
        name: nameMovie,
        description: descriptionMovie
      };

      axios.put(`http://localhost:3001/movies/${idMovie}`, movie)
      .then((response) => {
        setMessage('ok');
      })
      .catch((error) => {
        console.log(error);
      })
    }else{
      axios.get(`http://localhost:3001/movies/${e.target.value}`)
      .then((response) => {
        setNameMovie(response.data[0].name);
        setDescriptionMovie(response.data[0].description);
        setIdMovie(response.data[0].id);
      })
      .catch((error) => {
        console.log(error);
      })
    }
    setNewMovie(true);
  }
  
  const handleOnClickDel = (e) => {
    e.preventDefault();
     axios.delete(`http://localhost:3001/movies/${e.target.value}`)
    .then((response) => {
      setMessage('ok');
    })
    .catch((error) => {
      console.log(error);
    }) 
  }

  const handleOnClickAdd = (e) => {
    e.preventDefault();
    if(nameMovie && descriptionMovie){
      let movie = {
        name: nameMovie,
        description: descriptionMovie
      };

      axios.post('http://localhost:3001/movies', movie)
      .then((response) => {
        setMessage('ok');
      })
      .catch((error) => {
        console.log(error);
      })
    }
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
        <div className="uk-card uk-card-default uk-card-body">
           <div className="uk-position-top-right"><button className="uk-button uk-button-primary uk-button-small" onClick={handleOnClick} >Ajouter film</button></div>
             <form>
              Nom du film : {movie}
              <input type="text" className="uk-input" value={movie} onChange={handleOnchange} />
            </form>
            <div className="uk-text-center uk-divider-small"></div>
            {results && results.map( result => <div>{result.name} <button className="uk-button uk-button-primary uk-button-small" value={result.id} onClick={handleOnClickUpdate}>MAJ</button> <button className="uk-button uk-button-danger uk-button-small" value={result.id} onClick={handleOnClickDel}>DEL</button> </div>)}
        </div>
         {newMovie && (
          <div>
            <div className="uk-text-center uk-divider-small"></div>
            <div className="uk-card uk-card-default uk-card-body uk-padding-top">
              {message}
              <form>
                Nouveau film
                <div className="uk-margin"><input type="text" className="uk-input" value={nameMovie} onChange={handleNameMovie} /></div>
                <div className="uk-margin"><textarea className="uk-textarea" onChange={handleDescriptionMovie}>{descriptionMovie}</textarea></div>
{/*                   <div className="uk-margin"><button className="uk-button uk-button-primary uk-button-small" onClick={handleOnClickAdd} >Ajouter le film</button></div>
 */}                <div className="uk-margin"><button className="uk-button uk-button-primary uk-button-small" value="3" onClick={handleOnClickUpdate}>Modifier le film</button></div>
     
              </form>
            </div>
          </div>
        )} 
      </div>
    </>
  );
}

export default App;
