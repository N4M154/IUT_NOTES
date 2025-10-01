//210042112

import "../App.css";

function ProfileCard(props) {
  function handleContactClick() {
    console.log(`${props.name} - ${props.jobTitle} at ${props.company}`);
  }

  return (
    <div className="profile-card">
      <div className="profile-top-background"></div>
      <div className="profile-top">
        <img
          src={props.profileimage}
          alt={`${props.name}'s profile`}
          className="profile-image"
        />
        <h2 className="profile-name">{props.name}</h2>
        <button className="contact-button" onClick={handleContactClick}>
          Contact
        </button>
      </div>
      <p className="profile-title">
        &gt;&nbsp;
        {props.jobTitle} at {props.company}
      </p>
      <p className="profile-bio">{props.bio}</p>
      <div className="profile-skills">
        {props.skills.map((skill, index) => (
          <span key={index} className="skillset">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export default ProfileCard;

//-_- N4M154 -_-
