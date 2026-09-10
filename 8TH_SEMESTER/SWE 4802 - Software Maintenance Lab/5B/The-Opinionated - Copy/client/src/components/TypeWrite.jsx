import { useState, useEffect } from "react";

export default function TypewriterCard() {
  const phrases = [
    "What's your hot take today?",
    "Got any spicy opinions?",
    "Share your wildest thought!",
  ];

  const [displayedText, setDisplayedText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    let typingSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentPhrase.length) {
      typingSpeed = 2000; // pause at end of phrase
      setTimeout(() => setIsDeleting(true), typingSpeed);
      return;
    }

    if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    }

    const timeout = setTimeout(() => {
      setDisplayedText(
        currentPhrase.substring(0, charIndex + (isDeleting ? -1 : 1))
      );
      setCharIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, phrases, phraseIndex]);

  return (
    <div>
      <h1 className="pl-10 text-3xl font-thin dark:text-white text-black mb-2">
        {displayedText}
        <span className="animate-pulse">|</span>
      </h1>
    </div>
  );
}
