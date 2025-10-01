//210042112

import ProfileCard from "./components/ProfileCard";
import image from "./images/blank-pfp.png";
import { useState } from "react";

function App() {
  const [profiles] = useState([
    {
      id: 1,
      name: "Namisa Najah",
      jobTitle: "Full Stack Developer",
      company: "AAA Tech",
      bio: "Passionate about building scalable web applications and learning new technologies.",
      skills: ["React", "CSS", "JavaScript", "Figma"],
      profileimage: image,
    },
    {
      id: 2,
      name: "Kimira Aman",
      jobTitle: "Machine Learning Engineer",
      company: "BBB Tech",
      bio: "Specializes in developing AI models and data analysis.",
      skills: ["Python", "TensorFlow", "Pandas", "SQL"],
      profileimage: image,
    },
    {
      id: 3,
      name: "Abdullah Rahman",
      jobTitle: "Project Manager",
      company: "CCC Tech",
      bio: "Experienced in Agile methodologies and team coordination.",
      skills: ["Scrum", "JIRA", "Leadership", "Agile"],
      profileimage: image,
    },
  ]);

  return (
    <div className="App">
      <h1 className="title">Personal Profile Cards</h1>
      <div className="profile-container">
        {profiles.map((object) => (
          <ProfileCard
            key={object.id}
            name={object.name}
            jobTitle={object.jobTitle}
            company={object.company}
            bio={object.bio}
            skills={object.skills}
            profileimage={object.profileimage}
          />
        ))}
      </div>
    </div>
  );
}

export default App;

// -_- N4M154 -_-
