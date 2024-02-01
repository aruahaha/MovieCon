import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Carousel from 'react-bootstrap/Carousel';

import "./HomeCarousel.css"

export default function HomeCarousel(props) {
    return (
        <div className="home-page-movie-carousel">
            <div>
                <Carousel interval={3000}>
                    {props.data.map((movie) => (
                        <Carousel.Item>
                            <div className='main-carousel-div'>
                                <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} className="carousel-bg-img" />
                                <div className='overlay-div'>
                                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="carousel-poster-image" />
                                    <div className='title-overview-div'>
                                        <div className='title-percentage-div'>
                                            <h1 className='carousel-movie-title'>
                                                {movie.original_language.toLowerCase() === 'en' ? movie.original_title : movie.title}
                                            </h1>
                                            <p className='carousel-percentage'>{Math.ceil(movie.vote_average * 10)}%</p>
                                        </div>
                                        <p className='carousel-movie-overview'>{movie.release_date}</p>
                                        <p className='carousel-movie-overview'>{movie.overview}</p>
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