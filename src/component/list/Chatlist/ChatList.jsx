import React, { useState, useEffect } from 'react';
import "./ChatList.css"
import AddUser from './addUser/AddUser';
import { useUserStore } from '../../../libary/userStrore';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../libary/Firebase';
import { useChatStore } from '../../../libary/chatStrore';

const ChatList = () => {
  const[addMore,setaddMore] = useState(false);
  const[chats,setChats] = useState([]);
  
    const {currentUser} = useUserStore();

    const{changeChat, chatId} = useChatStore();

     console.log(chatId);

    useEffect(() => {
     const unSub = onSnapshot(doc(db,"userchats",currentUser.id),
      async(res)=>{
      const items = res.data().chats;
      const promises = items.map(async (item) => {
        const userDocRef = doc(db, "users", item.receverid);
        const userDocSnap = await getDoc(userDocRef);

        const user = userDocSnap.data();

        return{ ...item, user};
      });
      const chatData = await  Promise.all(promises);

      setChats(chatData.sort((a,b)=> b.updateAt - a.updateAt));
      
      
     });

     return()=>{
      unSub();
     };
    }, [currentUser.id]);

    const handleSelect = async(Chat) => {
      changeChat(Chat.chatId, Chat.user);
    };
   
  return (
    <div className='ChatList'>
     <div className="search">
      <div className="searchBar">
       <img src="./search.png" alt=""/>
       <input type="text" placeholder='Search'/>
      </div>
      <img src={addMore ? "./minus.png" :"./plus.png"} alt="" className='add'
      onClick={()=>setaddMore((prev)=>!prev)}/>
     </div>
     
      {chats.map((Chat)=>(
        <div className="item" key={Chat.chatId} onClick={()=>handleSelect(Chat)}>
        <img src="./avatar.png" alt="" />
         <div className="texts">
          <span>{Chat.user.Username}</span>
           <p>{Chat.LastMessage}</p>
         </div>
      </div>
  ))}
     {addMore && <AddUser/>}
    </div>
  )
}

export default ChatList