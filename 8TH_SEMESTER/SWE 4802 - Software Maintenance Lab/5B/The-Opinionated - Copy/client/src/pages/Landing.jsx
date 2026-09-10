import { Book, Film, Music, PawPrint, Tv, Star } from "lucide-react";
import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";

export function Landing() {
  return (
    <div>
      {/* Header */}
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

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center">
        <div
          className="absolute inset-0 z-0 bg-[url('/1.png')] dark:bg-[url('/2.png')]"
          style={{
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-yellow-100/20 dark:bg-black/10"></div>
        </div>
        <div className="relative container mx-auto px-4 py-32">
          <div className="max-w-3xl">
            <h1
              className="-mt-[35px] ml-10 text-3xl md:text-8xl hover:translate-x-2 transition-all duration-700 font-thin mb-6 text-yellow-300 dark:text-white animate-fade-in bg-clip-text"
              style={{
                letterSpacing: "-2px",
              }}
            >
              The{" "}
              <span className="text-black dark:text-yellow-200">
                Opinionated
              </span>
            </h1>

            <p className="ml-10 text-xl mb-8 text-black font-thin text-justify dark:text-yellow-100 animate-fade-in max-w-2xl leading-relaxed hover:translate-x-2 transition-all duration-700">
              Leave your hot takes for everyone to know!
            </p>
            <div className="ml-10 flex flex-col sm:flex-row gap-4 mb-16">
              <Link to="/login">
                <button className="group relative rounded-full sm:rounded-full bg-black text-yellow-200 dark:bg-yellow-200 dark:text-black px-8 py-4 text-lg transition-all duration-200 hover:scale-105  shadow-xl hover: shadow-xl shadow-black/40 hover:shadow-black/60 ">
                  <span className="flex items-center gap-2">
                    Let&apos;s Go!
                    <PawPrint className="w-5 h-5 transition-transform group-hover:rotate-12" />
                  </span>
                  <div className="absolute inset-0 rounded-xl bg-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-200"></div>
                </button>
              </Link>
            </div>
            <div className="ml-10 flex justify-left items-center space-x-8 opacity-60 form-fade-in">
              <div className="text-center group cursor-pointer hover:scale-120 transition-all duration-200">
                <Star className="w-8 h-8 text-black dark:text-white mx-auto mb-2 group-hover:text-yellow-400 transition-colors icon-glow" />
                <span className="text-sm text-pink-700 dark:text-pink-300">
                  Anime
                </span>
              </div>
              <div className="text-center group cursor-pointer hover:scale-120 transition-all duration-200">
                <Film className="w-8 h-8 text-black dark:text-white mx-auto mb-2 group-hover:text-yellow-400 transition-colors icon-glow" />
                <span className="text-sm text-pink-700 dark:text-pink-300">
                  Movies
                </span>
              </div>
              <div className="text-center group cursor-pointer hover:scale-120 transition-all duration-200">
                <Tv className="w-8 h-8 text-black dark:text-white mx-auto mb-2 group-hover:text-yellow-400 transition-colors icon-glow" />
                <span className="text-sm text-pink-700 dark:text-pink-300">
                  TV Shows
                </span>
              </div>
              <div className="text-center group cursor-pointer hover:scale-120 transition-all duration-200">
                <Book className="w-8 h-8 text-black dark:text-white mx-auto mb-2 group-hover:text-yellow-400 transition-colors icon-glow" />
                <span className="text-sm text-pink-700 dark:text-pink-300">
                  Books
                </span>
              </div>
              <div className="text-center group cursor-pointer hover:scale-120 transition-all duration-200">
                <Music className="w-8 h-8 text-black dark:text-white mx-auto mb-2 group-hover:text-yellow-400 transition-colors icon-glow" />
                <span className="text-sm text-pink-700 dark:text-pink-300">
                  Music
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Showcase */}
      <section className="py-20 px-6 relative bg-yellow-50 dark:bg-[#181818]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-thin text-black dark:text-yellow-200 mb-6 form-fade-in">
            Review Everything You Love
          </h2>
          <p className="text-xl text-pink-400 dark:text-pink-200 mb-12 form-fade-in">
            From blockbusters to indie gems, share your passion across all media
          </p>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            <div className="p-6 hover:scale-150 transition-all duration-200 cursor-pointer form-slide-in">
              <Film className="w-12 h-12 text-yellow-200 mx-auto mb-3 icon-glow-landing" />
              <h3 className="text-black dark:text-white font-thin">Movies</h3>
            </div>
            <div className="p-6 hover:scale-150 transition-all duration-200 cursor-pointer form-slide-in">
              <Tv className="w-12 h-12 text-yellow-200 mx-auto mb-3 icon-glow-landing" />
              <h3 className="text-black dark:text-white font-thin">TV Shows</h3>
            </div>
            <div className=" p-6 hover:scale-150 transition-all duration-200 cursor-pointer form-slide-in">
              <Book className="w-12 h-12 text-yellow-200 mx-auto mb-3 icon-glow-landing" />
              <h3 className="text-black dark:text-white font-thin">Books</h3>
            </div>
            <div className=" p-6 hover:scale-150 transition-all duration-200 cursor-pointer form-slide-in">
              <Music className="w-12 h-12 text-yellow-200 mx-auto mb-3 icon-glow-landing" />
              <h3 className="text-black dark:text-white font-thin">Music</h3>
            </div>
            <div className=" p-6 hover:scale-150 transition-all duration-200 cursor-pointer form-slide-in">
              <Star className="w-12 h-12 text-yellow-200 mx-auto mb-3 icon-glow-landing" />
              <h3 className="text-black dark:text-white font-thin">Anime</h3>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Landing;
