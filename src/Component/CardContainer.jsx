import React, { useRef } from "react";
import "./CardContainer.css"
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Link } from "react-router-dom";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

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

export default function CardContainer(props) {

    const ref = useRef(null);

    const scroll = (scrollOffset) => {
        ref.current.scrollLeft += scrollOffset
    };

    return (
        <>
            <div className="main-scroller-div">
                <button onClick={() => { scroll(-200) }} className="scroller-btn-left scroller-btn"><ArrowBackIosIcon /></button>
                <div className="popular-movie-div" ref={ref}>
                    {props.data.map((movie) => (
                        <Link key={movie.id} to={`/movie/${movie.id}`}>
                            <div className="scroller-img-text-div">
                                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="popular-movie-image" alt={movie.title} />
                                <span className='scroller-movie-btn'>View More</span>
                                <button className="watchlist-btn"><BookmarkBorderIcon /></button>
                                <div className='scroller-percentage'>
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
                        </Link>
                    ))}
                </div>
                <button onClick={() => { scroll(200) }} className="scroller-btn-right scroller-btn"><ArrowForwardIosIcon /></button>
            </div>
        </>
    )
}
