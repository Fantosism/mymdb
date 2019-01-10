import React, { Component } from 'react'
import Card from './card';

const CardList = (props) => (
  <div className="container">
   <Card {...props} />
  </div>
)

export default CardList

