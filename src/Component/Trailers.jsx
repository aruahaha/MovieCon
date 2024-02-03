import React from 'react'
import "./Trailers.css"
import YouTube from 'react-youtube'

export default function Trailers(props) {
    return (
        <>
            <div className='trailer-main-div'>
                <div className='trailer-title-div'>
                    <h1 className='trailer-title'>Trailers</h1>
                </div>
                {props.data.map((movie) => (
                    <>
                        <div>
                            {movie.name}
                        </div>
                    </>
                ))}
            </div>
        </>
    )
}
