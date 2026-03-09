import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { apiSlice } from "../services/apiSlice";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";  
import {
  FiSearch,
  FiUser,
  FiShoppingCart,
  FiMenu,
  FiX,
  FiChevronDown,
  FiSun,
  FiMoon,
} from "react-icons/fi";

import toast from "react-hot-toast";


export default function ProfileDropdown({ profile }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(apiSlice.util.resetApiState());
     toast.success("Logout successful 🎉");
    // navigate("/login");
  };

  const { dark, setDark } = useTheme();

  //close when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (!dropdownRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative text-foreground " ref={dropdownRef}>
      
      {/* Avatar Button */}
      <img
        src={profile?.profile_image || "https://i.pravatar.cc/40"}
        alt="avatar"
        className="w-9 h-9 rounded-full cursor-pointer"
        onClick={() => setOpen(!open)}
      />

      {open && (
        <div className="absolute top-13 right-0  w-75  bg-white dark:bg-zinc-900 rounded-xl shadow-lg border border-gray-200 dark:border-zinc-800 p-3">

          {/* Profile header */}
          <div className="flex items-center gap-3 pb-3 border-b border-gray-200 dark:border-zinc-800">
            <img
              src={profile?.profile_image || "https://i.pravatar.cc/40"}
               alt="avatar"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-medium text-sm dark:text-gray-300">
                {profile?.username || "Devon Lane"}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-300">
                {profile?.email || "info@example.com"}
              </p>
            </div>
          </div>

          {/* Theme Switch */}


          <div className="flex justify-between bg-gray-100 dark:bg-zinc-800 rounded-lg p-1 mt-3">
            <button  onClick={() => setDark(false)} className="flex flex-1 items-center justify-center py-1 rounded bg-zinc-200 dark:bg-zinc-800 ">
                <FiSun className={`text-xl  dark:text-white  text-yellow-400`} />  
            </button>
            <button onClick={() => setDark(true)} className="flex flex-1 py-1 items-center justify-center rounded dark:bg-zinc-700 ">
               <FiMoon className="text-xl dark:text-yellow-400"/>
            </button>
            <button className="flex-1 py-1 rounded hover:bg-white dark:hover:bg-zinc-700">
              💻
            </button>
          </div>

          {/* Menu Items */}
          <div className="mt-3 space-y-1 text-sm dark:text-gray-300">

            <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-zinc-800">
              🏪 Your Shop
            </button>



            <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-zinc-800">
              ⚙️ Settings
            </button>

          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 dark:border-zinc-800 my-2" />

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full text-left px-3 py-2 text-red-500 rounded hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            🚪 Log Out
          </button>

        </div>
      )}
    </div>
  );
}