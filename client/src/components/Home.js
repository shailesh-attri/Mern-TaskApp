import React, { useContext, useEffect, useState } from 'react'
import Sidebar from './Sidebar.js'
import MainArea from './MainArea.js'
import { useTheme } from '../ThemeContext.js'
import { TaskContext } from '../utils/taskContext.js'
import {getTask} from '../utils/backendApi.js'
import axios from 'axios'
import { Link } from 'react-router-dom'
import MiniSidebar from './MiniSidebar.js'
const Home = () => {
    const {thisUser, sendTaskData} = useContext(TaskContext)
    const [sideMenu, setSideMenu] = useState('')
    const [isSidebar, setIsSidebar] = useState(false)
    const {theme} = useTheme()
    const handleSideMenu = (menu)=>{
        setSideMenu(menu);
      }
      useEffect(()=>{
        const handleTask = async () =>{
          try {
            const res = await axios.get(getTask)
            if(res.status === 200){
              
              sendTaskData(res.data.userTask.allTask);
            }
          } catch (error) {
            console.log("Error in fetching task: " + error.message);
          }
        }
        handleTask()
      },[ thisUser])
      const handleData = (data)=>{
        setIsSidebar(data)
        
      }
      const handleToggleData = (data)=>{
        setIsSidebar(data)
        
      }
  return (
    thisUser ?  
    <div className={` bg-gray-100 text-gray-900 ${theme === 'dark' ? 'dark:bg-gray-900 dark:textColor' : 'light:bg-gray-900 light:textColor'} flex items-center justify-between gap-8 p-8 h-[100vh] w-full sm:px-0`}>
        <Sidebar sendMenu={handleSideMenu} thisUser={thisUser}></Sidebar>
        <MainArea sideMenu={sideMenu} openSidebar={handleData}></MainArea>
        {isSidebar&&  <MiniSidebar isSidebar={isSidebar} sendMenu={handleSideMenu} thisUser={thisUser} sendToggleData={handleToggleData}></MiniSidebar>}
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