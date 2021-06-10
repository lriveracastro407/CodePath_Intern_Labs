//Global Constants
//connect html to js
//get API information
//create html in js
/* HTML to JS connectors */
const movieForm = document.querySelector('form')
const movieArea = document.querySelector('#movie-area')
const loadButton = document.querySelector('.hidden')
const searchinput = document.querySelector('#searchinput')
const searchForm = document.querySelector('#searchform')
/** API variables */
const api_key = '765ece2c111fb5c30abfeb28d365ac2c'
var pageNum = 1
var ps
//tmdb images: https://api.themoviedb.org/3/movie/{movie_id}/images?api_key=<<api_key>>&language=en-US |
//| https://image.tmdb.org/t/p/w500/8uO0gUM8aNqYLs1OsTBQiXu0fEv.jpg
// http://image.tmdb.org/t/p/ + configuration.images.poster_sizes[5]
//search https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&page=1&include_adult=false

//popular -> query to show page num -> counter goes
//img https://www.themoviedb.org/t/p/w600_and_h900_bestv2/%7Bposterpath%7D.jpg
//get movies function
//display movies function + innerHTML
//handle form submit (for search)
//load more button

//Load Popular Movies
async function popMovies() {
    ps = 0 //loadbutton uses popMovies
    const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=' + api_key + '&language=en-US&page=' + pageNum)
    //console.log(response)
    const responseData =  await response.json()
    //console.log(responseData.results)
    getMovieinfo(responseData)
}

async function searchMovies(input) {
    const searchRes = await fetch('https://api.themoviedb.org/3/search/movie?api_key=' + api_key + '&language=en-US&query=' + input +'&page=' + pageNum + '&include_adult=false')
    console.log(searchRes)          //https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&query=fightclub&page=1&include_adult=false
    const searchData = await searchRes.json()
    console.log(searchRes)
    //getMovieinfo(searchData)
    return searchData
}
//Grabs movie information from API
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
async function loadMore(event) {
    event.preventDefault()
    pageNum++
    //if (ps = 0) {
        popMovies()
    //} else {
        //handleFormSubmit()
    //}
    

}
async function handleFormSubmit(event) {
    event.preventDefault()
    movieArea.innerHTML = ''
    currSearch = searchinput.value
    console.log(currSearch)
    pageNum = 1
    ps = 1 //loadbutton loads search
    const result = await searchMovies(currSearch)
    getMovieinfo(result)
    searchinput.value = ''

    
}



loadButton.addEventListener('click', loadMore)
searchForm.addEventListener('submit', handleFormSubmit)
popMovies()
