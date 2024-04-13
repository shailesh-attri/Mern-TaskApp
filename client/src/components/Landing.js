import React from "react";
import { Link } from "react-router-dom";
const Landing = () => {
  return (
    <div className="background   w-full ">
      <div className="flex  flex-col justify-between w-full h-[100vh]">
        <div className="header flex items-center justify-between h-[70px] text-gray-200">
          <span className="font-bold text-4xl">MetaTask</span>
          <Link to="/signin" className="text-2xl">
            Sign in
          </Link>
        </div>
        <div className="hero h-[714px] w-full flex items-center justify-center">
          <div className="max-w-7xl text-center">
            <h1 className=" text-[5.5rem] sm:text-[4rem] font-bold mb-6 text-gray-100 w-full flex items-center justify-center md:justify-center md:text-start leading-tight">
              Achieve More, Stress Less with Seamless Task Management
            </h1>
            <p className="mb-8 text-[2rem] text-gray-400 min-w-[50%] ">
              Elevate your productivity with our dynamic task app. Stay
              organized, focused, and in control of your tasks.
            </p>
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
        </div>
        <div className="flex items-center justify-center">
          <div className="">
            <span className="">Created by Shailesh.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
