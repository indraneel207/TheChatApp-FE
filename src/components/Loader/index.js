import React from 'react'
import './styles.css'

function Loader() {
  return (
    <div className='loader-container'>
      <img src={require('../../assets/loader.jpg')} alt='loader' className='loader' />
    </div>
  )
}
export default Loader
