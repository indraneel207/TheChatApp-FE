import { useStoreActions } from 'easy-peasy'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { validate } from '../../../utils/validations'
import DashboardSidebar from './components/DashboardSidebar'
import './styles/styles.css'

function Dashboard(props) {
  const { store } = props

  const phone = store.user.phone.val
  const chats = store.chatStore.chats.val
  const addChat = useStoreActions((actions) => actions.chatStore.chats.add)

  const [reply, setReply] = useState('')
  const [selectedFriend, setSelectedFriend] = useState('9441158880')

  const handleOnReply = (event) => {
    const { value } = event.target
    if (validate('reply', value)) setReply(value)
  }

  const handleOnSubmitReply = () => {
    if (validate('reply', reply)) {
      addChat({ user: selectedFriend, text: reply, from: phone })
      setReply('')
      updateScroll()
    }
  }

  const updateScroll = () => {
    let element = document.getElementById('latest')
    if (element) {
      let container = document.getElementById('message-container')
      container.scrollTop = element.offsetTop
    }
  }

  useEffect(() => {
    updateScroll()
  }, [])

  const renderMessage = (eachMessage, index) => {
    const { from, message, timeStamp } = eachMessage
    const isSelectedFriend = from === selectedFriend
    const containerStyle = isSelectedFriend
      ? 'dashboard-each-message-container dashboard-message-left-direction'
      : 'dashboard-each-message-container dashboard-message-right-direction'
    const containerProps = index === chats[selectedFriend].length - 1 ? { id: 'latest' } : {}

    return (
      <div className={containerStyle} key={index} {...containerProps}>
        {isSelectedFriend && <div className='arrow-left' />}
        <div className='dashboard-message-text-container'>
          <p className='dashboard-message-text'>{message}</p>
          <p className='dashboard-message-text-date'>{moment(timeStamp).format('LT')}</p>
        </div>
        {!isSelectedFriend && <div className='arrow-right' />}
      </div>
    )
  }

  return (
    <div className='dashboard-container'>
      <DashboardSidebar store={store} selectedFriend={selectedFriend} setSelectedFriend={setSelectedFriend} />
      <div className='dashboard-main'>
        <div className='dashboard-message-header-container'>
          <img src={require('../../../assets/user.png')} alt='user Icon' className='dashboard-message-header-icon' />
          <p className='dashboard-message-header-text'>{selectedFriend}</p>
        </div>
        <div className='dashboard-message-container' id='message-container'>
          {chats[selectedFriend] && chats[selectedFriend].map(renderMessage)}
        </div>
        <div className='dashboard-reply-container'>
          <input
            className='dashboard-reply-input'
            name='reply'
            onChange={handleOnReply}
            placeholder='Enter your reply here...'
            value={reply}
          />
          <div className='dashboard-reply-button' onClick={handleOnSubmitReply}>
            REPLY
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
