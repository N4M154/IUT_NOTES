import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ThemeToggle from "./ThemeToggle";
import { AiFillHome } from "react-icons/ai";
import { LogOut } from "lucide-react";
import { Notebook } from "lucide-react";
import { signOut } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/signout");
      dispatch(signOut());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    // <div className="bg-slate-800 text-white">
    //   <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
    //     <Link to="/home">
    //       <h1 className="font-bold text-white">Authentication</h1>
    //     </Link>
    //     <ul className="flex gap-4">
    //       {currentUser && (
    //         <Link to="/home" className="font-semibold">
    //           <li>Home</li>
    //         </Link>
    //       )}
    //       {currentUser && (
    //         <Link to="/about" className="font-semibold">
    //           <li>About</li>
    //         </Link>
    //       )}

    //       <Link to="/profile" className="font-bold">
    //         {currentUser ? (
    //           <img
    //             src={currentUser.profilePicture}
    //             alt="profile"
    //             className="h-7 w-7 rounded-full object-cover"
    //           />
    //         ) : (
    //           <li>Sign In</li>
    //         )}
    //       </Link>
    //     </ul>
    //   </div>
    // </div>
    <header className="w-full border-b-2 border-yellow-100 bg-yellow-50 dark:bg-black dark:border-gray-900 py-4 z-50 transition-all duration-200">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Left - Site name */}
        <Link
          to="/home"
          className="text-xl font-medium text-yellow-400 dark:text-yellow-200"
        >
          The <span className="text-black dark:text-white">Opinionated</span>
        </Link>

        {/* Right - Nav & Theme Toggle */}
        <div className="flex items-center space-x-6">
          {/* Home Icon */}
          <Link to="/home" className="hover:opacity-80 transition-opacity">
            <AiFillHome className="text-2xl text-black dark:text-yellow-200" />
          </Link>

          {/* Review */}
          <Link to="/reviews" className="hover:opacity-80 transition-opacity">
            <Notebook className="w-7 h-7 text-black dark:text-yellow-200" />
          </Link>

          {/* Profile / Login */}
          {currentUser ? (
            <Link to="/profile" className="hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-pink-50 border border-pink-300 dark:bg-yellow-200/20 rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-black dark:text-yellow-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            </Link>
          ) : (
            <Link to="/login" className="hover:underline">
              Login
            </Link>
          )}

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="cursor-pointer text-black dark:text-pink-200 rounded-xl hover:scale-110 transition-all duration-200"
            aria-label="Logout"
          >
            <LogOut className="w-6 h-6" />
          </button>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
