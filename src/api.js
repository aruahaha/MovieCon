import React from "react";
export async function getPopularMovies(page) {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_API_KEY}&page=${page}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching popular movies:', error);
        throw error;
    }
}

export async function getPopularTvShows() {
    const url = `http://api.themoviedb.org/3/tv/popular?api_key=${import.meta.env.VITE_API_KEY}&page=1`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching popular tv shows:', error);
        throw error;
    }

}


export async function getTrendingMovies() {
    const url = `https://api.themoviedb.org/3/trending/all/day?api_key=${import.meta.env.VITE_API_KEY}&language=en-US`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching trending movies:', error);
        throw error;
    }
}


export async function getMovieById(id) {

    const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=${import.meta.env.VITE_API_KEY}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching movie:', error);
        throw error;
    }
    
}


export async function getTrailers(id) {
    const url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${import.meta.env.VITE_API_KEY}&language=en-US`;
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Failed to fetch trailers. HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        data.results.filter((video) => video.type === 'Trailer') ;
        return data;
    } catch (error) {
        // throw new Error(`Error in getTrailers: ${error.message}`);
    }
}


