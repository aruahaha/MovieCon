import React, { Suspense } from 'react'
import CardContainer from '../Component/CardContainer'
import { Await, defer, useLoaderData } from 'react-router'
import { getPopularMovies } from '../api'
import { Pagination } from '@mui/material'
import { useSearchParams } from 'react-router-dom'

import Loading from '../Component/Loading'


export function loader({ request }) {
  const page = new URL(request.url).searchParams.get("page")
  return defer({ movies: getPopularMovies(page) })
}



export default function Movies() {
  
  const movies = useLoaderData()
  const [searchParams, setSearchParams] = useSearchParams()
  const page = Number(searchParams.get("page"))

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  
  function handlePageChange(event, value) {
    setSearchParams({ page: value })
  }

  return (
    <>
      <Suspense fallback={<Loading/>}>
        <Await resolve={movies.movies}>
          {(item) => (
            <CardContainer data={item} />
          )}
        </Await>
        <div style={{display:"flex" , justifyContent:"center", marginBottom:"50px"}}> 
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
