import React, { Suspense } from 'react'
import { Await, defer, useLoaderData, useParams } from 'react-router'
import { getTvShowById, getTrendingMovies } from '../api'
import DetailCard from '../Component/DetailCard'
import Loading from '../Component/Loading'

export function loader({ params }) {
  return defer({
  tvshow: getTvShowById(params.id),
  })
}

export default function Detailpage() {
  const tvshow = useLoaderData()

  return (
    <>
      <Suspense fallback={<Loading/>}>
        <Await resolve={tvshow?.tvshow}>
          {(tvshow) => (
            <DetailCard data={tvshow}  />
          )}
        </Await>
      </Suspense>
    </>
  )
}