import React, { Suspense, createContext, useEffect, useState } from "react";
import "./Home.css"
import myImage from "/images/pxfuel2.jpg"
import myPhoneImage from "/images/pxfuel2phone.jpg"
import { useMediaQuery } from 'react-responsive';
import SearchIcon from '@mui/icons-material/Search';
import { getPopularMovies, getTrendingMovies } from "../api";
import { Await, defer, useLoaderData } from "react-router";



import PopularMovie from "../Component/PopularMovie"
import HomeCarousel from "../Component/HomeCarousel";
import { Link } from "react-router-dom";

export async function loader() {
    return defer({
        trendingMovies: getTrendingMovies(),
        popularMovies: getPopularMovies(1)
    });
}


const pcHomeImages = [myImage]
const phoneHomeImages = [myPhoneImage]

export default function Home() {


    const [pcImage, setPcImage] = useState([])
    const screen = useMediaQuery({ query: `(max-width:800px)` })

    const popularMovies = useLoaderData()
    const trendingMovies = useLoaderData()

    useEffect(() => {

        if (screen) {
            setPcImage(phoneHomeImages);
        } else {
            setPcImage(pcHomeImages);
        }

    }, [screen])

    return (
        <div className="main-home-div">
            {/* <div className="home-search-img-div">
                <div className="home-img-container">
                    {pcImage && pcImage.map((image, i) => (
                        <img
                            src={image}
                            alt={`Slide ${i + 1}`}
                            className="home-img"
                        />
                    ))}
                    <div className="home-text-container">
                        <div className="scrolling-words-container">
                            <span>SEARCH ANY</span>
                            <div className="scrolling-words-box">
                                <ul>
                                    <li style={{ color: "orange" }}>MOVIE</li>
                                    <li style={{ color: "yellow" }}>TV SHOW</li>
                                    <li style={{ color: "#DB4A2B" }}>CAST</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

            <div>
                <Suspense fallback={<h1>Loading...</h1>}>
                    <Await resolve={trendingMovies.trendingMovies}>
                        {(trendingMovies) => (
                            <>
                                <HomeCarousel data={trendingMovies.results} />
                            </>
                        )}
                    </Await>
                </Suspense>
                <Suspense fallback={<h1>Loading...</h1>}>
                    <Await resolve={popularMovies.popularMovies}>
                        {(popularMovies) => (
                            <>
                                <div className="popular-title-div">
                                    <h1 className="popualr-movie-title">Popular Movies</h1>
                                    <Link className="popular-more">More...</Link>
                                </div>
                                <PopularMovie data={popularMovies.results} />
                            </>
                        )}
                    </Await>
                </Suspense>
            </div>
        </div>
    )
}