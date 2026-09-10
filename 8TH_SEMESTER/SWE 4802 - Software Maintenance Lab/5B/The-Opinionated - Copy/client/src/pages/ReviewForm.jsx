import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { useSelector } from "react-redux";

export default function ReviewForm() {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    category: "",
    workName: "",
    review: "",
    authorName: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const categories = ["anime", "movie", "tv show", "music", "book"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    if (!currentUser) {
      setError("Please login first");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("api/review/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/reviews");
      } else {
        setError(data.message || "Failed to create review");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden py-8 px-4 bg-gradient-to-b from-yellow-50 to-pink-100 dark:from-black dark:to-[#18181b]">
      <div className="relative z-10 max-w-2xl mx-auto form-slide-in">
        <div className="  rounded-3xl  shadow-xl p-8 border border-white/20 form-fade-in">
          {/* Header with icon */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-200 to-yellow-200 rounded-full flex items-center justify-center mx-auto mb-4 icon-glow">
              <svg
                className="w-8 h-8 text-pink-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-thin text-black dark:text-white mb-2">
              Write a Review
            </h1>
            <p className="text-yellow-400 font-thin">Share your thoughts</p>
            {/* Close (X) button in header */}
            <button
              type="button"
              onClick={() => navigate("/home")}
              className="absolute top-6 right-6 bg-white/70 dark:bg-black/50 hover:bg-pink-200 text-pink-500 rounded-full p-2 shadow transition-all duration-200 focus:outline-none"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {error && (
            <div className="  bg-red-500/20 border border-red-400/30 text-red-200 px-4 py-3 rounded-xl mb-6 animate-bounce">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative group">
              <label className="block text-sm font-thin text-black dark:text-white mb-2">
                Your Display Name *
              </label>
              <input
                type="text"
                name="authorName"
                value={formData.authorName}
                onChange={handleChange}
                required
                placeholder="How you want to be displayed"
                className="w-full px-4 py-4 bg-white dark:bg-black/50 border border-white/20 rounded-xl text-black dark:text-white font-thin placeholder-black/20 dark:placeholder-white/50 focus:outline-none focus:ring-2 focus:pink-400 focus:border-transparent transition-all duration-200 backdrop-blur-sm input-focus resize-none"
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-50 to-pink-100 dark:from-black/50 dark:to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-10"></div>
            </div>
            <div className="relative group">
              <label className="block text-sm font-thin text-black dark:text-white mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-4 bg-white dark:bg-black/50 border border-white/20 rounded-xl text-black dark:text-white font-thin placeholder-black/20 dark:placeholder-white/50 focus:outline-none focus:ring-2 focus:pink-400 focus:border-transparent transition-all duration-200 backdrop-blur-sm input-focus resize-none"
              >
                <option value="" className="bg-yellow-50 dark:bg-black/50">
                  Select a category
                </option>
                {categories.map((category) => (
                  <option
                    key={category}
                    value={category}
                    className="bg-yellow-50 dark:bg-black/50"
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-50 to-pink-100 dark:from-black/50 dark:to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-10"></div>
            </div>

            <div className="relative group">
              <label className="block text-sm font-thin text-black dark:text-white mb-2">
                Name of the Work *
              </label>
              <input
                type="text"
                name="workName"
                value={formData.workName}
                onChange={handleChange}
                required
                placeholder="e.g., Attack on Titan, The Matrix, Breaking Bad..."
                className="w-full px-4 py-4 bg-white dark:bg-black/50 border border-white/20 rounded-xl text-black dark:text-white font-thin placeholder-black/20 dark:placeholder-white/50 focus:outline-none focus:ring-2 focus:pink-400 focus:border-transparent transition-all duration-200 backdrop-blur-sm input-focus resize-none"
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-50 to-pink-100 dark:from-black/50 dark:to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-10"></div>
            </div>

            <div className="relative group">
              <label className="block text-sm font-thin text-black dark:text-white mb-2">
                Your Review *
              </label>
              <textarea
                name="review"
                value={formData.review}
                onChange={handleChange}
                required
                rows="8"
                placeholder="Share your thoughts about this work..."
                className="w-full px-4 py-4 bg-white dark:bg-black/50 border border-white/20 rounded-xl text-black dark:text-white font-thin placeholder-black/20 dark:placeholder-white/50 focus:outline-none focus:ring-2 focus:pink-400 focus:border-transparent transition-all duration-200 backdrop-blur-sm input-focus resize-none"
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-50 to-pink-100 dark:from-black/50 dark:to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-10"></div>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-4 bg-black text-white dark:bg-yellow-200 dark:text-black font-thin rounded-xl transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                    Posting...
                  </div>
                ) : (
                  "Post Review"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
