import React from 'react';
import "./UserinFo.css";
import { useUserStore } from '../../../libary/userStrore';
function UserinFo() {
  const {currentUser} = useUserStore();
  return (
    <div className='UserinFo'>
       <div className="user">
         <img src="./avatar.png" alt="" />
         <h2>{currentUser.Username}</h2>
       </div>
       <div className="icons">
        <img src="./more.png" alt="" />
        <img src="./video.png" alt="" />
        <img src="./edit.png" alt="" />
       </div>
    </div>
  )
}

export default UserinFo