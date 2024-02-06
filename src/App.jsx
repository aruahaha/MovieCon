import React, { Suspense } from "react";
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, useRouteError } from "react-router-dom";

import "./App.css"
import ErrorBoundary from "./Component/ErrorBoundary";

import Layout from "./Component/Layout";
import Home, { loader as HomePageLoader } from "./Pages/Home";

import Movies ,{loader as MoviePageLoader}from "./Pages/Movies";
import TvShows from "./Pages/TvShows";

import MovieDetailpage, { loader as MovieDetailPageLoader } from "./Pages/MovieDetailpage";
import TvDetailpage, { loader as TvDetailPageLoader } from "./Pages/TvDetailpage";


const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} loader={HomePageLoader} />
    <Route path="/movies" element={<Movies />} loader={MoviePageLoader} />
    <Route path="/tvshows" element={<TvShows />} />
    <Route path="/movie/:id" element={<MovieDetailpage />} loader={MovieDetailPageLoader} errorElement={<ErrorBoundary/>}/>
    <Route path="/tv/:id" element={<TvDetailpage />} loader={TvDetailPageLoader} errorElement={<ErrorBoundary/>}/>
  </Route>
));


export default function App() {
  return (
    <RouterProvider router={router} />
  );
}