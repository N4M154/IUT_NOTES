//210042112

import Trader from "./Trader";
import "../App.css";

function TradersMain() {
  const traders = [
    {
      id: 1,
      title: "Raw Spreads",
      description:
        "Receive premium pricing from Top Tier financial institutions. Pricing from Top Tier financial institutions.",
    },
    {
      id: 2,
      title: "No Dealing Desk",
      description:
        "With Consulting WP you'll get no re-quotes, no dealer intervention and fair order execution.",
    },
    {
      id: 3,
      title: "State of the Art",
      description:
        "Trade Forex and CFDs with the world's best trading platforms on your desktop or mobile device.",
    },
  ];

  let all_traders = traders.map((object) => (
    <Trader
      key={object.id}
      title={object.title}
      description={object.description}
    />
  ));
  return (
    <section className="traders">
      <h2>Why Traders Choose Us</h2>
      <div className="article-container">{all_traders}</div>
    </section>
  );
}

export default TradersMain;

// -_- N4M154 -_-
