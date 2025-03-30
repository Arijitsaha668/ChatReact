import { create } from 'zustand'
import { useUserStore } from './userStrore';

export const useChatStore = create((set) => ({
  chatId:null,
  user: null,
  isCurrentUserBlocked : false,
  isReceiverBlocked : false,
  changeChat: (chatId, user)=>{
  const currentUser = useUserStore.getState().currentUser;
    
    
      // current user is block then this function work
        if(user.block.includes(currentUser.id)){
          return set({
            chatId,
            user:null,
            isCurrentUserBlocked: true,
            isReceiverBlocked: false,
          });
        }
      //  Receiver is block then this function work
     else if(currentUser.block.includes(user.id)){
        return set({
          chatId,
          user:null,
          isCurrentUserBlocked: false,
          isReceiverBlocked: true,
        });
      }
      
     else{  
       return set ( {
          chatId,
          user,
          isCurrentUserBlocked:false,
          isReceiverBlocked:false,
        })
      }
      
  }, 
  changeBlock: () =>{
   return set((state) => ({...state, isReceiverBlocked : !state.isReceiverBlocked}))
    }

}))