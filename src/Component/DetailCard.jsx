import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Alert } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import React, { useEffect, useMemo, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { getTrailers } from '../api';
import "./DetailCard.css";
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

export default function DetailCard({ data , toLink}) {
    const { id } = useParams();
    const [trailer, setTrailer] = useState(null);
    const [open, setOpen] = useState(false);
    const [watchlistAlertOpen, setWatchlistAlertOpen] = useState(false);
    
    useEffect(() => {
        const fetchTrailer = async () => {
            try {
                const trailersData = await getTrailers(id , toLink);
                setTrailer(trailersData);
            } catch (error) {
                console.error(error);
            }
        };
        fetchTrailer();
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


    const handleWatchListClick = () => {
        setWatchlistAlertOpen(true);
        setTimeout(() => {
            setWatchlistAlertOpen(false);
        }, 2000);
    };

    
    return (
        <>
            <div className='phone-main-div'>
                <img src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`} className='phone-img' />
                <div className='content'>
                    <div className='name-div'>
                        <h1 className='content-title'>
                            {data.original_name ? data.original_title || data.original_name : data.title}
                        </h1>
                        <span>{data.tagline}</span>
                    </div>
                    <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
                        {data.genres.map((item) => (
                            <p className='genres'>{item.name}</p>
                        ))}
                    </div>
                    <div className='percent-trailer'>
                        <div className='percentage'>
                            {Math.ceil(data.vote_average * 10) >= 70 ?
                                <CircularProgressbar
                                    value={Math.ceil(data.vote_average * 10)}
                                    text={`${Math.ceil(data.vote_average * 10)}%`}
                                    styles={buildStyles(
                                        stylesAboveSeventy
                                    )}
                                />
                                :
                                Math.ceil(data.vote_average * 10) >= 40
                                    ?
                                    <CircularProgressbar
                                        value={Math.ceil(data.vote_average * 10)}
                                        text={`${Math.ceil(data.vote_average * 10)}%`}
                                        styles={buildStyles(
                                            stylesAboveForty
                                        )}
                                    />
                                    :
                                    <CircularProgressbar
                                        value={Math.ceil(data.vote_average * 10)}
                                        text={`${Math.ceil(data.vote_average * 10)}%`}
                                        styles={buildStyles(
                                            stylesRemaining
                                        )}
                                    />
                            }
                            Users Score
                        </div>
                        <Link style={{ textDecoration: "none", color: "white" }} to={`https://www.youtube.com/watch?v=${filteredTrailers[0]?.key}`}>Trailer <PlayArrowIcon /></Link>
                    </div>
                    <div className='info-div'>
                        <h1 className='content-title'>
                            Overview
                        </h1>
                        <p className='overview'>
                            {data.overview}
                        </p>
                    </div>
                </div>
            </div>

            <div className='main-div'>
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

                <img src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`} className='bg-img' />
                <div className='bg-div'>
                    <div className='content-div'>

                        <img src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} className='poster-img' />

                        <div className='content'>
                            <div className='name-div'>
                                <h1 className='content-title'>
                                    {data.original_name ? data.name : data.title}
                                </h1>
                                <span>{data.tagline}</span>
                            </div>
                            <div style={{ display: "flex", gap: "1rem" }}>
                                {data.genres.map((item) => (
                                    <p className='genres'>{item.name}</p>
                                ))}
                            </div>
                            <div className='info-div'>

                                <p>Release Date :- {data.release_date}</p>
                                <div className='pc-percent-trailer'>
                                    <div className='pc-percentage'>
                                        {Math.ceil(data.vote_average * 10) >= 70 ?
                                            <CircularProgressbar
                                                value={Math.ceil(data.vote_average * 10)}
                                                text={`${Math.ceil(data.vote_average * 10)}%`}
                                                styles={buildStyles(
                                                    stylesAboveSeventy
                                                )}
                                            />
                                            :
                                            Math.ceil(data.vote_average * 10) >= 40
                                                ?
                                                <CircularProgressbar
                                                    value={Math.ceil(data.vote_average * 10)}
                                                    text={`${Math.ceil(data.vote_average * 10)}%`}
                                                    styles={buildStyles(
                                                        stylesAboveForty
                                                    )}
                                                />
                                                :
                                                <CircularProgressbar
                                                    value={Math.ceil(data.vote_average * 10)}
                                                    text={`${Math.ceil(data.vote_average * 10)}%`}
                                                    styles={buildStyles(
                                                        stylesRemaining
                                                    )}
                                                />
                                        }
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
                                            onClick={() => handleWatchListClick()}
                                        >
                                            Add to watchlist
                                        </Link>
                                        <Dialog
                                            open={open}
                                            onClose={handleClose}
                                            aria-labelledby="alert-dialog-title"
                                            aria-describedby="alert-dialog-description"
                                        >
                                            <DialogContent className='youtube-video'>
                                                <iframe
                                                    src={`https://www.youtube.com/embed/${filteredTrailers[0]?.key}`}
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
                                    Directed By :-
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
                <div className="cast-title-div">
                    <h1 className="cast-title">Cast</h1>
                </div>
                <div className="cast-div">
                    {data?.credits?.cast?.map((item) => (
                        <div className='cast-img-name'>
                            {item.profile_path ?
                                <img src={`https://image.tmdb.org/t/p/w500${item.profile_path}`} className='cast-img' />
                                :
                                <img src={myImage} className='cast-img img-not-found' />
                            }
                            <h1 className='cast-name'>{item.name}</h1>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
