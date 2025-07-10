import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import {  useDispatch,useSelector } from 'react-redux'
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

const Signin = () => {

  const [formData, setFormData]= useState({});
  const { loading, error } = useSelector((state) => state.user);

  const navigate=useNavigate();
  const dispatch=useDispatch();


  const handleChange= async (e)=>{
    setFormData({
      ...formData,
      [e.target.id]:e.target.value,
    })
  }
  
  const handleSubmit= async (e)=>{
    e.preventDefault();
   

    try{
      dispatch(signInStart());
      const res = await fetch('https://student-nest-vivek.onrender.com/api/auth/signin',
    {
      method:"POST",
      headers:{
        "Content-Type": "application/json",

      },
      body:JSON.stringify(formData)
    }
    );
      const data = await res.json();
      if(data.success==false){
        dispatch(signInFailure(data.message));
        return ;
      }
      dispatch(signInSuccess(data));
      navigate('/');
     

    }catch(e){
      dispatch(signInFailure(error.message));

    }
    
   
  }



  return (
    <div className="min-h-screen relative bg-gradient-to-b from-blue-100 to-white">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQS8469CWcG0jmfblNS5dE29NNXplReMpVDw&s)',
        }}
      ></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
            Sign In
          </h2>
          <form onSubmit={handleSubmit}>

            <div className="mb-4">
              <input
                onChange={handleChange}
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full p-3 rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-6">

              <input
                onChange={handleChange}
                type="password"
                id="password"
                placeholder="Create a password"
                className="w-full p-3 rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              disabled={loading}
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg font-bold shadow-md hover:bg-blue-600 transition duration-300"
            >
             {loading ? "loading...":"Signin"}
            </button>
            <OAuth></OAuth>
            
          </form>
          <p className="text-center text-gray-600 mt-6">
            Don't have an account?{' '}
            <a href="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </a>
          </p>
          <div>
              {error && <p className='text-red-500 mt-5'>{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
