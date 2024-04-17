import { useState } from "react";
import { createTask } from "../utils/backendApi";
import axios from "axios";
import { getCookie } from "./getCookie";
export const TaskCreateModal = ({ setOpen, isOpen, theme, sendData, thisUser,toggle,setOpenModal }) => {
  
    const [loading, setLoading] = useState(false);
    const [myFormData, setMyFormData] = useState({
      taskName: "",
      description: "",
      deadline: "",
      isCompleted: false,
    });
  
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        setLoading(false);
        const token = getCookie('userToken');
        
        const res = await axios.post(createTask, myFormData,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (res.status === 200) {
          sendData(res.data);
        }
      } catch (error) {
        setLoading(false);
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error("Error response from server:", error.response.status);
  
          // Handle different status codes as needed
          if (error.response.status === 404) {
            console.error("User not found");
          } else if (error.response.status === 401) {
            console.error("Invalid password");
          } else {
            console.error("Unexpected error:", error.response.data);
          }
        } else if (error.request) {
          // The request was made but no response was received
          console.error("No response received:", error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error setting up the request:", error.message);
        }
      }
  
      // Reset the form data
      setMyFormData({
        taskName: "",
        description: "",
        deadline: "",
        createdAt: "",
        isCompleted: null,
      });
  
      toggle()
    };
    return (
      isOpen &&
        <div
          className={`fixed z-50 inset-0 overflow-y-auto flex items-center justify-center ${
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          } transition-opacity duration-300 `}
        >
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-800 opacity-75"></div>
          </div>
          <div
            className={`relative rounded-lg w-[30%] xl:w-[70%] md:w-[80%] sm:w-[85%] p-6 opacity-100 transform transition-all duration-300 
          ${theme === "dark" ? "bg-gray-900" : ""}
          `}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Create a New Task</h2>
              <button
                onClick={toggle}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="text"
                  name="taskName"
                  value={myFormData.taskName}
                  className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-700 mb-4"
                  placeholder="Enter task name"
                  required
                  onChange={(e) =>
                    setMyFormData({ ...myFormData, taskName: e.target.value })
                  }
                />
                <textarea
                  type="text"
                  name="description"
                  id=""
                  value={myFormData.description}
                  onChange={(e) =>
                    setMyFormData({ ...myFormData, description: e.target.value })
                  }
                  className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-700 resize-none"
                  placeholder="Enter task description (Allowed only 10 words)"
                  required
                />
                <label
                  htmlFor="datepicker"
                  className="block mt-4 text-sm font-medium text-gray-300"
                >
                  Set your deadline
                </label>
                <input
                  type="date"
                  name="deadline"
                  id="datepicker"
                  value={myFormData.deadline}
                  onChange={(e) =>
                    setMyFormData({ ...myFormData, deadline: e.target.value })
                  }
                  className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-700 resize-none"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={toggle}
                  className="inline-flex justify-center px-4 py-2 mr-2 text-sm font-medium text-gray-700 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                >
                  {loading ? "loading ..." : "Create Task"}
                </button>
              </div>
            </form>
          </div>
        </div>
      
    );
  };