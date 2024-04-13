import { useState } from "react";
import "./App.css";
import { useTheme } from "./ThemeContext";
import Home from "./components/Home";
import Landing from "./components/Landing";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  const [sideMenu, setSideMenu] = useState("");
  const { theme } = useTheme();
  return (
    <div
      className={`App bg-gray-100 text-gray-900 ${
        theme === "dark"
          ? ""
          : "light:bg-gray-900 light:textColor"
      } flex items-center justify-between gap-8 p-8 h-[100vh] sm:px-2 sm:text-3xl`}
    >
      <Router>
        <Routes>
          <Route path="/" element={<Landing></Landing>} />
          <Route path="/dashboard" element={<Home></Home>} />
          <Route path="/Signin" element={<SignIn></SignIn>} />
          <Route path="/Signup" element={<SignUp></SignUp>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
