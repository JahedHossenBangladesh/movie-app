import React from 'react';
import AddFavourites from '../AddFavourites/AddFavourites';

const MovieList = (props) => {
    console.log(props)
    const Fav = props.favouritesComponent;

    return (
        <>
        {
            props.movie.map((movie,index) => (<div  className='image-container d-flex justify-content-start m-3'>
               <img src={movie.Poster} alt=""/>
               <div onClick={() => props.eventHandler(movie)} className="overlay d-flex align-item-center justify-content-center">
                   <Fav></Fav>
               </div>
               
            </div>))
        }
    </>
    );
};

export default MovieList;