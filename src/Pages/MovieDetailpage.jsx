import React, { Suspense } from 'react'
import { Await, defer, useLoaderData, useParams } from 'react-router'
import { getMovieById, getTrendingMovies } from '../api'
import DetailCard from '../Component/DetailCard'
import Loading from '../Component/Loading'

export function loader({ params }) {
  return defer({
  movie: getMovieById(params.id),
  })
}

export default function Detailpage() {
  const movie = useLoaderData()

  return (
    <>
      <Suspense fallback={<Loading/>}>
        <Await resolve={movie?.movie}>
          {(movie) => (
            <DetailCard data={movie}  />
          )}
        </Await>
      </Suspense>
    </>
  )
}
