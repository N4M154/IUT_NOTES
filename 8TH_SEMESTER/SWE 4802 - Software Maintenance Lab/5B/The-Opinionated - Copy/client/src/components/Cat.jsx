import React from "react";
import "./Cat.css";
export default function CatAnimations() {
  return (
    <div id="root">
      {/* Walking */}
      <div className="container move -mt-15">
        <div className="cat walking"></div>
      </div>

      {/* Sitting */}
      {/* <div className="container">
        <div className="cat sitting"></div>
      </div> */}
    </div>
  );
}
