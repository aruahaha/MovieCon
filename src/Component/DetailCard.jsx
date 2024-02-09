import React, { useEffect, useState } from 'react'
import "./DetailCard.css"
import { getTrailers } from '../api';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';



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

export default function DetailCard({ data }) {
    const { id } = useParams();
    const [trailer, setTrailer] = useState(null);
    const [open, setOpen] = React.useState(false);

   

    

    useEffect(() => {
        const fetchTrailer = async () => {
            const trailersData = await getTrailers(id);
            setTrailer(trailersData);
        };

        fetchTrailer().catch(console.error);
    }, [id]);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };



    const filteredTrailers = trailer ? trailer.results.filter(trailer => trailer.type === 'Trailer') : [];

    return (
        <>
            <div className='phone-main-div'>
                <img src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`} className='phone-img' />
                <div className='content'>
                    <div className='name-div'>
                        <h1 className='content-title'>
                            {data.original_language.toLowerCase() === 'en' ? data.original_title || data.original_name : data.title}
                        </h1>
                        <span>{data.tagline}</span>
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
                        <div>
                            <h1 className='content-title'>Genres</h1>
                            <div style={{ display: "flex", gap: "1rem" }}>
                                {data.genres.map((item) => (
                                    <p className='genres'>{item.name}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='main-div'>
                <img src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`} className='bg-img' />
                <div className='bg-div' >
                    <div className='content-div'>
                        <img src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} className='poster-img' />
                        <div className='content'>
                            <div className='name-div'>
                                <h1 className='content-title'>
                                    {data.original_language ? data.original_title || data.original_name : data.title}
                                </h1>
                                <span>{data.tagline}</span>
                            </div>
                            <div className='info-div'>
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
                                        <Link
                                            className='carousel-more-btn play-btn'
                                            onClick={handleClickOpen}
                                        >
                                            Trailer<PlayArrowIcon />
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
                                <h1 className='content-title'>Genres</h1>
                                <div style={{ display: "flex", gap: "1rem" }}>
                                    {data.genres.map((item) => (
                                        <p className='genres'>{item.name}</p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
