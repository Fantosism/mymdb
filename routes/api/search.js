// Load dependencies
const express = require('express')
const router = express.Router()
const axios = require('axios')
const { OMDB_KEY, TMDB_KEY } = require('../../config')

const url = `http://www.omdbapi.com/?apikey=${OMDB_KEY}&`
// const url2 = `https://api.themoviedb.org/3/movie/550?api_key=${TMDB_KEY}&`

const getMovies = (url, queryObj) => {
  return new Promise(async (resolve, reject) => {
    // dont confuse with response
    try {
      // const queryObj = { t: 'A ', page: 2 }
      const response = await axios.get(url, {
        ...queryObj,
      })
      const data = response.data
      console.log(data)
      resolve(data)
    } catch (err) {
      console.log(err)
    }
  })
}

router.post('/', async (req, res) => {
  // get is arbitrary -- more semantic than functional
  console.log('req.body', req.body)
  const movieData = await getMovies(url)
  res.json(movieData)
})

module.exports = router
