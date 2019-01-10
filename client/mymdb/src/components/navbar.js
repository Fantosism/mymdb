import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class NavBar extends Component {
  render() {
    return (
      <div className='navbar'>
        <nav className='z-depth-2 nav-extended'>
          <div className='nav-wrapper white'>
            <Link
              to='/'
              style={{
                fontFamily: 'monospace',
              }}
              className='col s5 brand-logo center black-text'>
              <i className='material-icons'>movie</i>
              MyMDB
            </Link>
          
          </div>
       
        </nav>
      </div>
    )
  }
}
