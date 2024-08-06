import React,{createContext, useState} from "react";
const TaskContext = createContext()

const TaskContextProvider = ({children}) =>{
    const [importantTask, setImportantTask] = useState([])
    const [completedTask, setCompletedTask] = useState([])
    const [thisUser, setThisUser] = useState()
    const [userTask, setUserTask] = useState([])
    const [isModalTaskData, setModalTaskData] = useState({})

    const sendImportantTask = (data)=>{
        setImportantTask(data)
    }

    const sendCompletedTask = (data)=>{
        setCompletedTask(data)
    }

    const sendUserData = (data)=>{
        setThisUser(data)
    }
    const sendTaskData = (data)=>{
        setUserTask(data)
        // console.log(userTask);
    }
    const sendModalData = (data)=>{
        setModalTaskData(data)
        // console.log(data);
    }

    return(
        <TaskContext.Provider value={{
            sendImportantTask,
            sendCompletedTask,
            importantTask,
            completedTask,
            sendUserData,
            thisUser,
            sendTaskData,
            userTask,
            sendModalData,
            isModalTaskData
        }}>
            {children}
        </TaskContext.Provider>
    )
}
export { TaskContextProvider, TaskContext } 