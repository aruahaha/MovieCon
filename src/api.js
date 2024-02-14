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


export async function getPopularTvShows(page) {
    const url = `https://api.themoviedb.org/3/tv/popular?api_key=${import.meta.env.VITE_API_KEY}&page=${page}`;
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
    const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${import.meta.env.VITE_API_KEY}&language=en-US`;

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
    const movieUrl = `https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=${import.meta.env.VITE_API_KEY}`;
    const creditsUrl = `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US&api_key=${import.meta.env.VITE_API_KEY}`;

    try {
        const movieResponse = await fetch(movieUrl);
        if (!movieResponse.ok) {
            throw new Error(`HTTP error! Status: ${movieResponse.status}`);
        }
        const movieData = await movieResponse.json();


        const creditsResponse = await fetch(creditsUrl);
        if (!creditsResponse.ok) {
            throw new Error(`HTTP error! Status: ${creditsResponse.status}`);
        }
        const creditsData = await creditsResponse.json();


        const movieWithCredits = {
            ...movieData,
            credits: creditsData
        };

        return movieWithCredits;
    } catch (error) {
        console.error('Error fetching movie:', error);
        throw error;
    }
}



export async function getTvShowById(id) {

    const url = `https://api.themoviedb.org/3/tv/${id}?language=en-US&api_key=${import.meta.env.VITE_API_KEY}`;
    const creditsUrl = `https://api.themoviedb.org/3/tv/${id}/credits?language=en-US&api_key=${import.meta.env.VITE_API_KEY}`;

    try {
        const tvshowResponse = await fetch(url);
        if (!tvshowResponse.ok) {
            throw new Error(`HTTP error! Status: ${tvshowResponse.status}`);
        }
        const tvshowData = await tvshowResponse.json();


        const creditsResponse = await fetch(creditsUrl);
        if (!creditsResponse.ok) {
            throw new Error(`HTTP error! Status: ${creditsResponse.status}`);
        }
        const creditsData = await creditsResponse.json();


        const tvshowWithCredits = {
            ...tvshowData,
            credits: creditsData
        };

        return tvshowWithCredits;
    } catch (error) {
        console.error('Error fetching tv show:', error);
        throw error;
    }

}


export async function getTrailers(id,type) {
    const url = `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${import.meta.env.VITE_API_KEY}&language=en-US`;
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Failed to fetch trailers. HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Error in getTrailers: ${error.message}`);
    }
}

// export async function getTvTrailers(id,type) {
//     const url = `https://api.themoviedb.org/3${type}${id}/videos?api_key=${import.meta.env.VITE_API_KEY}&language=en-US`;
//     try {
//         const response = await fetch(url);

//         if (!response.ok) {
//             throw new Error(`Failed to fetch trailers. HTTP error! Status: ${response.status}`);
//         }

//         const data = await response.json();
//         return data;
//     } catch (error) {
//         throw new Error(`Error in getTrailers: ${error.message}`);
//     }
// }

export async function getSearch(query) {
    const url = `https://api.themoviedb.org/3/search/multi?api_key=${import.meta.env.VITE_API_KEY}&query=${query}&include_adult=false&language=en-US&page=1`;
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Failed to fetch trailers. HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        
        return data;
    } catch (error) {
        throw new Error(`Error in getTrailers: ${error.message}`);
    }
}

export async function getGenre(type) {
    let url = ``

    if(type === "movie"){
        url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.VITE_API_KEY}`;
    } else if (type === "tv"){
        url = `https://api.themoviedb.org/3/genre/tv/list?api_key=${import.meta.env.VITE_API_KEY}`;
    }
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Failed to fetch trailers. HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Error in getTrailers: ${error.message}`);
    }
}

export async function getMovieByGenre(genreid,page) {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&with_genres=${genreid}&page=${page}`;
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Failed to fetch trailers. HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Error in getTrailers: ${error.message}`);
    }
}

export async function getTvshowsByGenre(genreid,page) {
    const url = `https://api.themoviedb.org/3/discover/tv?api_key=${import.meta.env.VITE_API_KEY}&with_genres=${genreid}&page=${page}`;
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Failed to fetch trailers. HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Error in getTrailers: ${error.message}`);
    }
}

export async function getMovieListDetails(ids) {
    if(!ids) {
        return
    }
    const urls = ids?.map(id => `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_API_KEY}`);
    try {
        const responses = await Promise.all(urls?.map(url => fetch(url)));
        const moviesData = await Promise.all(responses?.map(res => res.json()));
        // console.log(moviesData);
        return moviesData;
    } catch (error) {
        throw error;
    }
}

export async function getTvListDetails(ids) {
    if(!ids) {
        return
    }
    const urls = ids?.map(id => `https://api.themoviedb.org/3/tv/${id}?api_key=${import.meta.env.VITE_API_KEY}`);
    try {
        const responses = await Promise.all(urls?.map(url => fetch(url)));
        const tvData = await Promise.all(responses?.map(res => res.json()));
        // console.log(tvData);
        return tvData;
    } catch (error) {
        throw error;
    }
}






