import React, { useContext, useEffect, useState } from "react";
import { useTheme } from "../ThemeContext";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { handleErrorCode } from "../utils/errorCode";
import { Description } from "./Description";
import { TaskCreateModal } from "./TaskCreateModal";
import { TaskEditModal } from "./TaskEditModal";
import { TaskContext } from "../utils/taskContext";
import {
  getTask,
  deleteTaskRoute,
  markCompleted,
  markImportant,
} from "../utils/backendApi";
import { calculateDeadline } from "../utils/calculateDeadline";
import { getCookie } from "./getCookie";
import Loader from "../utils/Loader";

const AllTasks = ({ isOpen, toggle }) => {
  const { theme } = useTheme();
  const { userTask, thisUser, sendTaskData } = useContext(TaskContext);

  const [isUpdateModal, setUpdateModal] = useState(false);
  const [notify, setNotify] = useState({});
  const [taskData, setTaskData] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleData = (data) => {
    console.log(data);
    toast.success(data.message, {
      duration: 4000,
      position: "top-center",
    });
    setTaskData(data);
  };
  

  useEffect(() => {
    const handleTask = async () => {
      setLoading(true)
      try {
        // console.log(getTask);
        const token = getCookie('userToken');
        const res = await axios.get(getTask,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        // console.log(res);
        if(res.status === 200){  
          setLoading(false)
          sendTaskData(res.data.userTask.allTask);
        }
      } catch (error) {
        console.log("Error in fetching task: " + error);
      }
    };
    handleTask();
  }, [taskData, notify,thisUser]);

  const toggleImportant = async (task) => {
    try {
      
      const updatedTask = { ...task, isImportant: !task.isImportant };
      
      const res = await axios.patch(`${markImportant}/${task._id}`, updatedTask);

      if (res.status === 200) {
        console.log(res.data);
        setNotify(res.data);
        if (res.data.markedImportant === true) {
          toast.success("Task marked UnImportant!");
        } else {
          toast.success("Task marked Important!");
        }
      }
    } catch (error) {
      handleErrorCode(error);
    }
  };

  const toggleComplete = async (task) => {
    try {
      const updatedTask = { ...task, isCompleted: !task.isCompleted };
      const res = await axios.patch(`${markCompleted}/${task._id}`, updatedTask);

      if (res.status === 200) {
        console.log(res.data);
        setNotify(res.data);
        toast.success(res.data.message);
      }
    } catch (error) {
      handleErrorCode(error);
    }
  };

  const [editData, setEditData] = useState();

  const handleEdit = (task) => {
    setEditData(task);
  };

  const deleteTask = async (taskId) => {
    console.log(taskId);
    try {
      const res = await axios.delete(`${deleteTaskRoute}/${taskId}`);
      if (res.status === 200) {
        setNotify(res.data)
        toast.success(res.data.message);
      }
    } catch (error) {
      handleErrorCode(error);
    }
  }
  

  function extractDateAndTimeFromCreatedAt(createdAt) {
    const date = new Date(createdAt);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${day}-${month}-${year}`;
  }
  
  

  return (
    !loading ? ( 
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: "",
          duration: 5000,
          style: {
            background: "#000000",
            color: "#fff",
          },
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
      {userTask.map((task) => (
        <div
          className={`transition-all 0.2s ease-linear shadow-md shadow-gray-900 ${
            theme === "dark" ? "dark:bgBox" : "light:bgBox" 
          } ${
            userTask ? "opacity-100" : "opacity-0 pointer-events-none"
          } transition-opacity duration-300 p-4 flex flex-col gap-2 justify-between items-start border-2 border-gray-700 rounded-xl w-full h-[200px]`}
          key={task._id}
        >
          <div className="flex items-center justify-between w-full">
            <span className="font-bold">{task.title} </span>
            <div
              className={`star text-2xl cursor-pointer inset-0 `}
              onClick={() => toggleImportant(task)}
            >
              {task.isImportant === true ? (
                <FaStar className="sm:text-4xl"
                  style={{
                    color: task.isImportant === true ? "#05ED98" : "",
                  }}
                />
              ) : (
                <CiStar className="sm:text-4xl"></CiStar>
              )}
            </div>
          </div>
          <Description text={`${task.description}`} />
          <div className="w-full flex items-center justify-between">
            <span className="date">
              {extractDateAndTimeFromCreatedAt(task.createdAt)}
            </span>
            <span className={`${calculateDeadline(task.deadline) === "Deadline passed" ? "text-red-500 font-bold" : ""}${calculateDeadline(task.deadline) === "Deadline for today" ? "text-yellow-600 font-bold" : ""}`}>{calculateDeadline(task.deadline)}</span>
          </div>
          <div className="buttons flex items-center justify-between w-full ">
            <span
              onClick={() => toggleComplete(task)}
              className={`p-2 rounded-xl cursor-pointer  ${
                task.isCompleted === true ? "bg-green-500" : "bg-yellow-700"
              }`}
            >
              {task.isCompleted ? "Completed" : "In Progress"}
            </span>

            <div className="flex items-center justify-center gap-8 text-2xl">
              {!task.isCompleted === true && (
                <span className="flex cursor-pointer items-center justify-center gap-2">
                  <CiEdit
                    onClick={() => {
                      handleEdit(task);
                      setUpdateModal((p) => !p);
                    }}
                    className="sm:text-4xl"
                  ></CiEdit>
                </span>
              )}
              <span className="Delete flex items-center justify-center gap-2 cursor-pointer">
                <MdDelete onClick={() => deleteTask(task._id)} className="sm:text-4xl"></MdDelete>
              </span>
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        className={`select-none ${
          theme === "dark" ? "bg-transparent" : "light"
        } p-4 flex flex-col gap-2 justify-center items-center border-2 border-gray-700 rounded-xl w-full h-[200px]  border-dashed cursor-pointer`}
        onClick={toggle}
      >
        <span className="flex items-center justify-center gap-4 text-gray-400">
          <FaPlus></FaPlus> Add New Task
        </span>
      </button>

      <TaskCreateModal
        toggle={toggle}
        isOpen={isOpen}
        theme={theme}
        sendData={handleData}
        thisUser={thisUser}
      />

      {isUpdateModal === true && (
        <TaskEditModal
          editData={editData}
          setUpdateModal={setUpdateModal}
          isUpdateModal={isUpdateModal}
          theme={theme}
          sendData={handleData}
        />
      )}
    </>
    )
    :
    <Loader></Loader>
  );
};

export default AllTasks;
