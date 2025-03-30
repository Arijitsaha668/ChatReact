import React from 'react';
import './Chat.css'
import Emojipicker from "emoji-picker-react";
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../../libary/Firebase';
import { useChatStore } from '../../libary/chatStrore';
import { useUserStore } from '../../libary/userStrore';

const Chat = () => {
  const[chat, setChat] = useState();
  const [open,setopen] = useState(false);
  const [text,settext] = useState("");
  const [Img,setImg] = useState({
    file:null,
    url:"",
  });
  
  const {chatId, user} = useChatStore();
  const{currentUser} = useUserStore()

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current ?.scrollIntoView({behavior:"smooth"});
  }, []);
   
  useEffect (()=>{
    const unSub = onSnapshot(doc(db,"chats", chatId),(res)=>{
      setChat(res.data())
    });

    return () =>{
      unSub();
    };
  }, [chatId]);

  // console.log(chat);
  

  const handleEmoji = (e) =>{
    settext((prev)=> prev+ e.emoji);
    setopen(false);
  }

  const handleImg = (e) =>{
  if(e.target.files[0]){
   setImg({
    file:e.target.files[0],
    url:URL.createObjectURL(e.target.files[0]),
   })
  }
  }

  const handlesend = async() =>{


    if(text === "") return;


    let imgUrl = null;
    try {
    if(Img.file){
    
    }

      await updateDoc(doc(db,"chats", chatId),{
        messages:arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: new Date(),
        }),
      });
      
     const userIDs= [currentUser.id, user.id];
     settext("");
     userIDs.forEach(async(id)=>{
         
       
       const userChatRef =doc(db, "userchats",id);
       const userChatsSnapshont = await getDoc(userChatRef);
       
       if(userChatsSnapshont.exists()){
         const userChatsData = userChatsSnapshont.data();
         
         const chatIndex = userChatsData.chats.findIndex((c) => c.chatId == chatId);
         
         userChatsData.chats[chatIndex].LastMessage = text;
         userChatsData.chats[chatIndex].isSeen = id == currentUser.id ? true : false;
         userChatsData.chats[chatIndex].updateAt = Date.now();
         
         await updateDoc(userChatRef,{
           chats: userChatsData.chats,
          })
          
        }
      })
      

    } catch (error) {
      console.log(error);
    }

  }
  return (
    <div className='chat'>

     {/*  THIS  IS  TOP PART OF CHAT */}

      <div className="top">
        <div className="user">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <span>Arijit saha</span>
            <p>Lorem, ipsum dolor sit.</p>
          </div>
        </div>
        <div className="icons">
        <label htmlFor="file">
        <img src="./phone.png" alt="" />
        </label>
        <input type="file" id='file' style={{display:'none'}} onChange={handleImg}/>
         <img src="./video.png" alt="" />
         <img src="./info.png" alt="" />
        </div>
      </div>

      {/* THIS IS CENTER PART OF CHAT */}
      <div className="center">
      {chat?.messages?.map((messages)=>(
      <div className={messages.senderId === currentUser?.id ? "message own" : "message"} key={messages?.createdAt}>
         
         <div className="texts">
         { messages.img && <img src={messages.img} alt="" />}
          <p>{messages.text}</p>
          
         </div>
       </div>
      ))}
       <div ref={endRef}></div>
      </div>
    


      {/*THIS IS BOTTOM PART OF CHAT */}

      <div className="bottom">
        <div className="icons">
         <img src="./img.png" alt="" />
         <img src="./camera.png" alt="" />
         <img src="./mic.png" alt="" />
        </div>
        
        <input type="text" placeholder='Type a message'  value={text} onChange={(e)=>settext(e.target.value)}/>
         <div className="emoji">
          <img src="./emoji.png" alt="" 
           onClick={()=>setopen(prev=>!prev)}/>        
           <div className="picker">
           <Emojipicker open ={open} onEmojiClick={handleEmoji}/>
           </div>
         </div>
         <button className='sendButton' onClick={handlesend}>send</button>
        
      </div>
    </div>
  )
}

export default Chat
