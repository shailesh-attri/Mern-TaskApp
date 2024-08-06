import React, { useState } from "react";
import { useTheme } from "../ThemeContext";
import AllTasks from "../pages/AllTasks";
import { IoCreateOutline } from "react-icons/io5";
import ImportantTask from "../pages/ImportantTask";
import CompletedTask from "../pages/CompletedTask";
import { Divide as Hamburger } from "hamburger-react";

const MainArea = ({ sideMenu, openSidebar }) => {
  const [isOpen, setOpen] = useState(false);
  const { theme } = useTheme();
  const handleSidebar = () => {
    openSidebar((p) => !p);
  };
  const toggle = () => {
    setOpen(prev => !prev);
  };
  return (
    <div
      className={`p-4 flex flex-col  gap-8 border-2 border-gray-600 w-[85%] 2xl:w-[80%] xl:w-[75%] lg:w-[70%] md:w-[100%] h-full rounded-xl   ${
        theme === "dark" ? "dark:bgPlate" : "light:bgPlate"
      }`}
    >
      <div className="flex items-center justify-between w-full relative">
        <div className="">
          <span className="font-bold text-2xl ">{sideMenu}</span>
          <div className="bg-green-500 h-1 w-[30px] mt-2 rounded-xl"></div>
        </div>
        <div className="flex items-center justify-center gap-4 cursor-pointer">
          <IoCreateOutline size="34" onClick={toggle} className={`${(sideMenu.toLowerCase() === "important" || sideMenu.toLowerCase() === "completed") ? "hidden" : ""}`}></IoCreateOutline>
          <span className="hidden md:block" onClick={handleSidebar}>
            <Hamburger></Hamburger>
          </span>
        </div>
      </div>
      <div className="grid grid-cols-4 w-full gap-4 overflow-auto  2xl:grid-cols-3 xl:grid-cols-2 lg:grid-cols-1  ">
        {sideMenu.toLowerCase() === "all tasks" && (
          <AllTasks isOpen={isOpen} toggle={toggle} ></AllTasks>
        )}
        {sideMenu.toLowerCase() === "important" && (
          <ImportantTask></ImportantTask>
        )}
        {sideMenu.toLowerCase() === "completed" && (
          <CompletedTask></CompletedTask>
        )}
        
      </div>
    </div>
  );
};

export default MainArea;
