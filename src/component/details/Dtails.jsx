import React from 'react';
import './Dtails.css'
import { auth } from '../../libary/Firebase';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
const logouthaldel = () =>{
  signOut(auth);
  toast.success("LogOut SuccessFully");
}
const Dtails = () => {
  return (
    <div className='details'>
      <div className="user">
      <img src="./avatar.png" alt="" />
      <h2>jane Deo</h2>
      <p>Lorem, ipsum dolor sit</p>
      </div>
      <div className="info">
       <div className="option">
       <div className="title">
        <span>Chat Settings</span>
        <img src="./arrowUp.png" alt="" />
       </div>
       </div>
       <div className="option">
       <div className="title">
        <span>Chat Settings</span>
        <img src="./arrowUp.png" alt="" />
       </div>
       </div>
       <div className="option">
       <div className="title">
        <span>Privacy and help</span>
        <img src="./arrowUp.png" alt="" />
       </div>
       </div>
       <div className="option">
       <div className="title">
        <span>Shared photos</span>
        <img src="./arrowUp.png" alt="" />
       </div>
       <div className="photos">
       <div className="photoItem">
       <div className="photoDetail"> 
       <img src="https://images.pexels.com/photos/1386604/pexels-photo-1386604.jpeg?auto=compress&cs=tinysrgb&w=400" alt="" />
       <span>photo_2024_2.png</span>
       </div>
       <img src="./download.png" alt="" />
       
        </div>
       <div className="photoItem">
       <div className="photoDetail"> 
       <img src="https://images.pexels.com/photos/1386604/pexels-photo-1386604.jpeg?auto=compress&cs=tinysrgb&w=400" alt="" />
       <span>photo_2024_2.png</span>
       </div>
       <img src="./download.png" alt="" />
       
        </div>
       <div className="photoItem">
       <div className="photoDetail"> 
       <img src="https://images.pexels.com/photos/1386604/pexels-photo-1386604.jpeg?auto=compress&cs=tinysrgb&w=400" alt="" />
       <span>photo_2024_2.png</span>
       </div>
       <img src="./download.png" alt="" />
       
        </div>
       <div className="photoItem">
       <div className="photoDetail"> 
       <img src="https://images.pexels.com/photos/1386604/pexels-photo-1386604.jpeg?auto=compress&cs=tinysrgb&w=400" alt="" />
       <span>photo_2024_2.png</span>
       </div>
       <img src="./download.png" alt="" />
       
        </div>
      

       </div>
       </div>
       <div className="option">
       <div className="title">
        <span>Shared Files</span>
        <img src="./arrowUp.png" alt="" />
       </div>
       </div>
       <button>Block User</button>
       <button className='logout' onClick={logouthaldel}>log out</button>
      </div>
    </div>
  )
}

export default Dtails
