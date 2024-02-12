import React, { useState } from 'react'
import "./CardContainer.css"
import myImage from "/assets/images/no-image.png"
import { Link } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';


export default function CardContainer({ data, toLink }) {
    return (
        <>
            <div>
                <div className='movies-div'>
                    {data?.results?.map((item, index) => (
                        <Link to={item.media_type ? `/${item.media_type}/${item.id}` : toLink + item.id} style={{ textDecoration: "none" }} key={index}>
                            <div className='movies-content'>
                                <div className="card">
                                    {item.poster_path ?
                                        <LazyLoadImage
                                            src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                                            className='movies-img'
                                            effect='blur'
                                            wrapperProps={{
                                                style: { transitionDelay: "1s" },
                                            }}
                                            loading='lazy'
                                        />
                                        :
                                        <img src={myImage} className='movies-img' alt="No Poster Available" />
                                    }
                                    <div className="card__content">
                                        <p className="card__title">{item.name ? item.name : item.title}</p>
                                        <div className='description'>
                                            <p className="card__description">{item.release_date ? item.release_date : item.first_air_date}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    )
}
