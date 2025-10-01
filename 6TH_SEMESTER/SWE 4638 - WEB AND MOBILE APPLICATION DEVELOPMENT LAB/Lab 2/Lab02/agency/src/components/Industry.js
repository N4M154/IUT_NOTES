//210042112

import "../App.css";

function Industry(props) {
  return (
    <>
      <div className="icon">
        <i className={`fa ${props.icon}`} aria-hidden="true"></i>
      </div>
      <article>
        <header>
          <h2>{props.title}</h2>
        </header>
        <p>{props.description}</p>
      </article>
    </>
  );
}

export default Industry;

// -_- N4M154 -_-
