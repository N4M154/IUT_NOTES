import { Laugh, Lightbulb, Heart, HeartCrack, Angry } from "lucide-react";

export default function CarouselCard({ review }) {
  const getReactionCount = (type) => {
    return review.reactions?.filter((r) => r.reactionType === type).length || 0;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      anime:
        "bg-pink-500/20 text-pink-500 border-pink-500/30 dark:text-pink-300",
      movie:
        "bg-blue-500/20 text-blue-500 border-blue-500/30 dark:text-blue-300",
      "tv show":
        "bg-green-500/20 text-green-500 border-green-500/30 dark:text-green-300",
      music:
        "bg-purple-500/20 text-purple-500 border-purple-500/30 dark:text-purple-300",
      book: "bg-yellow-500/20 text-yellow-500 border-yellow-500/30 dark:text-yellow-300",
    };
    return (
      colors[category] || "bg-gray-500/20 text-gray-300 border-gray-500/30"
    );
  };

  const getReactionColor = (type) => {
    const colors = {
      funny:
        "bg-green-500/20 text-green-500 dark:text-green-200 border-green-500/30",
      creative:
        "bg-yellow-500/20 text-yellow-500 dark:text-yellow-200 border-yellow-500/30",
      love: "bg-pink-500/20 text-pink-500 dark:text-pink-200 border-pink-500/30",
      sad: "bg-blue-500/20 text-blue-500 dark:text-blue-200 border-blue-500/30",
      angry: "bg-red-500/20 text-red-500 dark:text-red-200 border-red-500/30",
    };
    return colors[type] || "bg-gray-500/20 text-gray-300 border-gray-500/30";
  };

  return (
    <div className="rounded-2xl p-6 border border-pink-300 dark:border-gray-400/40 transition-all duration-300 ease-out relative h-full flex flex-col bg-white dark:bg-black backdrop-blur-sm w-full">
      <div className="flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-thin border ${getCategoryColor(
              review.category
            )}`}
          >
            {review.category}
          </span>
          <span className="text-sm text-black/60 dark:text-white/50 font-thin">
            {formatDate(review.datePosted)}
          </span>
        </div>

        <h3 className="text-lg font-medium mb-2 line-clamp-1 text-black dark:text-white">
          {review.workName}
        </h3>

        <p className="text-black/60 dark:text-white/50 text-sm mb-3 font-thin line-clamp-1">
          by {review.authorName || "Unknown"}
        </p>

        <div className="flex-1 mb-4">
          <p className="text-black/60 dark:text-white font-thin text-xs line-clamp-4 break-words">
            {review.review}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex flex-wrap gap-1">
          <div
            className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs border ${getReactionColor("funny")}`}
          >
            <Laugh className="w-3 h-3" /> {getReactionCount("funny")}
          </div>
          <div
            className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs border ${getReactionColor("creative")}`}
          >
            <Lightbulb className="w-3 h-3" /> {getReactionCount("creative")}
          </div>
          <div
            className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs border ${getReactionColor("love")}`}
          >
            <Heart className="w-3 h-3" /> {getReactionCount("love")}
          </div>
          <div
            className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs border ${getReactionColor("sad")}`}
          >
            <HeartCrack className="w-3 h-3" /> {getReactionCount("sad")}
          </div>
          <div
            className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs border ${getReactionColor("angry")}`}
          >
            <Angry className="w-3 h-3" /> {getReactionCount("angry")}
          </div>
        </div>
      </div>
    </div>
  );
}
