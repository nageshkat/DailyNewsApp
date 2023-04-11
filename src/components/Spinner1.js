import React, { Component } from 'react'
import loading from './loading3.gif'

export class Spinner1 extends Component {
  render() {
    return (
        <div className='text-center'>
        <img src={loading} alt='loading' className='size-sm'/>
      </div>
    )
  }
}

export default Spinner1