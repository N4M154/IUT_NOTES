import React from "react";
import Snowflake from "./SnowFlake";

const Snow = ({ numFlakes = 200 }) => {
  return (
    <div className="Snow relative w-full h-screen overflow-hidden pointer-events-none">
      {Array.from({ length: numFlakes }).map((_, i) => (
        <Snowflake key={i} />
      ))}
    </div>
  );
};

export default Snow;
