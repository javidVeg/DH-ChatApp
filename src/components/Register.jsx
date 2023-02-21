import React from 'react'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../../utils/firebase'
import { FcGoogle } from 'react-icons/fc';
import dhlogo from "../assets/dh-logo.svg"

const Register = () => {

  const googleProvider = new GoogleAuthProvider();

  //! this function alls user to sign in with google is firebase auth function
  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log(result.user)
    } catch (error) { 
      console.log("error")
    }
  }

  return (
    <div className='pt-[25%] flex flex-col justify-center items-center text-center gap-5'>
      <img src={dhlogo}></img>
      <h1 className=' font-[Poppins] font-[600]'>Welcome to the Decoded Health ChatApp</h1>
      <button className='flex flex-row items-center bg-transparent hover:bg-[#18DBFF] text-pink-700 font-semibold
      hover:text-black py-2 px-4 border border-[#18DBFF] hover:shadow-[0_1px_8px_2px] hover:shadow-[rgb(190_24_93)]
       hover:border-transparent rounded' onClick={GoogleLogin}>Sign in with Google &nbsp; <FcGoogle size={20} /></button>
    </div>
  )
}

export default Register;