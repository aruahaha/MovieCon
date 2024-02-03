import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Carousel from 'react-bootstrap/Carousel';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import "./HomeCarousel.css"
import { Link } from 'react-router-dom';

const stylesAboveSeventy = {
    textColor: "#fff",
    pathColor: "greenyellow",
    trailColor: "grey"
}
const stylesAboveForty = {
    textColor: "#fff",
    pathColor: "yellow",
    trailColor: "grey"
}
const stylesRemaining = {
    textColor: "#fff",
    pathColor: "red",
    trailColor: "grey"
}

export default function HomeCarousel(props) {
    return (
        <div className="home-page-movie-carousel">
            <div>
                <Carousel interval={3000}>
                    {props.data.map((movie) => (
                        <Carousel.Item key={movie.id}>
                            <div className='main-carousel-div'>
                                <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} className="carousel-bg-img" />
                                <div className='overlay-div'>
                                    <div className='phone-carousel-percentage-div'>
                                        <Link to={`/movie/${movie.id}`}>
                                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="phone-carousel-poster-image" />
                                        </Link>
                                        <div className='phone-carousel-percentage'>
                                            {Math.ceil(movie.vote_average * 10) >= 70 ?
                                                <CircularProgressbar
                                                    value={Math.ceil(movie.vote_average * 10)}
                                                    text={`${Math.ceil(movie.vote_average * 10)}%`}
                                                    styles={buildStyles(
                                                        stylesAboveSeventy
                                                    )}
                                                />
                                                :
                                                Math.ceil(movie.vote_average * 10) >= 40
                                                    ?
                                                    <CircularProgressbar
                                                        value={Math.ceil(movie.vote_average * 10)}
                                                        text={`${Math.ceil(movie.vote_average * 10)}%`}
                                                        styles={buildStyles(
                                                            stylesAboveForty
                                                        )}
                                                    />
                                                    :
                                                    <CircularProgressbar
                                                        value={Math.ceil(movie.vote_average * 10)}
                                                        text={`${Math.ceil(movie.vote_average * 10)}%`}
                                                        styles={buildStyles(
                                                            stylesRemaining
                                                        )}
                                                    />
                                            }
                                        </div>
                                    </div>
                                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="carousel-poster-image" />
                                    <div className='title-overview-div'>
                                        <div className='title-percentage-div'>
                                            <h1 className='carousel-titles movie-title'>
                                                {movie.original_language.toLowerCase() === 'en' ? movie.original_title || movie.original_name : movie.title}
                                            </h1>
                                            {/* <Link to={`/movie/${movie.id}`} className='phone-carousel-more-btn'>More..</Link> */}
                                            <div className='carousel-percentage'>
                                                {Math.ceil(movie.vote_average * 10) >= 70 ?
                                                    <CircularProgressbar
                                                        value={Math.ceil(movie.vote_average * 10)}
                                                        text={`${Math.ceil(movie.vote_average * 10)}%`}
                                                        styles={buildStyles(
                                                            stylesAboveSeventy
                                                        )}
                                                    />
                                                    :
                                                    Math.ceil(movie.vote_average * 10) >= 40
                                                        ?
                                                        <CircularProgressbar
                                                            value={Math.ceil(movie.vote_average * 10)}
                                                            text={`${Math.ceil(movie.vote_average * 10)}%`}
                                                            styles={buildStyles(
                                                                stylesAboveForty
                                                            )}
                                                        />
                                                        :
                                                        <CircularProgressbar
                                                            value={Math.ceil(movie.vote_average * 10)}
                                                            text={`${Math.ceil(movie.vote_average * 10)}%`}
                                                            styles={buildStyles(
                                                                stylesRemaining
                                                            )}
                                                        />
                                                }
                                            </div>
                                        </div>
                                        <div className='date-overview'>
                                            <div>
                                                <h1 className='carousel-titles date-overview-title'>Release Date</h1>
                                                {movie.release_date ? (
                                                    <p className='carousel-movie-date'>{movie.release_date}</p>
                                                ) : (
                                                    <p className='carousel-movie-date'>NA</p>
                                                )}
                                            </div>
                                            <div>
                                                <h1 className='carousel-titles date-overview-title'>Overview</h1>
                                                <p className='carousel-movie-overview'>{movie.overview}</p>
                                            </div>
                                        </div>
                                        <Link to={`/movie/${movie.id}`} className='carousel-more-btn'>More..</Link>
                                    </div>
                                </div>
                            </div>
                        </Carousel.Item>
                    ))
                    }
                </Carousel>
            </div>
        </div>
    )
}