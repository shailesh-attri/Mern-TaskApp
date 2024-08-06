import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {loginRoute} from '../utils/backendApi'
import axios from "axios";
import { TaskContext } from "../utils/taskContext";
import { Oval } from 'react-loader-spinner'
const SignIn = () => {
    const {sendUserData} = useContext(TaskContext)
    const navigate = useNavigate();
    const [loginSuccess, setLoginSuccess] = useState('')
    const [loginFailed, setLoginFailed] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target);
        const formDataObject = {
            "username":formData.get("username"),
            "password":formData.get("password"),
        }
        
        
        const handleLogin = async ()=>{
          setLoading(true)
          try {
            const res = await axios.post(loginRoute, formDataObject)
            const token = res.data.token;

              // Set the token as a cookie
              document.cookie = `userToken=${token}; Max-Age=3600; Secure; SameSite=None`; 
            if (res.status === 200) {
              
              setLoginSuccess(res.data);
              sendUserData(res.data);
              navigate('/dashboard');
            } else {
              setLoading(false)
              // Handle unexpected status codes here
              console.error('Unexpected status code:', res.status);
              setLoginFailed("Unexpected status code")
            }
          } catch (error) {
            setLoading(false)
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.error('Error response from server:', error.response.status);
              setLoginFailed('Error response from server')
              // Handle different status codes as needed
              if (error.response.status === 404) {
                console.error('User not found');
                setLoginFailed('User not found')
              } else if (error.response.status === 401) {
                console.error('Invalid password');
                setLoginFailed('Invalid password')
              } else {
                console.error('Unexpected error:', error.response.data);
              }
            } else if (error.request) {
              // The request was made but no response was received
              console.error('No response received:', error.request);
              setLoginFailed('No response received')
            } else {
              // Something happened in setting up the request that triggered an Error
              console.error('Error setting up the request:', error.message);
            }
          }
        }
       
        handleLogin()
        
    }
    
     
    
    

    

  return (
    <div className="relative mx-auto w-full max-w-xl bg-gray-900 px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
      <div className="w-full">
        <div className="text-center">
          <h1 className="text-3xl text-gray-200 font-bold">MetaTask</h1>
          <p className="mt-2 text-gray-300">Sign in below to access your account</p>
        </div>
        <div className="mt-5">
          <form action="" onSubmit={handleSubmit}>
            <div className="relative mt-6 ">
            <input
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                className="peer mt-1 w-full border-b-2 border-gray-500 px-0 py-1 bg-transparent placeholder:text-transparent focus:border-gray-500 focus:outline-none text-white "
                autocomplete="NA"
              />
              <label
                for="username"
                className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm  text-gray-200 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-200 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-200"
              >
                Username
              </label>
            </div>
            <div className="relative mt-6">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="peer peer mt-1 w-full border-b-2 border-gray-500 px-0 py-1 bg-transparent placeholder:text-transparent focus:border-gray-500 focus:outline-none text-white"
              />
              <label
                for="password"
                className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-100 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-200 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-200"
              >
                Password
              </label>
            </div>
            <div className="my-6">
            {!loading ? 
              <button
                type="submit"
                className="w-full rounded-md bg-gray-50 px-3 py-4 text-black focus:bg-gray-600 focus:outline-none"
              >
                Sign in
              </button>
            :
              <button
                type="submit"
                className="w-full rounded-md bg-gray-50 px-3 py-4 text-black focus:bg-gray-600 focus:outline-none flex items-center justify-center"
              >
                <Oval
                visible={true}
                height="30"
                width="80"
                color="#00BFFF"
                secondaryColor="#4169E1"
                strokeWidth='4'
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperClass=""
                />
              </button>
            }
            </div>
            <p className="text-center text-2xl text-gray-200">
              Don&#x27;t have an account yet?
              <Link
                to="/signup"
                className="ml-2 font-semibold text-gray-300 hover:underline focus:text-gray-300 focus:outline-none"
              >
                 Sign up
              </Link>
              .
            </p>
            {/* {loginSuccess && <p className="text-center text-sm sm:text-2xl text-green-500 font-bold">{loginSuccess}</p>} */}
            {loginFailed && <p className="text-center text-sm sm:text-3xl text-red-500 font-bold py-4">{loginFailed}</p>}
          </form>
        </div>
      </div>
    </div> 
  );
};

export default SignIn;
