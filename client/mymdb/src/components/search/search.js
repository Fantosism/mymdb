// Component rendered on dashboard.
// Will render a smaller component for image carousel
// Needs to store dynamic variable to send to server route
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { searchMovies } from '../actions/searchActions'
import { connect } from 'react-redux'


class Search extends Component {
  yearRef = React.createRef()
  sortByRef = React.createRef()
  genresRef = React.createRef()
  keywordsRef = React.createRef()
  ratingRef = React.createRef()

  static propTypes = {
    // queryApi: PropTypes.func,
    queries: PropTypes.object
  }

  // initiateSearch = e => {
  //   e.preventDefault()
  //   const query = {
  //     year: this.yearRef.current.value,
  //     sortBy: this.sortByRef.current.value,
  //     genres: this.genresRef.current.value,
  //     keywords: this.keywordsRef.current.value,
  //     rating: this.ratingRef.current.value,
  //   }
  //   this.props.queryApi(query)
  //   e.currentTarget.reset()
  // }

  yearSearch = () => {
    const yearArr = []
    for (let i = new Date().getFullYear(); i >= 1900; i--) {
      yearArr.push(<option key={i}>{i}</option>)
    }
    return yearArr
  }

  sortBySearch = () => {
    const searchCategories = {
      'popularity.asc': 'Popularity Ascending',
      'popularity.desc': 'Popularity Descending',
      'release_date.asc': 'Release Date Ascending',
      'release_date.desc': 'Release Date Descending',
      'vote_average.asc': 'Rating Ascending',
      'vote_average.desc': 'Rating Descending',
      'original_title.asc': 'Title [A-Z]',
      'original_title.desc': 'Title [Z-A]',
    }
    const values = Object.values(searchCategories)
    const keys = Object.keys(searchCategories)
    const sortValues = []
    for (let i = 0; i < values.length; i++) {
      sortValues.push(<option value={keys[i]}>{values[i]}</option>)
    }
    // return sortValues
    return keys.map(key => {
      return <option key={key} value={key}>{searchCategories[key]}</option>
    })
  }

  onChange = e => this.setState({ queries: {[e.target.id]: e.target.value }})

  onSubmit = e => {
    console.log('Made it to onSubmit')
    console.log(this.yearRef)
    e.preventDefault()
    const newQuery = {
      primary_release_year : this.yearRef.current.value,
      sort_by: this.sortByRef.current.value,
      with_genres: this.genresRef.current.value,
      with_keywords: this.keywordsRef.current.value,
      'vote_average.gte': this.ratingRef.current.value
    }
    console.log('newQuery', newQuery)
    searchMovies(newQuery)
    // this.onSubmit = this.onSubmit.bind(this)
  }

  // queryApi = query => {
  //   // take a copy of existing state 
  //   const things = {...this.props.queries}
  //   // Add a new kvp to our queries object from our query object
  //   query = {...things, query}
  //   // Set the new query object to state
  //   this.setState({ queries: query })
  // }

  // onSubmit = e => {
  //   e.preventDefault()
  //   const newQuery = {
  //     year: this.state.year,
  //     sortBy: this.state.sortBy,
  //     genres: this.state.genres,
  //     keywords: this.state.keywords,
  //     rating: this.state.rating
  //   }
  //   console.log(newQuery)
  //   this.props.searchMovies(newQuery)
  // }
  render() {
    return (
      <form onSubmit={this.onSubmit} className='query-api'>
        <select name='primary_release_year' ref={this.yearRef} placeholder='year'>
        <option value="">--Please choose an option--</option>
          {this.yearSearch()}
        </select>
        <select name='sort_by' ref={this.sortByRef} placeholder='sortBy'>
        <option value="">--Please choose an option--</option>
          {this.sortBySearch()}
        </select>
        <select
          type='text'
          name='with_genres'
          ref={this.genresRef}
          placeholder='genres'
        />
        <input
          type='text'
          name='with_keywords'
          ref={this.keywordsRef}
          placeholder='keywords'
        />
        <input
          type='text'
          name='vote_average.gte'
          ref={this.ratingRef}
          placeholder='rating'
        />
            <div className="testbutton">
          <button
              style={{
                width: '150px',
                borderRadius: '3px',
                letterSpacing: '1.5px',
                marginTop: '1rem',
              }}
              onSubmit={this.onSubmit}
              className='btn btn-large waves-effect waves-light hoverable blue accent-3'>
              Search
            </button>
          </div>
      </form>
    )
  }
}

const mapStateToProps = state => ({
  queries: state.queries,
})

export default connect(
  mapStateToProps,
  { searchMovies }
)(Search)
