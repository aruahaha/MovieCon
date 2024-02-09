import React, { Suspense } from 'react'
import CardContainer from '../Component/CardContainer'
import { Await, defer, useLoaderData } from 'react-router'
import { getPopularTvShows} from '../api'
import { Pagination } from '@mui/material'
import { useSearchParams } from 'react-router-dom'

import Loading from '../Component/Loading'


export function loader({ request }) {
  const page = new URL(request.url).searchParams.get("page")
  console.log(page)
  return defer({ tvshows: getPopularTvShows(page) })
}



export default function TvShows() {
  
  const tvshows = useLoaderData()
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
        <Await resolve={tvshows?.tvshows}>
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
