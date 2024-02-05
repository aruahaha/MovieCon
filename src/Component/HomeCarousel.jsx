import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Suspense, useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';


import 'react-circular-progressbar/dist/styles.css';

import { getTrailers } from '../api';

import { Link } from 'react-router-dom';
import "./HomeCarousel.css";

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
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [trailers, setTrailers] = useState(null);

    const handleClickOpen = (index) => {
        setSelectedIndex(index);
    };

    const handleClose = () => {
        setSelectedIndex(null);
    };

    useEffect(() => {
        const idArray = props.data.map((item) => item.id);
        const trailersPromises = idArray.map((id) => getTrailers(id));
        Promise.all(trailersPromises)
            .then((trailers) => setTrailers(trailers))
            .catch((error) => console.error(error));
    }, [props.data]);

    return (
        <Suspense fallback={<h1>loading...</h1>}>
            <div className="home-page-movie-carousel">
                <div>
                    <Carousel interval={null} indicators={false}>
                        {props.data.map((movie, index) => (
                            <Carousel.Item key={movie.id}>
                                <div className='main-carousel-div'>
                                    <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} className="carousel-bg-img" />
                                    <div className='overlay-div'>
                                        <div className='phone-carousel-percentage-div'>
                                            <div className='phone-carousel-content-div'>
                                                <Link to={`/movie/${movie.id}`}>
                                                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="phone-carousel-poster-image" />
                                                </Link>
                                                <h1 className='phone-carousel-title movie-title'>
                                                    {movie.original_language.toLowerCase() === 'en' ? movie.original_title || movie.original_name : movie.title}
                                                </h1>
                                                <div className="phone-carousel-btn-div">
                                                    <Link
                                                        className='phone-carousel-more-btn play-btn'
                                                        onClick={() => handleClickOpen(index)}
                                                    >
                                                        Trailer<PlayArrowIcon />
                                                    </Link>
                                                </div>
                                            </div>

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
                                                        <p className='carousel-movie-date'>NONE</p>
                                                    )}
                                                </div>
                                                <div>
                                                    <h1 className='carousel-titles date-overview-title'>Overview</h1>
                                                    <p className='carousel-movie-overview'>{movie.overview}</p>
                                                </div>
                                            </div>
                                            <div className='carousel-btns'>
                                                <Link to={`/movie/${movie.id}`} className='carousel-more-btn'>View More</Link>
                                                {trailers?.[index]?.results && trailers[index].results.some(trailer => trailer.type === 'Trailer') && (
                                                    <>
                                                        <Link
                                                            key={trailers[index].id}
                                                            className='carousel-more-btn play-btn'
                                                            onClick={() => handleClickOpen(index)}
                                                        >
                                                            Trailer<PlayArrowIcon />
                                                        </Link>
                                                        <Dialog
                                                            open={selectedIndex === index}
                                                            onClose={handleClose}
                                                            aria-labelledby="alert-dialog-title"
                                                            aria-describedby="alert-dialog-description"
                                                        >
                                                            <DialogContent className='youtube-video'>
                                                                <iframe
                                                                    src={`https://www.youtube.com/embed/${trailers[index].results.find(trailer => trailer.type === 'Trailer').key}`}
                                                                    width="1500"
                                                                    height="800"
                                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                                    allowFullScreen
                                                                />
                                                            </DialogContent>
                                                        </Dialog>
                                                    </>
                                                )}
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
        </Suspense >
    )
}