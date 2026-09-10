import { useState, useRef } from "react";
import { FaTimes, FaTrash } from "react-icons/fa";
import { Laugh, Lightbulb, Heart, HeartCrack, Angry } from "lucide-react";
// import { Tooltip } from "react-tooltip";

export default function ReviewCard({
  review,
  onReaction,
  onDelete,
  showDelete,
}) {
  const [showModal, setShowModal] = useState(false);
  const [isReacting, setIsReacting] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const cardCenterX = rect.left + rect.width / 2;
    const cardCenterY = rect.top + rect.height / 2;

    // Calculate mouse position relative to card center
    const mouseX = e.clientX - cardCenterX;
    const mouseY = e.clientY - cardCenterY;

    // Calculate rotation angles (limit the rotation for subtle effect)
    const rotateX = (mouseY / rect.height) * -20; // Negative for natural movement
    const rotateY = (mouseX / rect.width) * 20;

    // Apply the transform
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;

    // Reset the transform with smooth transition
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)`;
  };

  const handleReaction = async (reactionType) => {
    setIsReacting(true);
    try {
      await onReaction(review._id, reactionType);
    } finally {
      setIsReacting(false);
    }
  };

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
      sad: "bg-indigo-500/20 text-indigo-500 dark:text-indigo-200 border-indigo-500/30",
      angry: "bg-red-500/20 text-red-500 dark:text-red-200 border-red-500/30",
    };
    return colors[type] || "bg-gray-500/20 text-gray-300 border-gray-500/30";
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        await onDelete(review._id);
      } catch (error) {
        console.error("Error deleting review:", error);
      }
    }
  };

  return (
    <>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="rounded-2xl p-6 border border-pink-300 dark:border-gray-400/40 transition-all duration-300 ease-out relative h-full flex flex-col bg-white/50 dark:bg-black backdrop-blur-sm"
        style={{
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        {showDelete && (
          <button
            onClick={handleDelete}
            className="absolute top-4 right-4 text-red-400 hover:text-red-500 transition-colors duration-200 z-10"
            style={{ transform: "translateZ(30px)" }}
            aria-label="Delete review"
          >
            <FaTrash className="text-sm" />
          </button>
        )}

        <div
          className="flex-1 flex flex-col"
          style={{ transform: "translateZ(10px)" }}
        >
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

          <h3
            className={`text-lg font-medium mb-2 line-clamp-1 text-${getCategoryColor(review.category)}`}
          >
            {review.workName}
          </h3>

          <p className="text-black/60 dark:text-white/50 text-sm mb-3 font-thin line-clamp-1">
            by {review.authorName || "Unknown"}
          </p>

          <div className="flex-1 mb-4">
            <p className="text-black/60 dark:text-white font-thin text-sm line-clamp-3 break-words">
              {review.review}
            </p>
          </div>
        </div>

        <div
          className="flex items-center justify-between mt-4"
          style={{ transform: "translateZ(20px)" }}
        >
          <div className="flex flex-wrap gap-1">
            <button
              // data-tooltip-id="funny-tooltip"
              // data-tooltip-content="Funny"
              onClick={() => handleReaction("funny")}
              disabled={isReacting}
              className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs hover:scale-105 transition-all duration-200 disabled:opacity-50 border ${getReactionColor("funny")}`}
            >
              <Laugh className="w-3 h-3" /> {getReactionCount("funny")}
            </button>
            <button
              // data-tooltip-id="creative-tooltip"
              // data-tooltip-content="Creative"
              onClick={() => handleReaction("creative")}
              disabled={isReacting}
              className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs hover:scale-105 transition-all duration-200 disabled:opacity-50 border ${getReactionColor("creative")}`}
            >
              <Lightbulb className="w-3 h-3" /> {getReactionCount("creative")}
            </button>
            <button
              // data-tooltip-id="love-tooltip"
              // data-tooltip-content="Love"
              onClick={() => handleReaction("love")}
              disabled={isReacting}
              className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs hover:scale-105 transition-all duration-200 disabled:opacity-50 border ${getReactionColor("love")}`}
            >
              <Heart className="w-3 h-3" /> {getReactionCount("love")}
            </button>
            <button
              // data-tooltip-id="sad-tooltip"
              // data-tooltip-content="Sad"
              onClick={() => handleReaction("sad")}
              disabled={isReacting}
              className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs hover:scale-105 transition-all duration-200 disabled:opacity-50 border ${getReactionColor("sad")}`}
            >
              <HeartCrack className="w-3 h-3" /> {getReactionCount("sad")}
            </button>
            <button
              // data-tooltip-id="angry-tooltip"
              // data-tooltip-content="Angry"
              onClick={() => handleReaction("angry")}
              disabled={isReacting}
              className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs hover:scale-105 transition-all duration-200 disabled:opacity-50 border ${getReactionColor("angry")}`}
            >
              <Angry className="w-3 h-3" /> {getReactionCount("angry")}
            </button>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="text-black dark:text-white font-thin hover:scale-110 hover:underline text-xs transition-all duration-200 whitespace-nowrap"
          >
            Read More
          </button>
        </div>
      </div>

      {/* Tooltips for main card - Commented Out */}
      {/* <Tooltip
        id="funny-tooltip"
        place="top"
        effect="solid"
        className="z-[60] text-xs py-1 px-2 !bg-yellow-200/80 !text-yellow-700 !rounded-2xl"
      /> */}
      {/* <Tooltip
        id="creative-tooltip"
        place="top"
        effect="solid"
        className="z-[60] text-xs py-1 px-2 !bg-blue-200/80 !text-blue-700 !rounded-2xl"
      /> */}
      {/* <Tooltip
        id="love-tooltip"
        place="top"
        effect="solid"
        className="z-[60] text-xs py-1 px-2 !bg-pink-200/80 !text-pink-700 !rounded-2xl"
      /> */}
      {/* <Tooltip
        id="sad-tooltip"
        place="top"
        effect="solid"
        className="z-[60] text-xs py-1 px-2 !bg-indigo-200/80 !text-indigo-700 !rounded-2xl"
      /> */}
      {/* <Tooltip
        id="angry-tooltip"
        place="top"
        effect="solid"
        className="z-[60] text-xs py-1 px-2 !bg-red-200/80 !text-red-700 !rounded-2xl"
      /> */}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-pink-50/50 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 form-fade-in">
          <div className="rounded-3xl max-w-2xl w-full border border-white/20 bg-white/70 dark:bg-black/70">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-thin border ${getCategoryColor(
                      review.category
                    )}`}
                  >
                    {review.category}
                  </span>
                  <span className="text-sm text-black/60 dark:text-white/50">
                    {formatDate(review.datePosted)}
                  </span>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-black dark:text-pink-200 hover:scale-120 text-2xl transition-all duration-200"
                >
                  <FaTimes />
                </button>
              </div>

              <h2
                className={`text-2xl font-thin mb-2 text-${getCategoryColor(review.category)}`}
              >
                {review.workName}
              </h2>
              <p className="text-black/60 dark:text-white/50 mb-4">
                by {review.authorName || "Unknown"}
              </p>

              <div className="prose max-w-none max-h-[60vh] overflow-y-auto pr-2 custom-scroll">
                <p className="text-black/60 dark:text-white whitespace-pre-wrap leading-relaxed break-words">
                  {review.review}
                </p>
              </div>

              <div className="flex gap-2 mt-6 pt-4 border-t border-white/20">
                <button
                  // data-tooltip-id="modal-funny-tooltip"
                  // data-tooltip-content="Funny"
                  onClick={() => handleReaction("funny")}
                  disabled={isReacting}
                  className={`flex items-center gap-1 px-3 py-2 rounded-xl text-sm hover:scale-105 transition-all duration-200 disabled:opacity-50 border ${getReactionColor("funny")}`}
                >
                  <Laugh className="text-base" /> {getReactionCount("funny")}
                </button>
                <button
                  // data-tooltip-id="modal-creative-tooltip"
                  // data-tooltip-content="Creative"
                  onClick={() => handleReaction("creative")}
                  disabled={isReacting}
                  className={`flex items-center gap-1 px-3 py-2 rounded-xl text-sm hover:scale-105 transition-all duration-200 disabled:opacity-50 border ${getReactionColor("creative")}`}
                >
                  <Lightbulb className="text-base" />{" "}
                  {getReactionCount("creative")}
                </button>
                <button
                  // data-tooltip-id="modal-love-tooltip"
                  // data-tooltip-content="Love"
                  onClick={() => handleReaction("love")}
                  disabled={isReacting}
                  className={`flex items-center gap-1 px-3 py-2 rounded-xl text-sm hover:scale-105 transition-all duration-200 disabled:opacity-50 border ${getReactionColor("love")}`}
                >
                  <Heart className="text-base" /> {getReactionCount("love")}
                </button>
                <button
                  // data-tooltip-id="modal-sad-tooltip"
                  // data-tooltip-content="Sad"
                  onClick={() => handleReaction("sad")}
                  disabled={isReacting}
                  className={`flex items-center gap-1 px-3 py-2 rounded-xl text-sm hover:scale-105 transition-all duration-200 disabled:opacity-50 border ${getReactionColor("sad")}`}
                >
                  <HeartCrack className="text-base" /> {getReactionCount("sad")}
                </button>
                <button
                  // data-tooltip-id="modal-angry-tooltip"
                  // data-tooltip-content="Angry"
                  onClick={() => handleReaction("angry")}
                  disabled={isReacting}
                  className={`flex items-center gap-1 px-3 py-2 rounded-xl text-sm hover:scale-105 transition-all duration-200 disabled:opacity-50 border ${getReactionColor("angry")}`}
                >
                  <Angry className="text-base" /> {getReactionCount("angry")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tooltips for modal - Commented Out */}
      {/* <Tooltip
        id="modal-funny-tooltip"
        place="top"
        effect="solid"
        className="z-[70] text-xs py-1 px-2 !bg-yellow-200/80 !text-yellow-700 !rounded-2xl"
      /> */}
      {/* <Tooltip
        id="modal-creative-tooltip"
        place="top"
        effect="solid"
        className="z-[70] text-xs py-1 px-2 !bg-blue-200/80 !text-blue-700 !rounded-2xl"
      /> */}
      {/* <Tooltip
        id="modal-love-tooltip"
        place="top"
        effect="solid"
        className="z-[70] text-xs py-1 px-2 !bg-pink-200/80 !text-pink-700 !rounded-2xl"
      /> */}
      {/* <Tooltip
        id="modal-sad-tooltip"
        place="top"
        effect="solid"
        className="z-[70] text-xs py-1 px-2 !bg-indigo-200/80 !text-indigo-700 !rounded-2xl"
      /> */}
      {/* <Tooltip
        id="modal-angry-tooltip"
        place="top"
        effect="solid"
        className="z-[70] text-xs py-1 px-2 !bg-red-200/80 !text-red-700 !rounded-2xl"
      /> */}
    </>
  );
}
