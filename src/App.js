import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import MovieList from './components/MovieList/MovieList';
import MovieListHeading from './components/Heading/MovieListHeading';
import SearchBox from './components/Heading/SearchBox';
import AddFavourites from './components/AddFavourites/AddFavourites';
import RemoveMovie from './components/RemoveMovie/RemoveMovie';

function App() {
  const [movie, setMovie] = useState([])
  const [favouritesMovie, setFavouritesMovie] = useState([])
  const [searchValue, setSearchValue] = useState('')


  const getMovieRequest = async (searchValue) => {
    const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=88307c91`;
    const response = await fetch(url);
    const responseJson = await response.json();
    if (responseJson.Search) {
      setMovie(responseJson.Search)
    }
  }

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue])


  useEffect(() => {
    if (localStorage.setItem > 0){
      const movieAdded = JSON.parse(
        localStorage.getItem('react-movie-app-favourites')
      );
      setFavouritesMovie(movieAdded);
    }
    
  }, [''])


 

  const saveToLocalStorage = (item) => {
    localStorage.setItem('react-movie-app-favourites', JSON.stringify(item))

  }

  const AddFavouritesMovie = (movie) => {
    const newFavouritesMovie = [...favouritesMovie, movie]
    setFavouritesMovie(newFavouritesMovie)
    saveToLocalStorage(newFavouritesMovie)
  }

  const Remove = (movie) => {
    const newFavouritesMovie = favouritesMovie.filter((favourites) => favourites.imdbID !== movie.imdbID)
    setFavouritesMovie(newFavouritesMovie);
    saveToLocalStorage(newFavouritesMovie);
  }
  return (
    <div className="container-fluid bg">
      <div className="row d-flex align-item-center mt-4 md-4">
        <MovieListHeading heading='Movie' />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}></SearchBox>
      </div>
      <div className="row">
        <MovieList
          movie={movie}
          eventHandler={AddFavouritesMovie}
          favouritesComponent={AddFavourites}
        ></MovieList>


      </div>
      <div className="row d-flex align-item-center mt-4 md-4">
        <MovieListHeading heading='Favourites' />

      </div>
      <div className="row">
        <MovieList
          movie={favouritesMovie}
          eventHandler={Remove}

          favouritesComponent={RemoveMovie}
        ></MovieList>


      </div>
    </div>
  );
}

export default App;
