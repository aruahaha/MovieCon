import React, { Suspense } from 'react'
import CardContainer from '../Component/CardContainer'
import { Await, defer, useLoaderData } from 'react-router'
import { getGenre, getPopularTvShows, getTvshowsByGenre } from '../api'
import { Pagination } from '@mui/material'
import { useSearchParams } from 'react-router-dom'

import Loading from '../Component/Loading'
import Filter from '../Component/Filter'


export function loader({ request }) {
  const page = new URL(request.url).searchParams.get("page")
  const genre = new URL(request.url).searchParams.get("genre")
  if (genre) {
    return defer({
      tvshows: getTvshowsByGenre(genre, page),
      genre: getGenre("tv")
    })
  } else {
    return defer({
      tvshows: getPopularTvShows(page),
      genre: getGenre("tv")
    })
  }
}



export default function TvShows() {

  const data = useLoaderData()
  
  const [searchParams, setSearchParams] = useSearchParams()
  const page = Number(searchParams.get("page"))

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  function handlePageChange(event, value) {
    if (searchParams.get("genre")) {
      setSearchParams({ page: value, genre: searchParams.get("genre") })
    } else {
      setSearchParams({ page: value })
    }
  }

  return (
    <>
      <Suspense fallback={<Loading />}>
        <Await resolve={data.genre}>
          {(genre) => (
            <Filter data={genre} name={"Shows"} />
          )}
        </Await>
        <Await resolve={data.tvshows}>
          {(item) => (
            <CardContainer data={item.results} toLink="/tv/" />
          )}
        </Await>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "50px" }}>
          <Pagination
            count={page + 10}
            page={page}
            onChange={handlePageChange}
            onClick={scrollToTop}
          />
        </div>
      </Suspense>
    </>
  )
}
