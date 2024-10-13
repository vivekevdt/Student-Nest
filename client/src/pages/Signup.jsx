import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';


const Signup = () => {
  const navigate=useNavigate();
  const [formData, setFormData]= useState({});
  const [error,setError]= useState(null);
  const [loading,setLoading]= useState(false);


  const handleChange= async (e)=>{
    setFormData({
      ...formData,
      [e.target.id]:e.target.value,
    })
  }
  
  const handleSubmit= async (e)=>{
    e.preventDefault();
    setLoading(true);

    try{
      const res = await fetch('/api/auth/signup',
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
        setLoading(false);
        setError(data.message);
        alert(data.message)
        return ;
      }
      setLoading(false);
      navigate('/signin')
     

    }catch(e){
      setLoading(false);
      setError(data.message);

     
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
            Create Your Account
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                onChange={handleChange}
                type="text"
                id="username"
                placeholder="Enter your name"
                className="w-full p-3 rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
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
             {loading ? "loading...":"Signup"}
            </button>
          </form>
          <p className="text-center text-gray-600 mt-6">
            Already have an account?{' '}
            <a href="/signin" className="text-blue-500 hover:underline">
              Sign In
            </a>

            <div>
              {error && <p className='text-red-500 mt-5'>{error}</p>}
            </div>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
