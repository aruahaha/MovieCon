import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Carousel from 'react-bootstrap/Carousel';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import "./HomeCarousel.css"

export default function HomeCarousel(props) {
    return (
        <div className="home-page-movie-carousel">
            <div>
                <Carousel interval={null}>
                    {props.data.map((movie) => (
                        <Carousel.Item key={movie.id}>
                            <div className='main-carousel-div'>
                                <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} className="carousel-bg-img" />
                                <div className='overlay-div'>
                                    <div className='phone-carousel-percentage-div'>
                                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="phone-carousel-poster-image" />
                                        <div className='phone-carousel-percentage'>
                                            <CircularProgressbar
                                                value={Math.ceil(movie.vote_average * 10)}
                                                text={`${Math.ceil(movie.vote_average * 10)}%`}
                                                styles={buildStyles({
                                                    textColor: '#fff',
                                                    pathColor: 'greenyellow',
                                                    trailColor: 'grey',
                                                })}
                                            />
                                        </div>
                                    </div>
                                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="carousel-poster-image" />
                                    <div className='title-overview-div'>
                                        <div className='title-percentage-div'>
                                            <h1 className='carousel-titles movie-title'>
                                                {movie.original_language.toLowerCase() === 'en' ? movie.original_title || movie.original_name : movie.title}
                                            </h1>
                                            <div className='carousel-percentage'>
                                                <CircularProgressbar
                                                    value={Math.ceil(movie.vote_average * 10)}
                                                    text={`${Math.ceil(movie.vote_average * 10)}%`}
                                                    styles={buildStyles({
                                                        textColor: '#fff',
                                                        pathColor: 'greenyellow',
                                                        trailColor: 'grey',
                                                    })}
                                                />
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