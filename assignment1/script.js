//Global Constants
//connect html to js
//get API information
//create html in js
/* HTML to JS connectors */
const movieForm = document.querySelector('form')
const movieArea = document.querySelector('#movie-area')
const loadButton = document.querySelector('.hidden')
const search = document.querySelector('#search')
/** API variables */
const api_key = '765ece2c111fb5c30abfeb28d365ac2c'
var pageNum = 1
//tmdb images: https://api.themoviedb.org/3/movie/{movie_id}/images?api_key=<<api_key>>&language=en-US |
//| https://image.tmdb.org/t/p/w500/8uO0gUM8aNqYLs1OsTBQiXu0fEv.jpg
// http://image.tmdb.org/t/p/ + configuration.images.poster_sizes[5]
//rating: https://api.themoviedb.org/3/movie/{movie_id}/reviews?api_key=<<api_key>>&language=en-US&page=1
// /discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22
//popular -> query to show page num -> counter goes
//img https://www.themoviedb.org/t/p/w600_and_h900_bestv2/%7Bposterpath%7D.jpg
//get movies function
//display movies function + innerHTML
//handle form submit (for search)
//load more button

async function popMovies() {
    const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=765ece2c111fb5c30abfeb28d365ac2c&language=en-US&page=' + pageNum)
    console.log(response)
    const responseData =  await response.json()
    console.log(responseData.results)
    getMovieinfo(responseData)
}

function getMovieinfo(data) {
    data.results.forEach(movie => {
        let title = movie.title
        console.log(title)
        let rating = movie.vote_average
        console.log(rating)
        let poster = 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/' + movie.poster_path
        console.log(poster)
        addMovies(title, rating, poster)
    });
}
function addMovies(title, rating, poster) {
    movieArea.innerHTML += `
    <div class='movies'> 
    <img src=${poster} width=200px alt=${title}>
    <div class='tr'>
        <p>${title}</p>
        <p id='rating'>${rating}</p>
    </div>
    </div>
    `
}

popMovies()
