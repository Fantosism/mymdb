import React, { Component } from 'react'
import List from '../list/list'
import { DEFAULT_PAGE } from '../../api/'
import Button from '../button/button'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import searchMovies from '../actions/searchActions'


class SearchFeed extends Component {
  constructor(props) {
    super(props)

    this.state = {
      movies: {},
      loading: true,
    }
  }

  // Parsing of query strings in React-Router v4
  // https://github.com/ReactTraining/react-router/issues/4410#issuecomment-316239553
  getQueryStrings = term => {
    const query = new URLSearchParams(term)
    const searchTerm = query.get('query')
    // console.log('heyyyy', searchTerm)
    return searchTerm
  }

  getSearchMovies = async (searchTerm, page) => {
    const TERM = searchTerm.replace(/\s/g, '+')
    let stuff = {
      apiOne: {
        query: TERM,
        page: page,
      },
      apiTwo: {
        t: TERM,
      },
    }
    await this.props.dispatch(searchMovies(stuff))
    await function(movies) {
      return this.setSearchMovies(movies.theMovieDB)
    }

    // fetch(
    //   `${PATH_BASE}${PATH_SEARCH}${PATH_MOVIE}?api_key=${API_KEY}&query=${TERM}&${PATH_PAGE}${page}`
    // )
    // .then(response => response.json())
    // .then(movies => {
    //   this.setSearchMovies(movies)
    // })
  }

  setSearchMovies = movies => {
    const { results, page, total_pages, total_results } = movies

    const oldResults = page !== 1 ? this.state.movies.results : []

    const updatedResults = [...oldResults, ...results]

    this.setState({
      movies: { results: updatedResults, page, total_pages, total_results },
      loading: false,
    })
  }

  // componentDidMount = () => {
  //   this.getSearchMovies(
  //     this.getQueryStrings(this.props.location.search),
  //     DEFAULT_PAGE
  //   )
  // }

  componentWillReceiveProps = nextProps => {
    this.getSearchMovies(
      this.getQueryStrings(nextProps.location.search),
      DEFAULT_PAGE
    )
  }

  render() {
    // store.getState()
    const { movies } = this.state
    const { page } = movies
    console.log('heyyyy', this.props)
    console.log(this.state)
    const searchTerm = this.getQueryStrings(this.props.location.search)

    return (
      <div className='Main-wrapper'>
        <h1 className='App-main-title'>Search results</h1>
        {movies.results && (
          <div>
            <p>
              There are <b>{movies.total_results}</b> results for: "{searchTerm}
              ".
            </p>
            <List list={movies.results} />
          </div>
        )}
        <Button
          className='button'
          onClick={() => this.getSearchMovies(searchTerm, page + 1)}
          text='Load more'
        />
      </div>
    )
  }
}

export default withRouter(connect()(SearchFeed))
