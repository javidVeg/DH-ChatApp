import React from 'react'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../../utils/firebase'
import { redirect } from 'react-router-dom';

const Register = () => { 

  const googleProvider = new GoogleAuthProvider();

  const GoogleLogin = async () => {
    try{
      const result = await signInWithPopup(auth, googleProvider);
      console.log(result.user)
    } catch(error) {
      console.log("error")
    }
  }
  return (
    <div>
     <button onClick={GoogleLogin}>Sign in with Google</button>
    </div>
  )
}

export default Register