// Load dependencies
const express = require('express')
const router = express.Router()
const axios = require('axios')
const { OMDB_KEY, TMDB_KEY } = require('../../config')

const url = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_KEY}`
const url2 = `http://www.omdbapi.com/?apikey=${OMDB_KEY}`


const getMovies = (url, url2, queryObj) => {
  console.log(queryObj)
  return new Promise(async (resolve, reject) => {
    // dont confuse with response
    try {
      // possibly do an if statement that checks for queryObj.<apiendpoint> and routes to url2 if true
      // const queryObj = { t: 'A ', page: 2 }
      const apiOneResponse = await axios.get(url, {params: queryObj.apiOne})
      // console.log('we made it')
      const apiTwoResponse = await axios.get(url2, {params: queryObj.apiTwo})
      // console.log('We made it!!!')
      const url3 = `https://api.themoviedb.org/3/movie/${apiOneResponse.data.results[0].id}/videos?api_key=${TMDB_KEY}`
      const apiTwoVideoResponse = await axios.get(url3)
      // console.log('apiTwoResponse', apiOneResponse)
      // console.log('apiOneResponse.body', apiOneResponse.data)
      // console.log(apiTwoResponse)
      const data = {theMovieDB: apiOneResponse.data, openMovieDB: apiTwoResponse.data, tmdbVideo: apiTwoVideoResponse.data.results} 
      // console.log('data',data)
      resolve(data)
    } catch (err) {
      console.log(err)
      reject(err)
      
    } 
  })
}

router.post('/', async (req, res) => {
  // get is arbitrary -- more semantic than functional
  // console.log('req.body', req.body)
  try {
  const movieData = await getMovies(url, url2, req.body)
  // console.log('movieData', movieData)
  res.json(movieData)
  }
  catch(error) {
    console.log('Error', error)
  }
})

module.exports = router
