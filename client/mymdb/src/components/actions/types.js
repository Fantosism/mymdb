export const GET_ERRORS = 'GET_ERRORS'
export const getErrors = error => ({
  type: GET_ERRORS,
  error,
})

export const USER_LOADING = 'USER_LOADING'
export const userLoading = () => ({
  type: USER_LOADING,
})

export const SET_CURRENT_USER = 'SET_CURRENT_USER'

export const SEARCH_MOVIE_REQUEST = 'SEARCH_MOVIE_REQUEST'
export const searchMovieRequest = () => ({
  type: SEARCH_MOVIE_REQUEST,
})

export const SEARCH_MOVIE_SUCCESS = 'SEARCH_MOVIE_SUCCESS'
export const searchMovieSuccess = movie => ({
  type: SEARCH_MOVIE_SUCCESS,
  movie,
})

export const SEARCH_MOVIE_ERROR = 'SEARCH_MOVIE_ERROR'
export const searchMovieError = error => ({
  type: SEARCH_MOVIE_ERROR,
  error,
})

