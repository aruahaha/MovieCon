import React, { Suspense, useState } from "react";
import { Await, defer, useLoaderData } from "react-router";
import { getMovieListDetails, getTvListDetails } from "../api";
import Loading from "../Component/Loading";
import CardContainer from "../Component/CardContainer";
import "./Watchlist.css"
import SyncAltIcon from '@mui/icons-material/SyncAlt';

export function loader() {
    return defer({
        movieWatchlist: getMovieListDetails(JSON.parse(localStorage.getItem("movieIds")) || []),
        tvWatchlist: getTvListDetails(JSON.parse(localStorage.getItem("tvIds")) || [])
    })
}

export default function WatchList() {
    const data = useLoaderData();
    const [switchlist, setSwitchlist] = useState("Movies")

    const handleSwitch = () => {
        setSwitchlist(prev => prev === "Movies" ? "Tv Shows" : "Movies")
    }


    return (
        <>
            <Suspense fallback={<Loading />}>
                <Await
                    resolve={Promise.all([data.movieWatchlist, data.tvWatchlist]).then(value => value)}
                >
                    {(data) => {
                        const [movieWatchlist, tvWatchlist] = data
                        console.log(movieWatchlist)
                        return (
                            <>
                                <div className="watchlist-btns">
                                    <h1 className="title">{switchlist}</h1>
                                    <button onClick={handleSwitch} className="switch-btn">Switch to {switchlist === "Movies" ? "Tv Shows" : "Movies"}</button>
                                </div>
                                {switchlist === "Movies" ?
                                    <CardContainer data={movieWatchlist} toLink="/movie/" />
                                    :
                                    <CardContainer data={tvWatchlist} toLink="/tv/" />
                                }
                            </>
                        )
                    }}
                </Await>
            </Suspense>
        </>
    );
}
