import { useEffect, useState } from "react";
import { Lightbulb } from "lucide-react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState("light");
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setTheme(prefersDark ? "dark" : "light");
      document.documentElement.classList.toggle("dark", prefersDark);
    }
  }, []);

  const toggleTheme = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    const newTheme = theme === "light" ? "dark" : "light";

    setTimeout(() => {
      setTheme(newTheme);
      document.documentElement.classList.toggle("dark", newTheme === "dark");
      localStorage.setItem("theme", newTheme);

      setTimeout(() => setIsAnimating(false), 300);
    }, 150);
  };

  return (
    <div className="flex flex-col items-center -mb-2">
      {/* Lightbulb Container */}
      <div
        onClick={toggleTheme}
        className="relative cursor-pointer group p-2 mr-4"
      >
        {/* Glow Effect for Light Theme */}
        <div
          className={`absolute inset-0 rounded-full transition-all duration-500 ease-in-out ${
            theme === "light"
              ? "bg-yellow-300/60 blur-xl scale-150 opacity-100"
              : "bg-transparent scale-100 opacity-0"
          }`}
        />

        {/* Secondary Glow */}
        <div
          className={`absolute inset-0 rounded-full transition-all duration-700 ease-in-out ${
            theme === "light"
              ? "bg-yellow-200/30 blur-lg scale-125 opacity-100"
              : "bg-transparent scale-100 opacity-0"
          }`}
        />

        {/* Lightbulb Icon */}
        <div className="relative z-10 ">
          <Lightbulb
            size={30}
            className={`transition-all duration-500 ease-in-out transform-gpu ${
              theme === "light"
                ? "text-yellow-500 fill-yellow-300/80 scale-105 drop-shadow-lg"
                : "text-gray-400 dark:text-pink-300/50 fill-transparent scale-100"
            } ${
              isAnimating
                ? "animate-pulse"
                : theme === "light"
                  ? "animate-pulse"
                  : ""
            }`}
            strokeWidth={theme === "light" ? 1 : 2}
          />
        </div>

        {/* Light Rays */}
        {theme === "light" && (
          <div className="absolute inset-0 z-0">
            {/* Ray 1 */}
            <div
              className={`absolute top-1 left-1/2 w-0.5 h-3 bg-yellow-300/50 rounded-full transform -translate-x-0.5 transition-all duration-500 ${
                theme === "light" ? "opacity-100 animate-pulse" : "opacity-0"
              }`}
            />
            {/* Ray 2 */}
            <div
              className={`absolute bottom-1 left-1/2 w-0.5 h-3 bg-yellow-300/50 rounded-full transform -translate-x-0.5 transition-all duration-500 ${
                theme === "light" ? "opacity-100 animate-pulse" : "opacity-0"
              }`}
            />
            {/* Ray 3 */}
            <div
              className={`absolute top-1/2 left-1 w-3 h-0.5 bg-yellow-300/50 rounded-full transform -translate-y-0.5 transition-all duration-500 ${
                theme === "light" ? "opacity-100 animate-pulse" : "opacity-0"
              }`}
            />
            {/* Ray 4 */}
            <div
              className={`absolute top-1/2 right-1 w-3 h-0.5 bg-yellow-300/50 rounded-full transform -translate-y-0.5 transition-all duration-500 ${
                theme === "light" ? "opacity-100 animate-pulse" : "opacity-0"
              }`}
            />
            {/* Diagonal Rays */}
            <div
              className={`absolute top-2 left-2 w-0.5 h-2 bg-yellow-300/50 rounded-full transform rotate-45 transition-all duration-500 ${
                theme === "light" ? "opacity-100 animate-pulse" : "opacity-0"
              }`}
            />
            <div
              className={`absolute top-2 right-2 w-0.5 h-2 bg-yellow-300/50 rounded-full transform -rotate-45 transition-all duration-500 ${
                theme === "light" ? "opacity-100 animate-pulse" : "opacity-0"
              }`}
            />
            <div
              className={`absolute bottom-2 left-2 w-0.5 h-2 bg-yellow-300/50 rounded-full transform -rotate-45 transition-all duration-500 ${
                theme === "light" ? "opacity-100 animate-pulse" : "opacity-0"
              }`}
            />
            <div
              className={`absolute bottom-2 right-2 w-0.5 h-2 bg-yellow-300/50 rounded-full transform rotate-45 transition-all duration-500 ${
                theme === "light" ? "opacity-100 animate-pulse" : "opacity-0"
              }`}
            />
          </div>
        )}

        {/* Hover Effect */}
        <div
          className={`absolute inset-0 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 ${
            theme === "light"
              ? "bg-yellow-200/60 scale-125"
              : "bg-gray-200/10 dark:bg-pink-300/20 scale-110"
          }`}
        />
      </div>
    </div>
  );
};

export default ThemeToggle;
