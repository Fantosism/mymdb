import React, { Component } from 'react'
import CardList from '../card/cardlist';

export default class UserSpace extends Component {
  render() {
    return (
      <div  style={{ height: '75vh' }} className='  left align'>
        <CardList />
      </div>
    )
  }
}

