import React from "react";
import { Github, Mail } from "lucide-react";
import { PiSnowflakeThin } from "react-icons/pi";

export default function Footer() {
  return (
    <footer className="w-full px-6 py-4 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Left Section */}
          <div className="flex items-center -ml-[500px] justify-center md:justify-start gap-2 flex-col">
            <div className="flex items-center gap-2 ml-[40px]">
              <PiSnowflakeThin className="w-4 h-4 -mr-1 text-black dark:text-yellow-100" />
              <span className="text-sm text-black dark:text-yellow-100 font-light">
                N4M154
              </span>
              <PiSnowflakeThin className="w-4 h-4 -ml-1 text-black dark:text-yellow-100" />
            </div>
            <span className="text-[10px] text-black dark:dark:text-yellow-100 font-normal ml-20">
              © {new Date().getFullYear()} The Opinionated. All rights
              reserved.
            </span>
          </div>

          {/* Right Section - Links */}
          <div className="flex items-center justify-center md:justify-end">
            <a
              href="https://github.com/N4M154"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-black dark:text-yellow-100 hover:text-yellow-400 dark:hover:dark:text-yellow-200 transition-colors"
            >
              <Github className="w-5 h-5" />
              <span className="text-sm font-thin hover:underline">GitHub</span>
            </a>
            <div className="mx-4 h-5 w-px bg-black/30 dark:bg-violet-300/30" />
            <a
              href="mailto:namisa.najah.raisa@gmail.com"
              className="flex items-center gap-2 text-black dark:text-pink-100 hover:text-yellow-400 dark:hover:text-pink-300 transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span className="text-sm font-thin hover:underline">
                Namisa Najah
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
