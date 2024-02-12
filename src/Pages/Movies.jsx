import React, { Suspense, useState } from 'react'
import CardContainer from '../Component/CardContainer'
import { Await, defer, useLoaderData } from 'react-router'
import { getGenre, getMovieByGenre, getPopularMovies } from '../api'
import { Pagination } from '@mui/material'
import { useSearchParams } from 'react-router-dom'


import Loading from '../Component/Loading'
import { dark } from '@mui/material/styles/createPalette'
import Filter from '../Component/Filter'


export function loader({ request }) {
  const page = new URL(request.url).searchParams.get("page")
  const genre = new URL(request.url).searchParams.get("genre")
  if (genre) {
    return defer({
      movies: getMovieByGenre(genre, page),
      genre: getGenre("movie")
    })
  } else {
    return defer({
      movies: getPopularMovies(page),
      genre: getGenre("movie")
    })
  }
}

export default function Movies() {
  const data = useLoaderData()
  const [searchParams, setSearchParams] = useSearchParams()
  const [loading, setLoading] = useState(false)
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
    setLoading(true);
    setTimeout(() => {
      setLoading(false)
    }, 10)
  }

  return (
    <>
      <Suspense fallback={<Loading />}>
        <Await resolve={data.genre}>
          {(genre) => (
            <Filter data={genre} />
          )}
        </Await>
        <Await resolve={data.movies}>
          {(movies) => (
            <>
              {loading ? <Loading /> : <CardContainer data={movies} toLink="/movie/" />}
            </>
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
