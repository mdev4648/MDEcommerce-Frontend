import { useState } from "react";
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
import { useTheme } from "../context/ThemeContext";
import { useGetProfileQuery } from "../features/auth/authApi";
import { isAuthenticated } from "../utils/auth";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { apiSlice } from "../services/apiSlice";
// import { useNavigate } from "react-router-dom";
import ProfileDropdown from "../components/ProfileDropdown";
import { Link } from "react-router-dom";


export default function Navbar() {

  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("MEN");

  const { dark, setDark } = useTheme();

  const menuItems = ["MEN", "WOMEN", "ACCESSORIES", "COLLECTION"];
  const loggedIn = isAuthenticated();
  const token = useSelector((state) => state.auth.token);
  const { data: profile, isLoading } = useGetProfileQuery(undefined, { //skip prevents API call if user not logged in.
  skip: !token,
});

    const handleLogout = () => {

    // clear auth state
    dispatch(logout());
    // clear RTK Query cache
    dispatch(apiSlice.util.resetApiState());
    // redirect user
    // navigate("/login");

  };

  return (
    <nav className="bg-background text-forground shadow-md sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-6">

        <div className="flex items-center justify-between h-16">

          {/* LOGO */}

          <div className="text-2xl font-bold text-orange-500">
            
            <Link to="/">MD Shop</Link>
          </div>

          {/* CENTER MENU */}

          <div className="hidden md:flex gap-8 font-medium">

            {menuItems.map((item) => (
              <button
                key={item}
                onClick={() => setActive(item)}
                className={`relative pb-1 ${
                  active === item
                    ? "text-orange-500"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                {item}

                {active === item && (
                  <span className="absolute left-0 bottom-0 w-full h-[2px] bg-orange-500"></span>
                )}
              </button>
            ))}

          </div>

          {/* RIGHT ICONS */}

          <div className="flex items-center gap-5">

            {/* LANGUAGE */}

            <div className="hidden md:flex items-center gap-1 cursor-pointer">
              <img
                src="https://flagcdn.com/w20/us.png"
                className="w-5 h-5 rounded-full"
              />
              <FiChevronDown size={16} />
            </div>

            {/* SEARCH */}

            <FiSearch className="cursor-pointer text-xl dark:text-white" />

            {/* CART */}

            <div className="relative">
              <FiShoppingCart className="cursor-pointer text-xl dark:text-white" />

              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-1 rounded-full">
                3
              </span>
            </div>

            {/* PROFILE */}

                {token ? (
                  <ProfileDropdown profile={profile} />
                ) : (
                    <div className=" dark:text-white flex gap-2 ">
                  <FiUser className="cursor-pointer text-xl " /> Sign In</div>
                )}

            {/* THEME */}

            {/* <button onClick={() => setDark(!dark)}>
              {dark ? (
                <FiSun className="text-xl text-yellow-400" />
              ) : (
                <FiMoon className="text-xl" />
              )}
            </button> */}

            {/* MOBILE MENU BUTTON */}

            <button
              className="md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>

          </div>
        </div>

        {/* MOBILE MENU */}

        {menuOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-4">

            {menuItems.map((item) => (
              <button
                key={item}
                onClick={() => {
                  setActive(item);
                  setMenuOpen(false);
                }}
                className={`text-left ${
                  active === item
                    ? "text-orange-500"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                {item}
              </button>
            ))}

          </div>
        )}

      </div>


    
    </nav>
  );
}