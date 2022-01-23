import { useStoreActions } from 'easy-peasy'
import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'

function DashboardSidebar({ store, selectedFriend, setSelectedFriend }) {
  const navigate = useNavigate()
  const [filterText, setFilterText] = useState('')
  const friends = store.chatStore.friends.val
  const [filteredFriends, setFilteredFriends] = useState(friends)
  const phone = store.user.phone.val

  const resetPhone = useStoreActions((actions) => actions.user.phone.reset)
  const handleOnLogout = () => {
    resetPhone()
    navigate('/')
  }

  const handleOnFilterInput = (event) => {
    const { value } = event.target
    setFilterText(value)
    setFilteredFriends(friends.filter((e) => e.includes(value)))
  }

  const handleOnFriendClick = (e) =>  setSelectedFriend(e.target.id)

  const renderUserId = () => (
    <div className='dashboard-sidebar-header-sub-sub'>
      <p className='dashboard-sidebar-header-text-normal'>User ID: {phone}</p>
      <img
        src={require('../../../../assets/logout.png')}
        alt='logout Icon'
        className='dashboard-sidebar-header-icon-logout'
        onClick={handleOnLogout}
      />
    </div>
  )

  const renderHeader = () => (
    <div className='dashboard-sidebar-header-container'>
      <img src={require('../../../../assets/chat.png')} alt='chat Icon' className='dashboard-sidebar-header-icon' />
      <div className='dashboard-sidebar-header-sub'>
        <p className='dashboard-sidebar-header-text'>The Chat App</p>
        {renderUserId()}
      </div>
    </div>
  )

  const renderEachFriend = (e, getStyle) => (
    <div className={getStyle(e)} key={e} onClick={handleOnFriendClick} id={e}>
      <img id={e} src={require('../../../../assets/user.png')} alt='user Icon' className='dashboard-sidebar-friends-icon'/>
      <p id={e} className='dashboard-sidebar-friends-text'>{e}</p>
    </div>
  )

  const renderFriends = () => {
    const getStyle = (current) =>
      current === selectedFriend ? 'dashboard-sidebar-friends-each-active' : 'dashboard-sidebar-friends-each'
    return (
      <div className='dashboard-sidebar-friends-container'>
        {filteredFriends.map((e) => renderEachFriend(e, getStyle))}
      </div>
    )
  }

  const renderSearchBar = () => (
    <div className='dashboard-sidebar-search-container'>
      <p className='dashboard-sidebar-friends-header-text'>FRIENDS LIST</p>
      <input
        className='dashboard-sidebar-search-text'
        placeholder='Search or Add Friends...'
        value={filterText}
        onChange={handleOnFilterInput}
        type='text'
      />
    </div>
  )

  return (
    <div className='dashboard-sidebar'>
      {renderHeader()}
      {renderSearchBar()}
      {renderFriends()}
    </div>
  )
}

export default DashboardSidebar
