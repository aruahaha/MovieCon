import React from 'react'
import "./DetailCard.css"

export default function DetailCard(props) {

    return (
        <>
            <div className='main-detail-page-div' >
                <img src={`https://image.tmdb.org/t/p/original${props.data.backdrop_path}`} className='detail-page-bg-img' />
                <div className='detail-page-content-div'>
                    <div className='detail-page-content'>
                        <img src={`https://image.tmdb.org/t/p/w500${props.data.poster_path}`} className='detail-page-poster-img' />
                        <div className='detail-page-content-data'>
                            <h1 className='content-title'>{props.data.original_language.toLowerCase() === 'en' ? props.data.original_title || props.data.original_name : movie.title}
                            </h1>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}
