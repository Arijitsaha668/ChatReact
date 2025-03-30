import { create } from 'zustand'
import { db } from './Firebase';
import { doc, getDoc } from 'firebase/firestore';

export const useUserStore = create((set) => ({
  Loading : true,
  currentUser: null,
  fetchUserInfo: async(uid) =>{
    if(!uid) return set({currentUser: null, Loading: false});
    try {
        const docRef = doc(db,"users", uid);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()){
            set({currentUser:docSnap.data(),Loading:false});
        }
        else{
            set({currentUser:null,Loading:false});
        }
    } catch (error) {
        console.log(error);
        set({currentUser: null, Loading: false});
    }
  }
}))