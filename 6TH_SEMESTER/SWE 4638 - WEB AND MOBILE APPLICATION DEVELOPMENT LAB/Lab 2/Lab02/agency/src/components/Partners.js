//210042112

import "../App.css";
import { useState } from "react";

function Partners() {
  const [partner] = useState([
    {
      id: 1,
      name: "TVC",
      image: "partner-TVC.png",
      url: "#",
    },
    {
      id: 2,
      name: "Fast Brothers",
      image: "partner-fast-brothers.png",
      url: "#",
    },
    {
      id: 3,
      name: "Arcade",
      image: "partner-arcade.png",
      url: "#",
    },
    {
      id: 4,
      name: "KPhone",
      image: "partner-KPhone.png",
      url: "#",
    },
    {
      id: 5,
      name: "Edtech",
      image: "partner-Edtech.png",
      url: "#",
    },
    {
      id: 6,
      name: "Volker Stevin",
      image: "partner-Volker-Stevin.png",
      url: "#",
    },
  ]);

  return (
    <section className="partners">
      <ul>
        {partner.map((object) => (
          <li key={object.id}>
            <a href="#">
              <img src={`images/${object.image}`} alt={partner} />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Partners;

// -_- N4M154 -_-
