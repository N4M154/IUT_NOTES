//210042112

import { useState } from "react";
import Industry from "./Industry";
import "../App.css";

function Industries() {
  const [industries] = useState([
    {
      id: 1,
      icon: "fa-plane",
      title: "Travel and Aviation Consulting",
      description:
        "We are a company that offers design and build services for you from initial sketches to the final construction.",
    },
    {
      id: 2,
      icon: "fa-line-chart",
      title: "Business Services Consulting",
      description:
        "The sector is diverse, including professional services, education and training, and support services and outsourcing.",
    },
    {
      id: 3,
      icon: "fa-shopping-cart",
      title: "Consumer Products Consulting",
      description:
        "We are a company that offers design and build services for you from initial sketches to the final construction.",
    },
    {
      id: 4,
      icon: "fa-university",
      title: "Financial Services Consulting",
      description:
        "We are a company that offers design and build services for you from initial sketches to the final construction.",
    },
    {
      id: 5,
      icon: "fa-lightbulb-o",
      title: "Energy and Environment Consulting",
      description:
        "We are a company that offers design and build services for you from initial sketches to the final construction.",
    },
    {
      id: 6,
      icon: "fa-truck",
      title: "Surface Transport & Logistics Consulting",
      description:
        "We are a company that offers design and build services for you from initial sketches to the final construction.",
    },
  ]);

  let firstHalf = industries
    .slice(0, 3)
    .map((object) => (
      <Industry
        key={object.id}
        icon={object.icon}
        title={object.title}
        description={object.description}
      />
    ));

  let secondHalf = industries
    .slice(3)
    .map((object) => (
      <Industry
        key={object.id}
        icon={object.icon}
        title={object.title}
        description={object.description}
      />
    ));

  return (
    <div>
      <header>
        <h2>Industries</h2>
      </header>
      <section className="travel-business-customer">{firstHalf}</section>
      <section className="financial-energy-surface">{secondHalf}</section>
    </div>
  );
}

export default Industries;

// -_- N4M154 -_-
