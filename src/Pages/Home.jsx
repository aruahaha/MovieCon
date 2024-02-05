import React, { Suspense } from "react";
import { Await, defer, useLoaderData } from "react-router";
import { getPopularMovies, getTrendingMovies , getPopularTvShows } from "../api";
import "./Home.css";


import CardScroller from "../Component/CardScroller";
import HomeCarousel from "../Component/HomeCarousel";

import { Link } from "react-router-dom";
import Trailers from "../Component/Trailers";


export async function loader() {
    return defer({
        trendingMovies: getTrendingMovies(),
        popularMovies: getPopularMovies(1),
        tvShows: getPopularTvShows(),
    });
}


export default function Home() {

    const movies = useLoaderData()
    
    return (
        <div className="main-home-div">
            <div>
                <Suspense fallback={<h1>Loading...</h1>}>
                    <Await resolve={movies.trendingMovies}>
                        {(trendingMovies) => (
                            <>
                                <HomeCarousel data={trendingMovies.results} />
                            </>
                        )}
                    </Await>
                    <Await resolve={movies.popularMovies}>
                        {(popularMovies) => (
                            <>
                                <div className="popular-title-div">
                                    <h1 className="popualr-movie-title">Popular Movies</h1>
                                    <Link className="popular-more">More...</Link>
                                </div>
                                <CardScroller data={popularMovies.results} />
                                
                            </>
                        )}
                    </Await>
                    <Await resolve={movies.tvShows}>
                        {(tvShows) => (
                            <>
                                <div className="popular-title-div">
                                    <h1 className="popualr-movie-title">Tv Shows</h1>
                                    <Link className="popular-more">More...</Link>
                                </div>
                                <CardScroller data={tvShows.results} />
                            </>
                        )}
                    </Await>
                </Suspense>
            </div>
        </div>
    )
}