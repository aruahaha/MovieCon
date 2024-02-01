import React from "react";
import "./PopularMovie.css"

export default function PopularMovie(props){
    return(
        <div className="popular-movie-div">
            <div className="popular-movie-img-div">
                {props.data.map((movie) => (
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="popular-movie-image"/>
                ))}
            </div>
        </div>
    )
}