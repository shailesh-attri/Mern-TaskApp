import { useEffect, useState } from "react";
import { IoMdHome } from "react-icons/io";
import { MdChecklistRtl } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import Pic1 from "../assets/pic1.png";
import { useTheme } from "../ThemeContext";
import { changeAvatar } from "../utils/backendApi";
import axios from "axios";
import { Oval } from "react-loader-spinner";
import toast, { Toaster } from "react-hot-toast";
const MiniSidebar = ({ sendMenu, userData, sendToggleData,isSidebar}) => {
  const { theme } = useTheme();
  const [selectedMenu, setSelectedMenu] = useState("All Tasks");
  const [changePicture, setChangePicture] = useState(false);
  const [inputFile, setInputFile] = useState(null);
  const [loginSuccess, setLoginSuccess] = useState("");
  const [loginFailed, setLoginFailed] = useState("");
  const [loading, setLoading] = useState(false);
  const SideMenu = [
    { title: "All Tasks", icon: <IoMdHome className="text-xl" /> },
    { title: "Important", icon: <MdChecklistRtl /> },
    { title: "Completed", icon: <FaCheck /> },
  ];
  const handleSideMenu = (menu) => {
    sendMenu(menu);
  };
  const handleSidebar = (data) => {
    sendToggleData(data);
  }
  useEffect(() => {
    sendMenu("All Tasks");
  }, []);

  const handleSignOut = () => {
    try {
      // Delete the user token cookie
      deleteCookie("userToken");
      // Redirect to the home page
      window.location.href = "/";
    } catch (error) {
      console.error("Error during sign-out:", error.message);
    }
  };

  const deleteCookie = (name) => {
    document.cookie =
      name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };
  const handleFileUpload = async () => {
    setLoading(true);
    try {
      // Create an input element dynamically
      const input = document.createElement("input");
      input.type = "file";

      // Listen for the change event when a file is selected
      input.addEventListener("change", async (event) => {
        const file = event.target.files[0];

        // Create FormData object

        try {
          // Make a request to upload the image using Axios
          
          const res = await axios.patch(
            `${changeAvatar}/${userData._id}`,
            { dpImage: file },
            {
              headers: {
                "Content-Type": "multipart/form-data", // Use multipart form data
              },
            }
          );
          if (res.status === 200) {
            setLoading(false);
            toast.success("Image uploaded successfully", {
              duration: 4000,
              position: "top-center",
            });
            setInputFile(res.data.imageUrl);

            const time = setTimeout(() => {
              setLoginSuccess(null);
            }, 2000);

            return () => {
              clearTimeout(time); // Clear the timeout when the component unmounts
            };
          }
        } catch (error) {
          setLoading(false);
          setLoginFailed(false);
          console.error("Error uploading image:", error);
        }
      });

      // Trigger a click event to open the file picker dialog
      input.click();
    } catch (error) {
      console.error("Error handling file upload:", error);
    }
  };

  return (
    
    <div className={`absolute text-3xl top-0 h-[100vh] left-0 w-[100%] hidden md:block ${
      isSidebar ? "opacity-100" : "opacity-0 pointer-events-none"
    } transition-opacity duration-300`}>
      <Toaster></Toaster>

      <div
        className={`relative py-4 flex flex-col items-center justify-between border-2 border-gray-600 w-[15%] 2xl:w-[20%] xl:w-[25%] lg:w-[30%] md:w-[100%]  h-full rounded-r-xl ${
          theme === "dark" ? "bg-gray-900 bg-opacity-95" : "light:bgPlate"
        }`}
      >
        <div className="topPanel flex items-center justify-between  w-full px-4">
          <div
            onClick={() => setChangePicture((p) => !p)}
            className="relative cursor-pointer img w-[70px] h-[70px] flex items-center justify-between rounded-full"
          >
            <img
              src={
                inputFile || (userData && userData?.avatarUrl)
                  ? inputFile || userData?.avatarUrl
                  : Pic1
              }
              alt=""
              className="w-full h-[50px] rounded-full border-2 border-gray-400"
            />
            {changePicture && (
              <span
                className="absolute top-20  w-[150px] flex items-center justify-center rounded-xl shadow-2xl shadow-gray-800  left-0 bg-black text-gray-200 px-4 py-2 cursor-pointer"
                onClick={handleFileUpload}
              >
                {loading ? (
                  <span className="w-full rounded-md bg-gray-50 px-3 py-4 text-black focus:bg-gray-600 focus:outline-none flex items-center justify-center">
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
                  </span>
                ) : (
                  "Change Picture"
                )}
              </span>
            )}
          </div>
          <span className="w-full font-bold text-3xl pl-4">
            {userData?.username}
          </span>
        </div>
        <div className="menu flex flex-col items-center justify-start gap-2 w-full transition-all 0.2s ease-linear">
          {SideMenu.map((menu, i) => (
            <span
              className={`text-gray-400 hover:bg-gray-600 w-full flex items-center justify-center p-2 cursor-pointer ${
                selectedMenu.toLocaleLowerCase() === menu.title.toLowerCase()
                  ? "bg-gray-600 text-gray-100 font-bold border-r-4 border-green-400 transition-all 0.2s ease-linear"
                  : ""
              } `}
              key={i}
              onClick={() => {
                setSelectedMenu(menu.title);
                handleSideMenu(menu.title);
                handleSidebar((p)=>!p)
              }}
            >
              {menu.icon}
              <span className="ml-2">{menu.title}</span>
            </span>
          ))}
        </div>
        <div className="signOut px-4">
          <span
            onClick={handleSignOut}
            className="cursor-pointer flex items-center justify-center gap-4 w-full font-bold"
          >
            <FaSignOutAlt className="text-xl " />
            Sign out
          </span>
        </div>
        {loginSuccess && (
          <p className="absolute bottom-4  text-center bg-black rounded-xl px-4 py-3  text-sm text-green-600 transition-all 0.2s ease-linear">
            {loginSuccess}
          </p>
        )}
        {loginFailed && (
          <p className="absolute bottom-4 text-center bg-black rounded-xl px-4 text-sm text-red-700 font-bold py-4">
            {loginFailed}
          </p>
        )}
      </div>
    </div>
  );
};

export default MiniSidebar;
