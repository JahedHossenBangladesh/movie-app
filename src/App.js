import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import MovieList from './components/MovieList/MovieList';
import MovieListHeading from './components/Heading/MovieListHeading';
import SearchBox from './components/Heading/SearchBox';

function App() {
  const [movie,setMovie]=useState([])
  const [searchValue,setSearchValue] = useState('')
 const getMovieRequest = async() =>{
   const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=88307c91`;
   const response = await fetch(url);
   const responseJson = await response.json();
if(responseJson.Search){
  setMovie(responseJson.Search)
}
   
 }
 useEffect(() =>{
   getMovieRequest(searchValue);
 },[searchValue])
  return (
    <div className="container-fluid bg">
        <div className="row d-flex align-item-center mt-4 md-4">
            <MovieListHeading heading='Movie'/>
            <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}></SearchBox>
        </div>
     <div className="row">
       <MovieList movie={movie}></MovieList>
       
     </div>
     
    </div>
  );
}

export default App;
