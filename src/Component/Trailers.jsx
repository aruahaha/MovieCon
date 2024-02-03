import React from 'react';
import './Trailers.css';
import YouTube from 'react-youtube/dist/YouTube';


export default function Trailers(props) {
    console.log(props)

    return (
        <>
            <div className='trailer-main-div'>
                <div className='trailer-title-div'>
                    <h1 className='trailer-title'>Trailers</h1>
                </div>
                {/* {movie && (
                    <div className='trailer-name-video'>
                        <div className='youtube-trailer-div'>
                            
                        </div>
                        <p>{movie.name}</p>
                    </div>
                )} */}
            </div>
        </>
    );
}
