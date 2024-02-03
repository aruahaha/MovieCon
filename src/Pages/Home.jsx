import React, { Suspense, useEffect, useState } from "react";
import { useMediaQuery } from 'react-responsive';
import { Await, defer, useLoaderData } from "react-router";
import { getPopularMovies, getTrailers, getTrendingMovies } from "../api";
import "./Home.css";
import myImage from "/images/pxfuel2.jpg";
import myPhoneImage from "/images/pxfuel2phone.jpg";

import HomeCarousel from "../Component/HomeCarousel";
import PopularMovie from "../Component/PopularMovie";

import { Link } from "react-router-dom";

export async function loader() {
    return defer({
        trendingMovies: getTrendingMovies(),
        popularMovies: getPopularMovies(1),
        trailers: getTrailers(1927)
    });
}


const pcHomeImages = [myImage]
const phoneHomeImages = [myPhoneImage]

export default function Home() {

    const [pcImage, setPcImage] = useState([])
    const screen = useMediaQuery({ query: `(max-width:800px)` })

    const popularMovies = useLoaderData()
    const trendingMovies = useLoaderData()
    const trailers = useLoaderData()

    useEffect(() => {

        if (screen) {
            setPcImage(phoneHomeImages);
        } else {
            setPcImage(pcHomeImages);
        }

    }, [screen])

    return (
        <div className="main-home-div">
            <div>
                <Suspense fallback={<h1>Loading...</h1>}>
                    <Await resolve={trendingMovies.trendingMovies}>
                        {(trendingMovies) => (
                            <>
                                <HomeCarousel data={trendingMovies.results} />
                            </>
                        )}
                    </Await>
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
                    {/* <Await resolve={trailers.trailers}>
                        {(trailers) => (
                            <>
                                <Trailers data={trailers} />
                            </>
                        )}
                    </Await> */}
                </Suspense>
            </div>
        </div>
    )
}