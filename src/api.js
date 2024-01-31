import React from "react";

export function getPopularMovies() {

    const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
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
