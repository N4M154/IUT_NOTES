// import { useSelector } from "react-redux";
// import { useRef, useState, useEffect } from "react";
// import {
//   getDownloadURL,
//   getStorage,
//   ref,
//   uploadBytesResumable,
// } from "firebase/storage";
// import { app } from "../firebase";
// import { useDispatch } from "react-redux";
// import {
//   updateUserStart,
//   updateUserSuccess,
//   updateUserFailure,
//   deleteUserStart,
//   deleteUserSuccess,
//   deleteUserFailure,
//   signOut,
// } from "../redux/user/userSlice";

// export default function Profile() {
//   const dispatch = useDispatch();
//   const fileRef = useRef(null);
//   const [image, setImage] = useState(undefined);
//   const [imagePercent, setImagePercent] = useState(0);
//   const [imageError, setImageError] = useState(false);
//   const [formData, setFormData] = useState({});
//   const [updateSuccess, setUpdateSuccess] = useState(false);

//   const { currentUser, loading, error } = useSelector((state) => state.user);
//   useEffect(() => {
//     if (image) {
//       handleFileUpload(image);
//     }
//   }, [image]);
//   const handleFileUpload = async (image) => {
//     const storage = getStorage(app);
//     const fileName = new Date().getTime() + image.name;
//     const storageRef = ref(storage, fileName);
//     const uploadTask = uploadBytesResumable(storageRef, image);
//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         const progress =
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         setImagePercent(Math.round(progress));
//       },
//       (error) => {
//         setImageError(true);
//       },
//       () => {
//         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
//           setFormData({ ...formData, profilePicture: downloadURL })
//         );
//       }
//     );
//   };
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       dispatch(updateUserStart());
//       const res = await fetch(`/api/user/update/${currentUser._id}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });
//       const data = await res.json();
//       if (data.success === false) {
//         dispatch(updateUserFailure(data));
//         return;
//       }
//       dispatch(updateUserSuccess(data));
//       setUpdateSuccess(true);
//     } catch (error) {
//       dispatch(updateUserFailure(error));
//     }
//   };

//   const handleDeleteAccount = async () => {
//     try {
//       dispatch(deleteUserStart());
//       const res = await fetch(`/api/user/delete/${currentUser._id}`, {
//         method: "DELETE",
//       });
//       const data = await res.json();
//       if (data.success === false) {
//         dispatch(deleteUserFailure(data));
//         return;
//       }
//       dispatch(deleteUserSuccess(data));
//     } catch (error) {
//       dispatch(deleteUserFailure(error));
//     }
//   };

//   const handleSignOut = async () => {
//     try {
//       await fetch("/api/auth/signout");
//       dispatch(signOut());
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
//     <div className="bg-slate-600 min-h-screen ">
//       <div className="p-4 max-w-lg mx-auto bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 mb-2 p-5 rounded-lg shadow-lg">
//         <h1 className="text-3xl font-bold text-center my-7 text-blue-700">
//           Profile
//         </h1>
//         <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//           <input
//             type="file"
//             ref={fileRef}
//             hidden
//             accept="image/*"
//             onChange={(e) => setImage(e.target.files[0])}
//           />
//           <img
//             src={formData.profilePicture || currentUser.profilePicture}
//             alt="profile"
//             className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"
//             onClick={() => fileRef.current.click()}
//           />
//           <p className="text-sm self-center">
//             {imageError ? (
//               <span className="text-red-700">
//                 Error uploading image (file size must be less than 2 MB)
//               </span>
//             ) : imagePercent > 0 && imagePercent < 100 ? (
//               <span className="text-slate-700">{`Uploading: ${imagePercent} %`}</span>
//             ) : imagePercent === 100 ? (
//               <span className="text-green-700">
//                 Image uploaded successfully
//               </span>
//             ) : (
//               ""
//             )}
//           </p>
//           <input
//             defaultValue={currentUser.username}
//             type="text"
//             id="username"
//             placeholder="Username"
//             className="bg-sky-100 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
//             onChange={handleChange}
//           />
//           <input
//             defaultValue={currentUser.email}
//             type="email"
//             id="email"
//             placeholder="Email"
//             className="bg-sky-100 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
//             onChange={handleChange}
//           />
//           <input
//             type="password"
//             id="password"
//             placeholder="Password"
//             className="bg-sky-100 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
//             onChange={handleChange}
//           />
//           <button className="bg-sky-700 text-white font-semibold p-3 rounded-lg uppercase hover:bg-sky-500">
//             {loading ? "Loading..." : "Update"}
//           </button>
//         </form>
//         <div className="flex justify-between mt-5">
//           <span
//             onClick={handleDeleteAccount}
//             className="text-red-400 cursor-pointer font-semibold hover:text-red-500"
//           >
//             Delete Account
//           </span>
//           <span
//             onClick={handleSignOut}
//             className="text-green-500 font-semibold hover:text-blue-400 cursor-pointer"
//           >
//             Sign out
//           </span>
//         </div>
//         <p className="text-red-700 mt-5 font-semibold text-center">
//           {error && "Something went wrong!"}
//         </p>
//         <p className="text-green-300 mt-5 font-semibold text-center">
//           {updateSuccess && "User is updated successfully!"}
//         </p>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ReviewCard from "../components/ReviewCard";
import { NotebookPen, LogOut } from "lucide-react";
import { signOut } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

