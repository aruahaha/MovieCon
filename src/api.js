import React from "react";
import axios from "axios"

export async function getPopularMovies(page) {
    const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_AUTHORIZATION_KEY}`
        }
    };

    try {
        const response = await fetch(url, options);
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

export function getMovieById() {

    const url = 'https://api.themoviedb.org/3/movie/1927?language=en-US';
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MzM5ZjNjOWY0ZTg1NTM2MjRmZjNmN2YzOWE0M2Q4ZiIsInN1YiI6IjY1YjhkNWFmNDZlNzVmMDE4M2JiNmJiOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eALEQTXSdrHEG8WbyhGz2oegp9QQMUkrPnvLCFO50Ug'
        }
    };

    fetch(url, options)
        .then(res => res.json())
        .then(json => console.log(json))
        .catch(err => console.error('error:' + err));

}

export function getDataBySearch() {

    const url = 'https://api.themoviedb.org/3/search/multi?query=tony%20stark&include_adult=false&language=en-US&page=1';
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MzM5ZjNjOWY0ZTg1NTM2MjRmZjNmN2YzOWE0M2Q4ZiIsInN1YiI6IjY1YjhkNWFmNDZlNzVmMDE4M2JiNmJiOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eALEQTXSdrHEG8WbyhGz2oegp9QQMUkrPnvLCFO50Ug'
        }
    };

    fetch(url, options)
        .then(res => res.json())
        .then(json => console.log(json))
        .catch(err => console.error('error:' + err));

}


const options = {
    method: 'GET',
    url: 'https://translated-mymemory---translation-memory.p.rapidapi.com/get',
    params: {
        langpair: 'en|it',
        q: 'Hello World!',
        mt: '1',
        onlyprivate: '0',
        de: 'a@b.c'
    },
    headers: {
        'X-RapidAPI-Key': '1b4dced35cmsh8273578f4da5fd6p17ebc1jsn07f560ce806f',
        'X-RapidAPI-Host': 'translated-mymemory---translation-memory.p.rapidapi.com'
    }
};

try {
    const response = await axios.request(options);
    console.log(response.data);
} catch (error) {
    console.error(error);
}