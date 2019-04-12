const express = require('express')
const router = express.Router()
const axios = require('axios')
const { OMDB_KEY, TMDB_KEY, YOUTUBE_KEY } = require('../../config')

const url = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_KEY}`
const url2 = `http://www.omdbapi.com/?apikey=${OMDB_KEY}`

const getMovies = (url, url2, queryObj) => {
  return new Promise(async (resolve, reject) => {
    try {
      const apiOneResponse = await axios.get(url, { params: queryObj.apiOne })
      const apiTwoResponse = await axios.get(url2, { params: queryObj.apiTwo })

      const data = {
        theMovieDB: apiOneResponse.data,
        openMovieDB: apiTwoResponse.data,
      }
      resolve(data)
    } catch (err) {
      console.log(err)
      reject(err)
    }
  })
}

router.post('/', async (req, res) => {
  try {
    const movieData = await getMovies(url, url2, req.body)
    res.json(movieData)
  } catch (error) {
    console.log('Error', error)
  }
})

module.exports = router
