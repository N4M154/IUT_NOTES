import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { ArrowBigDownDash, PenLine } from "lucide-react";
import { Link } from "react-router-dom";
import ReviewCarousel from "../components/ReviewCarousel";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
  }, [navigate]);

  const mainRef = useRef(null);
  const RollDown = () => {
    if (mainRef.current) {
      mainRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-yellow-50 to-pink-50 dark:from-black dark:to-[#18181b]">
      <section
        className="
          relative flex flex-col items-center justify-center text-center
          min-h-screen bg-cover bg-center mt-[-65px]
          bg-[url('/4.png')] dark:bg-[url('/5.png')]
        "
      >
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-100/10 to-pink-100/20 dark:from-black/10 dark:to-black/10"></div>
        <div className="relative z-10 px-6">
          <p className="italic text-black text-xl dark:text-white">
            Welcome to
          </p>
          <h1 className="text-5xl font-extrabold tracking-widest text-yellow-400 dark:text-yellow-200">
            The <span className="text-black dark:text-white">Opinionated</span>
          </h1>
          <p className="mt-6 max-w-xl mx-auto text-black dark:text-pink-100">
            Got a hot take? Good. Got the guts to unleash it without wearing
            flame-retardant pants? Even better.
          </p>
          <p className="mt-4 max-w-xl mx-auto text-black dark:text-pink-100">
            This is your arena — toss in your thoughts on anime, movies, TV
            shows, music, and books, and watch the chaos unfold. Welcome to the
            glorious dumpster fire of opinions.
          </p>
        </div>

        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10">
          <ArrowBigDownDash
            className="w-15 h-15 text-black dark:text-white animate-bounce icon-glow cursor-pointer"
            onClick={RollDown}
          />
        </div>
      </section>

      <section
        ref={mainRef}
        className="w-full min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-yellow-50 to-pink-50 dark:from-black dark:to-[#18181b] relative"
      >
        <div className="absolute inset-0">
          <div className="absolute bottom-20 left-10 w-72 h-72 bg-pink-400/30 dark:bg-pink-400/10 rounded-full blur-3xl animate-pulse-ring"></div>
          <div
            className="absolute bottom-20 right-10 w-96 h-96 bg-violet-400/30 dark:bg-violet-400/10 rounded-full blur-3xl animate-pulse-ring"
            style={{ animationDelay: "-1.5s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 w-64 h-64 bg-yellow-400/30 dark:bg-yellow-400/10 rounded-full blur-3xl animate-pulse-ring"
            style={{ animationDelay: "-0.75s" }}
          ></div>
        </div>

        <div className="w-full max-w-7xl mx-auto px-12 relative z-10">
          <div className="mb-12 flex flex-col items-start">
            <Link to="/review-form">
              <div className="scale-90 group relative inline-flex px-6 py-3 rounded-full glass-card hover:glass-card-hover mt-5 transition-all duration-500">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-200/50 to-pink-200/50 animate-pulse-ring"></div>
                <PenLine className="w-6 h-6 text-black dark:text-yellow-200 animate-wave mr-1" />
                <span className="text-sm font-medium text-black dark:text-pink-200 group-hover:scale-105 transition-all duration-300">
                  Share your thoughts
                </span>
              </div>
            </Link>

            <h1 className="text-[45px] font-bold mt-4 text-left">
              <span className="block bg-gradient-to-r from-yellow-300 via-black/70 to-pink-400 dark:via-white dark:to-pink-400 bg-clip-text text-transparent">
                Let the world know your takes
              </span>
            </h1>

            <p className="text-lg font-thin text-gray-700 dark:text-gray-300 max-w-xl mt-2 text-left">
              Because yelling your opinions into the void is fun, but here…people actually listen.
            </p>
          </div>

          <div className="w-full flex justify-center items-center -mt-[150px]">
            <ReviewCarousel />
          </div>
        </div>
      </section>
    </div>
  );
}
