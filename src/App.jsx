import { onAuthStateChanged } from "firebase/auth";
import Chat from "./component/chat/Chat"
import Dtails from "./component/details/Dtails"
import List from "./component/list/List"
import Login from "./component/login/Login";
import Notification from "./component/notification/Notification";
import { auth } from "./libary/Firebase";
import { useEffect } from "react";
import { useUserStore } from "./libary/userStrore";
import { useChatStore } from "./libary/chatStrore";

const App = () => {
 
  const {currentUser, Loading, fetchUserInfo} = useUserStore();
  const {chatId} = useChatStore();
    useEffect(() => {
      const unSub = onAuthStateChanged(auth,(User)=>{
        fetchUserInfo(User?.uid);
      });
      return () => {
        unSub();
      };
    }, [fetchUserInfo]);

    console.log(currentUser);

    if(Loading) return <div className="IsLoading">Loading....</div>
  return (
    <div className='container'>
    {
      currentUser ? (
        <>
        <List/>
        {chatId && <Chat/>}
        {chatId && <Dtails/>}
        </>
       ) : (<div>
        <Login/>
       </div>)
    }
     <Notification/>
 </div>
  )
}

export default App