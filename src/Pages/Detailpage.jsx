import React, { Suspense } from 'react'
import { Await, defer, useLoaderData, useParams } from 'react-router'
import { getMovieById, getTrendingMovies } from '../api'
import DetailCard from '../Component/DetailCard'


export function loader({ params }) {
  return defer({
  movie: getMovieById(params.id),
  })
}

export default function Detailpage() {
  const movie = useLoaderData()

  return (
    <>
      <Suspense fallback={<h1>Loading..</h1>}>
        <Await resolve={movie?.movie}>
          {(movie) => (
            <DetailCard data={movie}  />
          )}
        </Await>
      </Suspense>

    </>
  )
}
