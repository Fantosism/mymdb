import axios from 'axios'
import { searchMovieRequest, searchMovieSuccess, searchMovieError } from './types'

const searchMovies = query => dispatch => {
  console.log('query', query)
  dispatch(searchMovieRequest())
  axios.post('/api/search/', query)
  .then(res => dispatch(searchMovieSuccess(res)))
  .then(res => {
    const { data } = res.movie
    console.log(data.theMovieDB, data.openMovieDB, data.tmdbVideo)
  })
  .catch(err => dispatch(searchMovieError(err)))
}

export default searchMovies

  // return fetch(`https://swapi.co/api/people/?search=${name}`)
  //   .then(res => {
  //     if (!res.ok) {
  //       return Promise.reject(res.statusText)
  //     }
  //     return res.json()
  //   })
  //   .then(data => data.results.map(character => character.name))
