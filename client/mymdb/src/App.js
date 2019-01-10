import React, { Component } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import jwt_decode from 'jwt-decode'
import { setCurrentUser, logoutUser } from './components/actions/authActions'
import setAuthToken from './components/utils/setAuthToken'
import NavBar from './components/navbar'
import Splash from './components/splash'
import Register from './components/auth/register'
import Login from './components/auth/login'
import ProtectedRoute from './components/protected-route/protectedRoute'
import Dashboard from './components/dashboard/dashboard'
import Header from './components/header/header'
import Loading from './components/loading/loading'
import Card from './components/card/card'
import Footer from './components/footer/footer'
import SideBar from './components/sidebar/sidebar'
import SearchFeed from './components/search/searchFeed'

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken
  setAuthToken(token)
  // Decode token and get user info and exp
  const decoded = jwt_decode(token)
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded))

  // Check for expired token
  const currentTime = Date.now() / 1000 // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser())
    // Redirect to login
    window.location.href = './login'
  }
}

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      authenticated: false,
      user: null,
      loading: true,
      watchList: {},
      ...this.defaultFilterState,
    }
  }
  defaultFilterState = {
    filters: {
      rating: {
        min: 5,
        max: 10,
      },
      runtime: {
        min: 45,
        max: 250,
      },
      sort_by: {
        value: 'vote_average',
        label: 'Rating',
      },
      order: {
        value: 'desc',
        label: 'Descending',
      },
      year: new Date().getFullYear(),
    },
  }

  updateStateWithFilters = filters => this.setState({ filters })

  handleUserCardsState = {
    // query db and find current users movie list
    // create new state obj by taking value of all movies in query
    // setState to new state obj
  }

  resetFilters = () => this.setState(this.defaultState)

  addToUserCard = (movie, userCards) => {
    const onComplete = error => {
      if (error) {
        this._notificationSystem.addNotification({
          message: '😨',
          level: 'error',
        })
      } else {
        this._notificationSystem.addNotification({
          message: '😉',
          level: 'success',
        })
      }
    }
    // Make call to database and add selected movie to db
  }

  removeFromUserCard = (movie, userCards) => {
    // set variable = to query db for userID
    const onComplete = error => {
      if (error) {
        this._notificationSystem.addNotification({
          message: '😨',
          level: 'error',
        })
      } else {
        this._notificationSystem.addNotification({
          message: '😉',
          level: 'success',
        })
      }
    }
    // Remove from db the currently selected movie. Run onComplete when removing for errors.
    // Set new state through this.handleUserCardsState passing userId, userCards and new state (which should be userCards after being updated)
  }

  componentWillMount = () => {
    // check for jwt token, if true
    if (true) {
      this.setState({
        loading: false,
      })
      // query db for current user cards. If query successful, setState to the user cards.
    } else {
      this.setState({
        loading: false,
      })
    }
  }

  componentDidMount = () => {
    this._notificationSystem = this.refs.notificationSystem
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className='App'>
            {this.state.loading && <Loading />}
            <NavBar />
            {/* <SearchFeed /> */}
            {/* <Splash /> */}

            <Route exact path='/' component={Splash} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />

            <Route
              path='/movie/:id-:title'
              render={props => (
                <Card
                  {...props}
                  id={this.state.match.params.id}
                  authenticated={this.state.authenticated}
                  onFavoriteSelect={selectedMovie =>
                    this.addToUserList(selectedMovie)
                  }
                  onFavoriteDeselect={selectedMovie =>
                    this.removeFromUserList(selectedMovie)
                  }
                  favorites={this.state.favorites}
                  watchLater={this.state.watchLater}
                />
              )}
            />
            <Switch>
              <ProtectedRoute path='/dashboard' component={Dashboard} />
            </Switch>
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App
