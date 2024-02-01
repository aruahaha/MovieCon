import React from "react";
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import "./App.css"

import Layout from "./Component/Layout";
import Home, {loader as HomePageLoader} from "./Pages/Home";




const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />}>
      <Route index element={<Home />} loader={HomePageLoader} />
  </Route>

))




export default function App() {
  return (
    <RouterProvider router={router} />
  )
}
