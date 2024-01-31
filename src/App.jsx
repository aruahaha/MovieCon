import React from "react";
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import "./App.css"

import Layout from "./Component/Layout";
import Home from "./Pages/Home";


const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
  </Route>

))




export default function App() {
  return (
<<<<<<< HEAD
    <h1>Hello</h1>
=======
    <RouterProvider router={router} />
>>>>>>> development
  )
}
