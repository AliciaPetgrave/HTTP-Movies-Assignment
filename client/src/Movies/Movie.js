import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouteMatch } from 'react-router-dom';
import MovieCard from './MovieCard';

function Movie(props, { addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  //routes to update
  const updateButton = e => {
    e.preventDefault()
    props.history.push(`/update-movie/${movie.id}`)
  }

  //delete
  const handleDelete = e => {
    e.preventDefault()
    axios.delete(`http://localhost:5000/api/movies/${movie.id}`)
    .then(response => {
      console.log(response)
      setMovie(response.data)
      props.history.push('/')
    })
  }

  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className='save-wrapper'>
      <MovieCard movie={movie} />

      <div className='save-button' onClick={saveMovie}>
        Save
      </div>
      <div className='update-button' onClick={updateButton}>
        Update
      </div>
      <div className='delete-button' onClick={handleDelete}>
        Delete
      </div>
    </div>
  );
}

export default Movie;
