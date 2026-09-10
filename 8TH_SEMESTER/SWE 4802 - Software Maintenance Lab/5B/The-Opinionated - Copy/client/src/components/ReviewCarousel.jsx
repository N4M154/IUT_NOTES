import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CarouselCard from "./CarouselCard";

const sampleReviews = [
  {
    _id: "1",
    category: "anime",
    workName: "Attack on Titan",
    authorName: "Eren Yeager",
    review:
      "This anime completely changed my perspective on storytelling. The way it handles themes of war, freedom, and morality is absolutely mind-blowing. The animation quality is top-tier and the character development is phenomenal. Every episode leaves you wanting more!",
    datePosted: "2024-01-15T10:30:00Z",
    reactions: [
      { reactionType: "love" },
      { reactionType: "love" },
      { reactionType: "creative" },
      { reactionType: "funny" },
      { reactionType: "love" },
    ],
  },
  {
    _id: "2",
    category: "movie",
    workName: "Inception",
    authorName: "Christopher Nolan",
    review:
      "A masterpiece of mind-bending cinema! The concept of dreams within dreams is executed flawlessly. Hans Zimmer's score elevates every scene, and the practical effects are incredible. This is the kind of movie that gets better with every rewatch.",
    datePosted: "2024-01-10T14:20:00Z",
    reactions: [
      { reactionType: "creative" },
      { reactionType: "love" },
      { reactionType: "creative" },
      { reactionType: "love" },
      { reactionType: "funny" },
      { reactionType: "love" },
    ],
  },
  {
    _id: "3",
    category: "tv show",
    workName: "Breaking Bad",
    authorName: "Walter White",
    review:
      "The character arc of Walter White is one of the most compelling transformations in television history. The writing is tight, the acting is phenomenal, and the cinematography is absolutely stunning. This show proves that TV can be just as powerful as cinema.",
    datePosted: "2024-01-08T09:15:00Z",
    reactions: [
      { reactionType: "love" },
      { reactionType: "creative" },
      { reactionType: "love" },
      { reactionType: "love" },
      { reactionType: "creative" },
    ],
  },
  {
    _id: "4",
    category: "music",
    workName: "Dark Side of the Moon",
    authorName: "Pink Floyd",
    review:
      "This album is a journey through the human experience. From the heartbeat at the beginning to the philosophical musings throughout, every track flows seamlessly into the next. The production quality was ahead of its time and still sounds incredible today.",
    datePosted: "2024-01-05T16:45:00Z",
    reactions: [
      { reactionType: "love" },
      { reactionType: "love" },
      { reactionType: "creative" },
      { reactionType: "love" },
      { reactionType: "funny" },
      { reactionType: "love" },
      { reactionType: "creative" },
    ],
  },
  {
    _id: "5",
    category: "book",
    workName: "1984",
    authorName: "George Orwell",
    review:
      "Orwell's vision of a dystopian future feels more relevant than ever. The concept of Big Brother and thoughtcrime is terrifying because it's not entirely fictional. This book should be required reading for everyone who values freedom and truth.",
    datePosted: "2024-01-03T11:30:00Z",
    reactions: [
      { reactionType: "creative" },
      { reactionType: "love" },
      { reactionType: "sad" },
      { reactionType: "creative" },
      { reactionType: "love" },
    ],
  },
];