export default function Profile() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const [userEmail, setUserEmail] = useState("");
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("activeTab") || "profile"
  );
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  useEffect(() => {
    const fetchUserData = async () => {
      // const token = localStorage.getItem("token");
      if (!currentUser) {
        navigate("/login");
        return;
      }

      try {
        // Fetch profile info
        const response = await fetch("/api/user/profile", {
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          const data = await response.json();
          setUserEmail(data.email);

          // Fetch only the logged-in user's reviews
          const reviewsRes = await fetch("/api/review/user/reviews", {
            headers: { "Content-Type": "application/json" },
          });
          if (reviewsRes.ok) {
            const reviewsData = await reviewsRes.json();
            setReviews(reviewsData.data);
          }
        } else {
          // localStorage.removeItem("token");
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate, currentUser]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/signout");
      dispatch(signOut());
      localStorage.removeItem("activeTab");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    // const token = localStorage.getItem("token");
    try {
      const response = await fetch(`/api/review/reviews/${reviewId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        // Remove the deleted review from state
        setReviews(reviews.filter((review) => review._id !== reviewId));
      } else {
        console.error("Failed to delete review");
      }
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-yellow-50 to-pink-50 dark:from-black dark:to-[#18181b]">
        <div className="relative z-10 text-center form-fade-in">
          <div className="  rounded-2xl p-8 border border-white/20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-400 mx-auto mb-4"></div>
            <p className="text-white/80">Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-b from-yellow-50 to-pink-50 dark:from-black dark:to-[#18181b]">
      {/* Sidebar */}
      <aside className="w-60 bg-transparent dark:bg-black/40 p-8 flex flex-col items-center">
        {/* Profile icon */}
        <div className="mb-8">
          <div className="w-20 h-20 bg-pink-300/70 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-glow icon-glow">
            <svg
              className="w-10 h-10 text-white"
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
        </div>

        {/* Navigation buttons */}
        <button
          className={`w-full py-3 mb-2 rounded-lg font-thin  ${
            activeTab === "profile"
              ? "bg-yellow-200 text-black"
              : "bg-white dark:bg-white/10 text-black/60 dark:text-yellow-200 cursor-pointer"
          }`}
          onClick={() => setActiveTab("profile")}
        >
          Profile Info
        </button>
        <button
          className={`w-full py-3 rounded-lg font-thin  ${
            activeTab === "reviews"
              ? "bg-yellow-200 text-black"
              : "bg-white dark:bg-white/10 text-black/60 dark:text-yellow-200 cursor-pointer"
          }`}
          onClick={() => setActiveTab("reviews")}
        >
          Posted Reviews
        </button>
        <button
          onClick={handleLogout}
          className="w-full mt-auto py-3 bg-yellow-300/50 dark:bg-yellow-200 text-black font-thin rounded-xl hover:from-red-600 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <LogOut className="w-5 h-5 inline-block mr-2" />
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-6xl w-full px-6">
          {activeTab === "profile" ? (
            <div className="rounded-xl p-8 border border-pink-200 dark:border-gray-400/30 form-fade-in bg-white/30 dark:bg-black/30">
              {/* PROFILE container with unique padding, bg, etc */}
              <h1 className="text-3xl font-thin text-black dark:text-yellow-100 mb-6 tracking-wide">
                Profile
              </h1>
              <p className="font-thin text-black dark:text-pink-50 mb-8 max-w-md leading-relaxed">
                Your account information
              </p>
              <div className="space-y-8">
                <div>
                  <label className="block text-sm font-thin text-black mb-2 dark:text-yellow-200">
                    Email Address
                  </label>
                  <p className="text-lg text-black font-light dark:text-yellow-100">
                    {userEmail}
                  </p>
                </div>
                <div className="  bg-white/10 rounded-2xl p-6 border border-pink-200 dark:border-gray-400/40 flex items-center gap-3">
                  <div className="w-4 h-4 bg-pink-400 rounded-full animate-pulse"></div>
                  <span className="text-pink-300 font-semibold">Active</span>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <h1 className="text-3xl font-thin text-black dark:text-white mb-8 tracking-tight flex justify-center">
                Your Hot Takes
              </h1>

              {reviews.length === 0 ? (
                <div>
                  <p className="text-black dark:text-pink-200 font-thin flex justify-center items-center gap-4">
                    You haven&apos;t posted anything yet! Leave your first
                    review
                  </p>
                  <div className="flex justify-center mt-4">
                    <button
                      onClick={() => navigate("/review-form")}
                      className=" dark:text-yellow-200 text-pink-500 rounded-xl transition-all duration-200 transform hover:scale-105  whitespace-nowrap h-[44px]"
                    >
                      <NotebookPen className="w-10 h-10 inline-block mr-2" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {reviews.map((review) => (
                    <ReviewCard
                      key={review._id}
                      review={review}
                      showDelete={true}
                      onDelete={handleDeleteReview}
                      // onReaction={handleReaction}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
