import React, { useEffect, useState } from "react";
import "./Snow.css";

const Snowflake = ({ symbol = "•" }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    checkDarkMode();

    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const fontSize = `${Math.floor(Math.random() * 12 + 12)}px`;
  const animationDelay = `${(Math.random() * 16).toFixed(2)}s`;

  const lightColors = ["#fff200", "#ff00c3", "000000"];
  const darkColors = ["#ffffff", "##fffab8", "##ffb8ee"];

  const color = isDark
    ? darkColors[Math.floor(Math.random() * darkColors.length)]
    : lightColors[Math.floor(Math.random() * lightColors.length)];

  return (
    <p
      className="Snowflake absolute"
      style={{ fontSize, animationDelay, color }}
    >
      {symbol}
    </p>
  );
};

export default Snowflake;
