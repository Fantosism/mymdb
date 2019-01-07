import {
  SEARCH_MOVIE_REQUEST,
  SEARCH_MOVIE_SUCCESS,
  SEARCH_MOVIE_ERROR,
} from '../actions/types'

const initialState = {
  movie: [],
  loading: false,
  error: null,
}

export default (state = initialState, action) => {
  // Handle these sync actions
  switch (action.type) {
    case SEARCH_MOVIE_REQUEST:
      return { ...state, loading: true }
    case SEARCH_MOVIE_SUCCESS:
      return { ...state, movie: action.movie, loading: false }
    case SEARCH_MOVIE_ERROR:
      return { ...state, error: action.error, loading: false }
    default:
      return state
  }
}
