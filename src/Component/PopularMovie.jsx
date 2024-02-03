import React, { useRef } from "react";
import "./PopularMovie.css";
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Link } from "react-router-dom";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function PopularMovie(props) {

    const ref = useRef(null);

    const scroll = (scrollOffset) => {
        ref.current.scrollLeft += scrollOffset;
    };

    return (
        <>
            <div className="main-scroller-div">
                <button onClick={() => { scroll(-200) }} className="scroller-btn"><ArrowBackIosIcon /></button>
                <div className="popular-movie-div" ref={ref}>
                    {props.data.map((movie) => (
                        <Link key={movie.id} to={`/movie/${movie.id}`}>
                            <div className="scroller-img-text-div">
                                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="popular-movie-image" alt={movie.title} />
                                {/* <h1 className='scroller-movie-title'>
                                    {movie.original_language.toLowerCase() === 'en' ? movie.original_title : movie.title}
                                </h1> */}
                                <span className='scroller-movie-btn'>View More</span>
                                <button className="watchlist-btn"><BookmarkBorderIcon /></button>
                                <div className='scroller-percentage'>
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
                        </Link>
                    ))}
                </div>
                <button onClick={() => { scroll(200) }} className="scroller-btn"><ArrowForwardIosIcon /></button>
            </div>
        </>
    )
}
