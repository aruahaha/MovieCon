import React from "react";
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import "./App.css"

import Layout from "./Component/Layout";
import Home, { loader as HomePageLoader } from "./Pages/Home";

import Movies from "./Pages/Movies";
import TvShows from "./Pages/TvShows";


import Detailpage from "./Pages/Detailpage";



const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} loader={HomePageLoader} />
    <Route path="/movies" element={<Movies />} />
    <Route path="/tvshows" element={<TvShows />} />
    <Route path="/movie/:id" element={<Detailpage />} />
  </Route>

))




export default function App() {
  return (
    <RouterProvider router={router} />
  )
}
