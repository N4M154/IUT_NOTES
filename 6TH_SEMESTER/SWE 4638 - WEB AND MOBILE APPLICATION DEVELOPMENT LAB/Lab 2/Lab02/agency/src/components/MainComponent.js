//210042112

import HeroComponent from "./HeroComponent";
import Industries from "./Industries";
import EntrepreneursComponent from "./EntrepreneursComponent";
import TradersMain from "./TradersMain";
import Partners from "./Partners";
import FooterComponent from "./FooterComponent";
import "../App.css";

function MainComponent() {
  return (
    <div>
      <header>
        <HeroComponent />
      </header>
      <main>
        <Industries />
        <EntrepreneursComponent />
        <TradersMain />
        <Partners />
      </main>
      <FooterComponent />
    </div>
  );
}

export default MainComponent;

// -_- N4M154 -_-
