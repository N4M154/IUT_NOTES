// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   signInStart,
//   signInSuccess,
//   signInFailure,
// } from "../redux/user/userSlice";
// import { useDispatch, useSelector } from "react-redux";
// // import OAuth from "../components/OAuth";

// export default function SignIn() {
//   const [formData, setFormData] = useState({});
//   const { loading, error } = useSelector((state) => state.user);

//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       dispatch(signInStart());
//       const res = await fetch("/api/auth/signin", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });
//       const data = await res.json();
//       if (data.success === false) {
//         dispatch(signInFailure(data));
//         return;
//       }
//       dispatch(signInSuccess(data));
//       navigate("/home");
//     } catch (error) {
//       dispatch(signInFailure(error));
//     }
//   };
//   return (
//     <div className="flex flex-col md:flex-row h-screen">
//       <div className="w-full md:w-1/2 bg-slate-900 flex items-center justify-center">
//         <div className="p-8 max-w-md w-full bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 border border-slate-900 rounded-lg shadow-md">
//           {" "}
//           <h1 className="text-3xl text-center font-semibold mb-7 text-sky-500">
//             Sign In
//           </h1>
//           <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//             <input
//               type="email"
//               placeholder="Email"
//               id="email"
//               className="bg-sky-100 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
//               onChange={handleChange}
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               id="password"
//               className="bg-sky-100 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
//               onChange={handleChange}
//             />
//             <button
//               disabled={loading}
//               className="bg-blue-700 text-white p-3 rounded-lg uppercase hover:bg-sky-600 disabled:opacity-80"
//             >
//               {loading ? "Loading..." : "Sign In"}
//             </button>
//             {/* <OAuth /> */}
//           </form>
//           <div className="flex items-center justify-center mt-5">
//             <p className="text-slate-300 font-semibold">
//               Don't have an account?
//             </p>
//             <Link to="/signup">
//               <span className="text-green-500 font-bold text-lg ml-1 hover:text-sky-500">
//                 Sign Up
//               </span>
//             </Link>
//           </div>
//           <p className="text-red-700 mt-5">
//             {error ? error.message || "Something went wrong!" : ""}
//           </p>
//         </div>
//       </div>
//       <div className="w-full md:w-1/2 bg-gray-800 flex items-center justify-center relative">
//         <img
//           src="https://e1.pxfuel.com/desktop-wallpaper/949/711/desktop-wallpaper-dark-blue-minimalist-minimalist-dark-blue.jpg"
//           alt="Physics Quote"
//           className="absolute inset-0 w-full h-full object-cover opacity-70"
//         />
//         <div className="text-white text-center p-8 bg-transparent rounded-lg">
//           <h2 className="text-2xl italic font-bold mb-4 text-teal-100">
//             <span className="text-white inline-block animate-pulse">
//               Hashtag
//             </span>
//             <br />
//             <span className="text-white inline-block animate-pulse">
//               Drive-by
//             </span>
//           </h2>
//           <p className="text-lg italic text-white">
//             {Array.from("- Wade Wilson").map((char, index) =>
//               char === " " ? (
//                 <span key={index}>&nbsp;</span>
//               ) : (
//                 <span
//                   key={index}
//                   className="inline-block animate-pulse"
//                   style={{
//                     animationDelay: `${
//                       "One never notices what has been done; one can only see what remains to be done."
//                         .length *
//                         100 +
//                       index * 100
//                     }ms`,
//                   }}
//                 >
//                   {char}
//                 </span>
//               )
//             )}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
// import OAuth from "../components/OAuth";
import ThemeToggle from "../components/ThemeToggle";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/home");
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };

  return (
    <div>
      <header className="fixed w-full border-b-2 border-yellow-300/40 bg-yellow-100/60 dark:bg-black dark:border-gray-900 backdrop-blur-sm py-4 z-50 transition-all duration-200">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-xl font-light text-black dark:text-yellow-200 ml-5">
            N4M154
          </h1>
          <nav className="hidden md:flex space-x-6"></nav>
          <div className="mr-5">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-yellow-50 to-yellow-100 dark:from-black dark:to-black">
        {/* Main form container */}
        <div className="relative z-10 w-full max-w-md px-6 form-slide-in">
          <div className="dark:border-b-2 dark:border-r-2 dark:border-pink-300/40 rounded-3xl p-8 shadow-xl hover:scale-105 transition-all duration-300 form-fade-in bg-white/90 dark:bg-black/70">
            {/* Header with icon */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-glow icon-glow animate-bounce">
                <svg
                  className="w-8 h-8 text-pink-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-thin text-black dark:text-white mb-2">
                Welcome Back
              </h2>
              <p className="text-yellow-500">Sign in to your account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email input */}
              <div className="relative group">
                <input
                  id="email"
                  className="w-full px-4 py-4 bg-yellow-100 dark:bg-yellow-200/20 rounded-2xl text-black dark:text-white font-thin placeholder-yellow-400 focus:outline-none transition-all duration-200 backdrop-blur-sm input-focus"
                  placeholder="Email"
                  type="email"
                  value={formData.email || ""}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Password input */}
              <div className="relative group">
                <input
                  id="password"
                  className="w-full px-4 py-4 bg-yellow-100 dark:bg-yellow-200/20 rounded-2xl text-black dark:text-white font-thin placeholder-yellow-400 focus:outline-none transition-all duration-200 backdrop-blur-sm input-focus"
                  placeholder="Password"
                  type="password"
                  value={formData.password || ""}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 dark:bg-yellow-200 bg-black text-yellow-200 dark:text-black font-thin rounded-xl transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                    Signing In...
                  </div>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            {/* Signup link */}
            <div className="text-center mt-6">
              <p className="text-black dark:text-white font-thin">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-bold dark:text-white text-black hover:text-yellow-500 transition-colors duration-200 underline decoration-pink-200 hover:decoration-white"
                >
                  Sign up here
                </Link>
              </p>
            </div>

            {/* Error message (kept same behavior) */}
            <p className="text-red-700 mt-4 text-center">
              {error ? error.message || "Something went wrong!" : ""}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
