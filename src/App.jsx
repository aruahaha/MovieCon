import React, { Suspense } from "react";
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, useRouteError } from "react-router-dom";

import "./App.css"
import ErrorBoundary from "./Component/ErrorBoundary";

import Layout from "./Component/Layout";
import Home, { loader as HomePageLoader } from "./Pages/Home";
import Movies ,{loader as MoviesPageLoader}from "./Pages/Movies";
import TvShows , {loader as TvShowsPageloader}from "./Pages/TvShows";

import MovieDetailpage, { loader as MovieDetailPageLoader } from "./Pages/MovieDetailpage";
import TvDetailpage, { loader as TvShowDetailPageLoader } from "./Pages/TvDetailpage";

import SearchPage from "./Pages/SearchPage";

import WatchList,{loader as WatchlistLoader} from "./Pages/Watchlist";


const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} loader={HomePageLoader} />
    <Route path="/search" element={<SearchPage/>}/>
    <Route path="/movies" element={<Movies />} loader={MoviesPageLoader} />
    <Route path="/tvshows" element={<TvShows />} loader={TvShowsPageloader}/>
    <Route path="/movie/:id" element={<MovieDetailpage />} loader={MovieDetailPageLoader} errorElement={<ErrorBoundary/>}/>
    <Route path="/tv/:id" element={<TvDetailpage />} loader={TvShowDetailPageLoader} errorElement={<ErrorBoundary/>}/>
    <Route path="/watchlist" element={<WatchList />} loader={WatchlistLoader} errorElement={<ErrorBoundary/>} />
  </Route>
));


export default function App() {
  return (
    <RouterProvider router={router} />
  );
}