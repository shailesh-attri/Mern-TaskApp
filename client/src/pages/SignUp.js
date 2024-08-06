import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { registerRoute } from "../utils/backendApi";
import { TaskContext } from "../utils/taskContext";
import { Oval } from "react-loader-spinner";

const SignUp = () => {
  const navigate = useNavigate();
  const { sendUserData } = useContext(TaskContext);
  const [loginSuccess, setLoginSuccess] = useState("");
  const [loginFailed, setLoginFailed] = useState("");
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!/^[a-zA-Z_][a-zA-Z0-9_]{5,}$/.test(username)) {
      // Username does not meet the requirements
      setLoginFailed("Username must start with a letter or underscore and be at least 6 characters long.");
    } else {
      const formData = new FormData(e.target);
      const password = formData.get("password");
      try {
        const res = await axios.post(registerRoute, { username, password });
        const token = res.data.token;

              // Set the token as a cookie
            document.cookie = `userToken=${token}; Max-Age=3600; httpOnly; Secure; SameSite=None`; 
        if (res.status === 200) {
          setLoginSuccess(res.data.message);
          sendUserData(res.data.otherDetails);
          navigate("/dashboard");
        }
      } catch (error) {
        if (error.response) {
          console.error("Error response from server:", error.response.status);
          setLoginFailed("Error response from server");
          if (error.response.status === 404) {
            setLoginFailed("User not found");
          } else if (error.response.status === 401) {
            setLoginFailed("Username already taken");
          } else {
            console.error("Unexpected error:", error.response.data);
          }
        } else if (error.request) {
          console.error("No response received:", error.request);
          setLoginFailed("No response received");
        } else {
          console.error("Error setting up the request:", error.message);
        }
      }
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  return (
    <div className="relative mx-auto w-full max-w-xl max-w-md bg-gray-900 px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
      <div className="w-full">
        <div className="text-center">
          <h1 className="text-3xl text-gray-200 font-bold">MetaTask</h1>
          <p className="mt-2 text-gray-300">Register your account</p>
        </div>
        <div className="mt-5">
          <form action="" onSubmit={handleSubmit}>
            <div className="relative mt-6">
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                className="peer mt-1 w-full border-b-2 border-gray-500 px-0 py-1 bg-transparent placeholder:text-transparent focus:border-gray-500 focus:outline-none text-white"
                autoComplete="NA"
                value={username}
                onChange={handleChange}
              />
              <label
                htmlFor="username"
                className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-200 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-200 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-200"
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
                htmlFor="password"
                className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-100 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-200 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-200"
              >
                Password
              </label>
            </div>
            <div className="my-6">
              {!loading ? (
                <button
                  type="submit"
                  className="w-full rounded-md bg-gray-50 px-3 py-4 text-black focus:bg-gray-600 focus:outline-none"
                >
                  Sign up
                </button>
              ) : (
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
                    strokeWidth="4"
                    ariaLabel="oval-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                </button>
              )}
            </div>
            <p className="text-center text-xl text-gray-200">
              Already have an account?
              <Link
                to="/signin"
                className="ml-2 font-semibold text-gray-300 hover:underline focus:text-gray-300 focus:outline-none"
              >
                Sign in
              </Link>
              .
            </p>
            {loginSuccess && <p className="text-center text-sm text-green-500 font-bold">{loginSuccess}</p>}
            {loginFailed && <p className="text-center text-sm sm:text-2xl text-red-500 font-bold py-4">{loginFailed}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
