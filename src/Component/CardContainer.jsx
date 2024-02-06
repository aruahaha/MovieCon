import React from 'react'
import "./CardContainer.css"


export default function CardContainer({ data }) {

    return (
        <>
            <div className='movies-div'>
                {data.results.map((item,index) => (
                    <div className='movies-content' key={index}>
                        <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} className='movies-img' />
                    </div>
                ))}
            </div>
        </>
    )
}
