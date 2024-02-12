import React, { useRef, useMemo, memo } from "react";
import "./CardScroller.css";
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Link } from "react-router-dom";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import myImage from "/assets/images/no-image.png";

const stylesAboveSeventy = {
    textColor: "#fff",
    pathColor: "greenyellow",
    trailColor: "grey"
};
const stylesAboveForty = {
    textColor: "#fff",
    pathColor: "yellow",
    trailColor: "grey"
};
const stylesRemaining = {
    textColor: "#fff",
    pathColor: "red",
    trailColor: "grey"
};

const Card = memo(({ movie, toLink }) => {
    const voteAverage = useMemo(() => Math.ceil(movie.vote_average * 10), [movie.vote_average]);
    let styles;
    if (voteAverage >= 70) {
        styles = stylesAboveSeventy;
    } else if (voteAverage >= 40) {
        styles = stylesAboveForty;
    } else {
        styles = stylesRemaining;
    }

    return (
        <Link key={movie.id} to={`${toLink}${movie.id}`} className="movie-link">
            <div className="scroller-img-text-div">
                {movie.poster_path ? (
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="popular-movie-image" alt={movie.title} />
                ) : (
                    <img src={myImage} className="popular-movie-image not-found-image" alt="No Image" />
                )}
                <span className='scroller-movie-name'>{movie.original_name ? movie.name : movie.title || movie.original_title}</span>
                <button className="watchlist-btn"><BookmarkBorderIcon /></button>
                <div className='scroller-percentage'>
                    <CircularProgressbar
                        value={voteAverage}
                        text={`${voteAverage}%`}
                        styles={buildStyles(styles)}
                    />
                </div>
            </div>
        </Link>
    );
});

export default function CardScroller({ data, toLink }) {
    const ref = useRef(null);

    const scroll = (scrollOffset) => {
        ref.current.scrollLeft += scrollOffset;
    };

    return (
        <div className="main-scroller-div">
            <button onClick={() => { scroll(-200) }} className="scroller-btn-left scroller-btn"><ArrowBackIosIcon /></button>
            <div className="popular-movie-div" ref={ref}>
                {data.map(movie => <Card key={movie.id} movie={movie} toLink={toLink} />)}
            </div>
            <button onClick={() => { scroll(200) }} className="scroller-btn-right scroller-btn"><ArrowForwardIosIcon /></button>
        </div>
    );
}
