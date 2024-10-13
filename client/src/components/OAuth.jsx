import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { useDispatch } from 'react-redux';


import React from 'react'
import { app } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { signInSuccess } from '../redux/user/userSlice';

export default function OAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();


  const handleGoogleClick = async () => {
    try {
        const provider = new GoogleAuthProvider();
        const auth = getAuth(app);

        const result= await signInWithPopup(auth,provider);

      
        const res = await fetch('/api/auth/google', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: result.user.displayName,
              email: result.user.email,
              photo: result.user.photoURL,
            }),
          });
          const data = await res.json();
          dispatch(signInSuccess(data));
          navigate('/');

    } catch (error) {
      console.log('could not sign in with google', error);
    }
  };
  return (
    <button
    type="button"
    onClick={handleGoogleClick}
    className="w-full py-3 flex items-center justify-center bg-white text-gray-700 border border-gray-300 rounded-lg shadow-md hover:bg-gray-100 hover:shadow-lg transition duration-300 ease-in-out"
  >
    <img
      src="google.svg"
      alt="Google Logo"
      className="w-6 h-6 mr-3"
    />
    <span className="text-sm font-medium">Sign in with Google</span>
  </button>
  
  );
}