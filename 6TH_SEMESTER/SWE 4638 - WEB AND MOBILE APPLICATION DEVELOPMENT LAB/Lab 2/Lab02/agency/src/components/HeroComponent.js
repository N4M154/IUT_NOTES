//210042112

import "../App.css";
import bgImage from "../images/Layer-759_02.jpg";
import NavComponent from "./NavComponent";

function HeroComponent() {
  const headerStyle = {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "735px",
    position: "relative",
    marginTop: "-20px",
  };

  return (
    <header style={headerStyle}>
      <NavComponent />
      <div className="consulting-rev">
        <h1>VIDEO SLIDER</h1>
        <p>Challenging established thinking, achieving sustainable advantage</p>
        <a href="#">
          OUR SERVICES <i className="fa fa-chevron-right"></i>
        </a>
      </div>
    </header>
  );
}

export default HeroComponent;

// -_- N4M154 -_-
