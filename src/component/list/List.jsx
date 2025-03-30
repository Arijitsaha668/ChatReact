import React from 'react'
import './List.css'
import UserinFo from './Userinfo/UserinFo'
import ChatList from './Chatlist/ChatList'

const List = () => {
  return (
    <div className='List'>
      <UserinFo/>
      <ChatList/>
    </div>
  )
}

export default List
