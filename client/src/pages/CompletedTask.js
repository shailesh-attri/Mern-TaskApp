import React, { useContext, useEffect, useState } from "react";
import { useTheme } from "../ThemeContext";
import { CiStar } from "react-icons/ci";
import { TaskContext } from "../utils/taskContext";
import { FaStar } from "react-icons/fa6";
import { Description } from "./Description";
import { calculateDeadline } from "../utils/calculateDeadline";
const CompletedTask = () => {
  const { userTask } = useContext(TaskContext);
  const [TaskCompleted, setTaskCompleted] = useState([]);
  const { theme } = useTheme();
  useEffect(() => {
    setTaskCompleted(userTask.filter((task) => task.isCompleted === true));
  }, [userTask]);

  function extractDateAndTimeFromCreatedAt(createdAt) {
    // Convert createdAt to a JavaScript Date object
    const date = new Date(createdAt);

    // Extract date components
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are zero-indexed, so add 1
    const day = date.getDate();

    // Return an object with extracted date and time components
    return `${day}-${month}-${year}`;
  }
  return TaskCompleted.map((task) => (
    <div
      key={task.id}
      className={`${
        theme === "dark" ? "dark:bgBox" : "light:bgBox"
      } p-4 flex flex-col gap-2 justify-between items-start border-2 border-gray-700 rounded-xl w-[100%] h-[200px]`}
    >
      <div className="flex items-center justify-between w-full">
        <span className="font-bold">{task.title} </span>
        <div className={`star text-2xl  inset-0 `}>
        {task.isImportant === true ? (
                <FaStar
                  style={{
                    color: task.isImportant === true ? "#05ED98" : "",
                  }}
                />
              ) : (
                <CiStar></CiStar>
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
          className={`p-2 rounded-xl ${
            task.isCompleted ? "bg-green-500" : "bg-yellow-700"
          }`}
        >
          {task.isCompleted ? "Completed" : "In Progress"}
        </span>

        <div className="flex items-center justify-center gap-8 text-2xl"></div>
      </div>
    </div>
  ));
};

export default CompletedTask;
