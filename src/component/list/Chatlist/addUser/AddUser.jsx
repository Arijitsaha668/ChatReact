import React, { useState } from 'react'
import "./addUser.css"
import { arrayUnion, collection, doc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import { db } from '../../../../libary/Firebase';
import { useUserStore } from '../../../../libary/userStrore';
const AddUser = () => {
  const [user,setUser] = useState(null);
  const {currentUser} = useUserStore();
  const handleSearch = async(e) =>{
     e.preventDefault();
     const formData = new FormData(e.target);
     const username = formData.get("username");

     try {
      const userRef = collection(db ,"users");
      const q = query(userRef, where("Username", "==", username));
      const querySnapShot = await getDocs(q);

      if(!querySnapShot.empty){
        setUser(querySnapShot.docs[0].data());
      };
     } catch (error) {
      console.log(hello);
     }
    
    };

    const handleAdd = async() =>{
      const chatRef = collection(db, "chats");
      
      try {
        const newChatRef = doc(chatRef);
        const userChatsRef = collection(db, "userchats");

        await setDoc(newChatRef,{
          createAt: serverTimestamp(),
          messages: [],
        });
        await updateDoc(doc(userChatsRef,user.id),{
           chats:arrayUnion({
            chatId: newChatRef.id,
            LastMessage:"",
            receverid:currentUser.id,
            updateAt: Date.now(),
           }),
        })
        await updateDoc(doc(userChatsRef,currentUser.id),{
           chats:arrayUnion({
            chatId: newChatRef.id,
            LastMessage:"",
            receverid:user.id,
            updateAt: Date.now(),
           }),
        })
      } catch (error) {
        console.log("hello");
      }
        
      }
  return (
    <div className='addUser'>
     <form onSubmit={handleSearch}>
      <input type="text"  placeholder='Username' name='username'/>
      <button> Search</button>
     </form>
     { user && <div className="user">
      <div className="details"> 
       <img src="./avatar.png" alt="" />
       <span>{user.Username}</span>
      </div>
       <button onClick={handleAdd}> add user </button>
     </div>}
    </div>
  );
};

export default AddUser