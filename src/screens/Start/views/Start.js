import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import { useStoreActions } from 'easy-peasy'
import './styles/styles.css'
import { validate } from '../../../utils/validations'

function Start() {
  const navigate = useNavigate()
  const addPhone = useStoreActions((actions) => actions.user.phone.set)
  const [phone, setPhone] = useState('')

  const handleOnInput = (event) => {
    const { value } = event.target
    if (validate('phone_input', value)) setPhone(value)
  }

  const handleOnStart = () => {
    if (validate('phone', phone)) {
      addPhone(phone)
      return navigate('/home')
    }
    alert('Kindly enter a valid Phone number')
  }

  return (
    <div className='start-container'>
      <img className='start-icon' src={require('../../../assets/chat.png')} alt='Chat Icon' />
      <div className='start-main'>
        <p className='start-heading-text'>Welcome to the Chat App</p>
        <div className='start-input-container'>
          <img className='start-phone-icon' src={require('../../../assets/call.png')} alt='Call Icon' />
          <input
            className='start-input-text'
            placeholder='Enter your Phone number'
            type='tel'
            onChange={handleOnInput}
            value={phone}
          />
        </div>
        <div className='start-submit' onClick={handleOnStart}>
          START
        </div>
      </div>
    </div>
  )
}

export default Start
