import React from 'react';
import './Login.css';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword , signInWithEmailAndPassword} from "firebase/auth";
import { auth , db } from '../../libary/Firebase';
import{doc, setDoc} from 'firebase/firestore';
import avatar from "../../../public/avatar.png";

function Login() {

    const [avater,setavater] = useState({
        file:null,
        url:"",
    });
    const [Loading, setLoading] = useState(false);
    const handelavater = (e) =>{
        if(e.target.files[0]){
          setavater({
            file:e.target.files[0],
            url:URL.createObjectURL(e.target.files[0])
          });
        }
    } 
     const handelregister = async (e) =>{
       e.preventDefault()
       setLoading(true);
      const Formdata = new FormData(e.target);
      const {Username, email, password} = Object.fromEntries(Formdata);

     try {
      const res =  await createUserWithEmailAndPassword(auth,email,password);
      await setDoc(doc(db,"users",res.user.uid),{
        Username,
        email,
        id:res.user.uid,
        block:[],
      });
      await setDoc(doc(db,"userchats",res.user.uid),{
        chats:[],
      });
       
      toast.success("Account created! you can Login");
     } catch (error) {
      console.log(error);
      toast.error("please fill the form");
     }
     finally{
      setLoading(false);
     }
     }
     const handellogin = async(e) =>{
       e.preventDefault();
       const Formdata = new FormData(e.target);
       const {email, password} = Object.fromEntries(Formdata);
       try {

        await signInWithEmailAndPassword(auth,email,password);
         toast.success("success fully Login");
        
       } catch (error) {
        console.log("error");
        toast.error("hello error")
       }
       finally{
        setLoading(false);
       }
      }
  return (
    <div className="loginprevent">
    <div className='login'>
     <div className="iteam">
     <h2>Lets Login</h2>
       <form onSubmit={handellogin}>
        <input type="text" placeholder='Email' name='email'/>
        <input type="password" placeholder='password' name='password'/>
         <button>Sing In</button>
       </form>
     </div>
     <div className="separator"></div>
     <div className="iteam">
     <h2>Create Your Account First</h2>
     <form onSubmit={handelregister}>
     <label htmlFor="file">
     <img src={avater.url || avatar} alt="" />
     upload picture</label>
     <input type="file" id='file' style={{display:'none'}} onChange={handelavater}/>
     <input type="text" placeholder='username' name='Username'/>
     <input type="email" placeholder='Email' name='email'/>
     <input type="password" placeholder='password' name='password'/>
      <button>Create</button>
    </form>
     </div>
    </div>
    </div>
  )
}

export default Login
