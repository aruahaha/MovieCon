import React, { useEffect, useMemo, useState } from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Alert } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { getTrailers } from '../api';
import "./DetailCard.css";
import myImage from "/assets/images/no-image.png";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';

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

export default function DetailCard({ data, toLink }) {
    const { id } = useParams();
    const [trailer, setTrailer] = useState(null);
    const [watchlist, setWatchlist] = useState(false)
    const [watchlistAlertOpen, setWatchlistAlertOpen] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const fetchTrailer = async () => {
            try {
                const trailersData = await getTrailers(id, toLink);
                setTrailer(trailersData);
            } catch (error) {
                console.error(error);
            }
        };
        fetchTrailer();

        if (toLink === "movie") {
            const storedIds = localStorage.getItem("movieIds");
            if (storedIds !== null) {
                const movieIds = JSON.parse(storedIds);
                if (movieIds.includes(data.id)) {
                    setWatchlist(true);
                }
            }
        } else if (toLink === "tv") {
            const storedIds = localStorage.getItem("tvIds");
            if (storedIds !== null) {
                const tvIds = JSON.parse(storedIds);
                if (tvIds.includes(data.id)) {
                    setWatchlist(true);
                }
            }
        }
    }, [id]);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const filteredTrailers = useMemo(() => {
        return trailer ? trailer.results.filter(trailer => trailer.type === 'Trailer') : [];
    }, [trailer]);


    const handleWatchListClick = (id) => {
        let movieIds = []
        let tvIds = []

        if (toLink === "movie") {
            movieIds = JSON.parse(localStorage.getItem("movieIds")) || [];
            if (movieIds?.includes(id)) {
                movieIds = movieIds.filter(itemId => itemId !== id)
            } else {
                setWatchlistAlertOpen(true);
                setTimeout(() => {
                    setWatchlistAlertOpen(false);
                }, 2000);
                movieIds.push(id)
            }

            localStorage.setItem("movieIds", JSON.stringify(movieIds))

        } else if (toLink === "tv") {
            tvIds = JSON.parse(localStorage.getItem("tvIds")) || [];
            if (tvIds?.includes(id)) {
                tvIds = tvIds.filter(itemId => itemId !== id)
            } else {
                setWatchlistAlertOpen(true);
                setTimeout(() => {
                    setWatchlistAlertOpen(false);
                }, 2000);
                tvIds.push(id)
            }

            localStorage.setItem("tvIds", JSON.stringify(tvIds))

        }

        setWatchlist(prev => !prev)
    };


    const voteAverage = Math.ceil(data.vote_average * 10);
    const styles =
        voteAverage >= 70 ? stylesAboveSeventy :
            voteAverage >= 40 ? stylesAboveForty :
                stylesRemaining;

    const userScore = (
        <CircularProgressbar
            value={voteAverage}
            text={`${voteAverage}%`}
            styles={buildStyles(styles)}
        />
    );

    return (
        <>
            <Alert severity="success" sx={{
                display: watchlistAlertOpen ? "flex" : "none",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                position: "absolute",
                right: 0,
                padding: "20px",
                zIndex: 9999,
                fontSize: 20
            }}>

                Added in watchlist
            </Alert>
            <div className='phone-main-div'>
                <LazyLoadImage
                    effect='blur'
                    wrapperProps={{
                        style: { transitionDelay: "1s" },
                    }}
                    loading='lazy'
                    src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`} className='phone-img'
                />
                <div className='content'>
                    <div className='name-div'>
                        <h1 className='content-title'>
                            {data.original_name ? data.name : data.title}
                        </h1>
                        <span>{data.tagline}</span>
                    </div>
                    <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", paddingInline: "10px" }}>
                        {data.genres.map((item, index) => (
                            <p className='genres' key={index}>{item.name}</p>
                        ))}
                    </div>
                    <div className='percent-trailer'>
                        <div className='percentage'>
                            {userScore}
                            Users Score
                        </div>
                        <Link style={{ textDecoration: "none", color: "white" }} to={`https://www.youtube.com/watch?v=${filteredTrailers[0]?.key}`}>Trailer <PlayArrowIcon /></Link>
                        {watchlist ?
                            <button onClick={() => handleWatchListClick(data.id)} className='watchlist-btn'><BookmarkIcon /></button>
                            :
                            <button onClick={() => handleWatchListClick(data.id)} className="watchlist-btn"><BookmarkBorderIcon /></button>
                        }
                    </div>
                    <div className='info-div'>
                        <div>
                            <h1 className='content-title'>
                                Overview
                            </h1>
                            <p className='overview'>
                                {data.overview}
                            </p>
                        </div>
                        <div>
                            <h1 className='content-title director-title'>
                                Directed By
                            </h1>
                            {data?.credits?.crew ? (
                                <p>
                                    {data?.credits?.crew?.filter((person) => person.job === "Director").map((person) => (
                                        person.original_name
                                    )).join(" , ")}
                                </p>
                            ) : (
                                <p>
                                    {data.created_by.map((person) => (
                                        person.name
                                    )).join(" , ")}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

            </div>

            <div className='main-div'>
                <img
                    src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`} className='bg-img'
                />
                <div className='bg-div'>
                    <div className='content-div'>

                        <img
                            src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} className='poster-img' />

                        <div className='content'>
                            <div className='name-div'>
                                <h1 className='content-title'>
                                    {data.original_name ? data.name : data.title}
                                </h1>
                                <span>{data.tagline}</span>
                            </div>
                            <div className='genre-div'>
                                {data.genres.map((item, index) => (
                                    <p className='genres' key={index}>{item.name}</p>
                                ))}
                            </div>
                            <div className='info-div'>

                                <p>Release Date :- {data.release_date}</p>
                                <div className='pc-percent-trailer'>
                                    <div className='pc-percentage'>
                                        {userScore}
                                        Users Score
                                    </div>

                                    <>
                                        {filteredTrailers.length > 0
                                            ?
                                            <Link
                                                className='carousel-more-btn play-btn'
                                                onClick={handleClickOpen}
                                            >
                                                Trailer<PlayArrowIcon />
                                            </Link>
                                            : <></>
                                        }
                                        <Link
                                            className='carousel-more-btn watchlist play-btn'
                                            onClick={() => handleWatchListClick(data.id)}
                                        >
                                            {watchlist ?
                                                "Remove from watchlist"
                                                :
                                                "Add to watchlist"
                                            }
                                        </Link>
                                        <Dialog
                                            open={open}
                                            onClose={handleClose}
                                            aria-labelledby="alert-dialog-title"
                                            aria-describedby="alert-dialog-description"
                                            sx={{
                                                maxWidth:"1500px"
                                            }}
                                        >
                                            <DialogContent 
                                            sx={{
                                                height:"800px",
                                                width:"1500px",
                                                padding:"0",
                                                overflowY:"hidden"
                                            }}
                                            >
                                                <iframe
                                                    src={`https://www.youtube.com/embed/${filteredTrailers.length > 0 ? filteredTrailers[filteredTrailers.length - 1].key : (filteredTrailers.length > 0 ? filteredTrailers[0].key : '')}`}
                                                    width="1500"
                                                    height="800"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                />
                                            </DialogContent>
                                        </Dialog>
                                    </>

                                </div>
                                <h1 className='content-title'>
                                    Overview
                                </h1>
                                <p className='overview-info'>
                                    {data.overview}
                                </p>
                                <h1 className='content-title director-title'>
                                    Directed By
                                </h1>
                                {data?.credits?.crew ? (
                                    <p>
                                        {data?.credits?.crew?.filter((person) => person.job === "Director").map((person) => (
                                            person.original_name
                                        )).join(" , ")}
                                    </p>
                                ) : (
                                    <p>
                                        {data.created_by.map((person) => (
                                            person.name
                                        )).join(" , ")}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                {data?.credits?.cast.length > 0 ? (
                    <>
                        <div className="cast-title-div">
                            <h1 className="cast-title">Cast</h1>
                        </div>
                        <div className="cast-div">
                            {data?.credits?.cast.map((item, index) => (
                                <div className='cast-img-name' key={index}>
                                    {item.profile_path ?
                                        <LazyLoadImage
                                            effect='blur'
                                            wrapperProps={{
                                                style: { transitionDelay: "0.5s" },
                                            }}
                                            loading='lazy'
                                            src={`https://image.tmdb.org/t/p/w500${item.profile_path}`}
                                            className='cast-img'
                                        />
                                        :
                                        <img src={myImage} className='cast-img img-not-found' />
                                    }
                                    <div>
                                        <h1 className='cast-name'>{item.name}</h1>
                                        <p>Character - {item.character}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <></>
                )}
            </div>
        </>
    )
}