export default function ReviewCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // map categories to hex colors (adjust as you like)
  const CATEGORY_COLORS = {
    anime: "#ec4899", // pink-400
    movie: "#f97316", // orange-500
    "tv show": "#06b6d4", // cyan-500
    music: "#8b5cf6", // violet-500
    book: "#f59e0b", // amber-500
  };

  const hexToRgb = (hex) => {
    const cleaned = hex.replace("#", "");
    const bigint = parseInt(
      cleaned.length === 3
        ? cleaned
            .split("")
            .map((c) => c + c)
            .join("")
        : cleaned,
      16
    );
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
  };

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === sampleReviews.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(
      currentIndex === 0 ? sampleReviews.length - 1 : currentIndex - 1
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(
      currentIndex === sampleReviews.length - 1 ? 0 : currentIndex + 1
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const goToSlide = (index) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const getCardStyle = (index) => {
    const totalCards = sampleReviews.length;
    const angle = (360 / totalCards) * (index - currentIndex);
    const radius = 200;

    const x = Math.sin((angle * Math.PI) / 180) * radius;
    const z = Math.cos((angle * Math.PI) / 180) * radius;
    const rotationY = angle;

    const distance = Math.abs(angle);
    const scale = distance > 60 ? 0.7 : 1 - (distance / 60) * 0.3;
    const opacity = distance > 60 ? 0.4 : 1 - (distance / 60) * 0.6;
    const zIndex = distance > 60 ? 1 : 10 - Math.floor(distance / 10);

    const shadowIntensity = Math.max(0, (z + radius) / (2 * radius));
    const shadowBlur = 15 + shadowIntensity * 25;
    const shadowOpacity = 0.25 + shadowIntensity * 0.5;

    // determine color for this card based on category
    const category = (sampleReviews[index]?.category || "").toLowerCase();
    const hex = CATEGORY_COLORS[category] || "#000000";
    const { r, g, b } = hexToRgb(hex);

    // make the glow barely visible: very low alpha caps
    const dropAlpha = Math.min(0.08, shadowOpacity * 0.12); // max 0.08
    const boxAlpha = Math.min(0.04, shadowOpacity * 0.08); // max 0.04
    const dropShadowColor = `rgba(${r}, ${g}, ${b}, ${dropAlpha})`;
    const boxShadowColor = `rgba(${r}, ${g}, ${b}, ${boxAlpha})`;

    return {
      transform: `translateX(${x}px) translateZ(${z}px) rotateY(${rotationY}deg) scale(${scale})`,
      opacity: opacity,
      zIndex: zIndex,
      filter: `drop-shadow(0 ${shadowBlur}px ${shadowBlur * 1.5}px ${dropShadowColor})`,
      boxShadow: `0 ${shadowBlur}px ${shadowBlur * 2}px ${boxShadowColor}`,
    };
  };

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[800px] relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-pink-400/20 dark:bg-pink-400/10 rounded-full blur-2xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-yellow-400/20 dark:bg-yellow-400/10 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "-1s" }}
        ></div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotateX(0deg);
          }
          50% {
            transform: translateY(-10px) rotateX(2deg);
          }
        }

        @keyframes glow {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(236, 72, 153, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(236, 72, 153, 0.6);
          }
        }
      `}</style>

      <div className="relative flex items-center justify-center w-full">
        <button
          onClick={goToPrevious}
          className="absolute left-8 top-1/2 transform -translate-y-1/2 glass-card hover:glass-card-hover rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 z-20 group"
          aria-label="Previous review"
        >
          <ChevronLeft className="w-8 h-8 text-gray-700 dark:text-gray-300 group-hover:text-pink-400 dark:group-hover:text-pink-300 transition-colors duration-200" />
        </button>

        <div
          className="relative"
          style={{
            width: "500px",
            height: "400px",
            perspective: "1000px",
            perspectiveOrigin: "center center",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              transformStyle: "preserve-3d",
              transition: isTransitioning
                ? "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
                : "none",
              animation:
                isAutoPlaying && !isTransitioning
                  ? "float 6s ease-in-out infinite"
                  : "none",
            }}
          >
            {sampleReviews.map((review, index) => (
              <div
                key={review._id}
                className="absolute"
                style={{
                  left: "50%",
                  top: "50%",
                  width: "280px",
                  height: "350px",
                  marginLeft: "-140px",
                  marginTop: "-175px",
                  transformStyle: "preserve-3d",
                  transition: isTransitioning
                    ? "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
                    : "none",
                  ...getCardStyle(index),
                }}
              >
                <div
                  className="w-full h-full"
                  style={{
                    // use category color for the focused card glow
                    filter:
                      index === currentIndex
                        ? (() => {
                            const hex =
                              CATEGORY_COLORS[
                                (review.category || "").toLowerCase()
                              ] || "#ec4899";
                            const { r, g, b } = hexToRgb(hex);
                            // very subtle focused glow
                            return `drop-shadow(0 0 20px rgba(${r}, ${g}, ${b}, 0.06))`;
                          })()
                        : "none",
                    transition: "filter 0.3s ease-in-out",
                  }}
                >
                  <CarouselCard review={review} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={goToNext}
          className="absolute right-8 top-1/2 transform -translate-y-1/2 glass-card hover:glass-card-hover rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 z-20 group"
          aria-label="Next review"
        >
          <ChevronRight className="w-8 h-8 text-gray-700 dark:text-gray-300 group-hover:text-pink-400 dark:group-hover:text-pink-300 transition-colors duration-200" />
        </button>
      </div>

      <div className="flex justify-center mt-8 space-x-2 relative z-10">
        {sampleReviews.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
              index === currentIndex
                ? "bg-pink-400 dark:bg-pink-300 scale-125 shadow-lg shadow-pink-400/50"
                : "bg-gray-300 dark:bg-gray-600 hover:bg-pink-300 dark:hover:bg-pink-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
