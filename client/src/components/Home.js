import React, { useContext, useEffect, useState } from 'react'
import Sidebar from './Sidebar.js'
import MainArea from './MainArea.js'
import { useTheme } from '../ThemeContext.js'
import { TaskContext } from '../utils/taskContext.js'
import axios from 'axios'
import { Link } from 'react-router-dom'
import MiniSidebar from './MiniSidebar.js'
import { getUser } from '../utils/backendApi.js'
import { getCookie } from '../pages/getCookie.js'
const Home = () => {
    const {thisUser} = useContext(TaskContext)
    const [sideMenu, setSideMenu] = useState('')
    const [isSidebar, setIsSidebar] = useState(false)
    const [userData, setUserData] = useState(null)
    const {theme} = useTheme()
    const handleSideMenu = (menu)=>{
        setSideMenu(menu);
      }
      const handleData = (data)=>{
        setIsSidebar(data)
        
      }
      const handleToggleData = (data)=>{
        setIsSidebar(data)
        
      }
      useEffect(()=>{
        const getUserRoute = async ()=>{
          
          try {
            const token = getCookie('userToken');
            const res = await axios.get(getUser, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            if (res.status === 200) {
              // console.log(res.data.otherDetails);
              setUserData(res.data.otherDetails);
            } else {
              
              // Handle unexpected status codes here
              console.error('Unexpected status code:', res.status);
            }
          } catch (error) {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.error('Error response from server:', error.response.status);
              
              // Handle different status codes as needed
              if (error.response.status === 404) {
                console.error('User not found');
               
              } else if (error.response.status === 401) {
                console.error('Invalid password');
              
              } else {
                console.error('Unexpected error:', error.response.data);
              }
            } else if (error.request) {
              // The request was made but no response was received
              console.error('No response received:', error.request);
              
            } else {
              // Something happened in setting up the request that triggered an Error
              console.error('Error setting up the request:', error.message);
            }
          }
        }
        getUserRoute()
      },[])
      
  return (
    thisUser ?  
    <div className={` bg-gray-100 text-gray-900 ${theme === 'dark' ? 'dark:bg-gray-900 dark:textColor' : 'light:bg-gray-900 light:textColor'} flex items-center justify-between gap-8 p-8 h-[100vh] w-full sm:px-0`}>
        <Sidebar sendMenu={handleSideMenu} userData={userData}></Sidebar>
        <MainArea sideMenu={sideMenu} openSidebar={handleData} userData={userData}></MainArea>
        {isSidebar&&  <MiniSidebar isSidebar={isSidebar} sendMenu={handleSideMenu} userData={userData} sendToggleData={handleToggleData}></MiniSidebar>}
    </div>
    :
    <div className={`bg-gray-100 text-gray-900 ${theme === 'dark' ? 'dark:bg-gray-900 dark:textColor' : 'light:bg-gray-900 light:textColor'} flex flex-col items-center justify-center gap-8 p-8 h-[100vh] w-full`}>
        <h1 className="text-[5.5rem] font-bold mb-6 text-gray-100 w-full text-center leading-tight">
              Please login first or Register an account.
        </h1>
        <div className="flex justify-center space-x-8">
              <Link
                to="/signin"
                className="bg-blue-500 hover:bg-blue-600 text-white px-10 py-3 rounded-md text-2xl"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="bg-gray-700 hover:bg-gray-800 text-white px-10 py-3 rounded-md text-2xl"
              >
                Sign Up
              </Link>
              </div>
    </div>
  )
}

export default Home