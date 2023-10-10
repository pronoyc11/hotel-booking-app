import React from "react";
import ids from "../css/Wellcome.module.css";
import { Link } from "react-router-dom";

const Wellcome = () => {
  return (
    <div id={ids["wellcome"]}>
      <h1>Discover your unique taste</h1>
      <h3>explore and book a room in our hotel!!</h3>
      <Link to="/home">
        <button id={ids.wellcomeButton}>
          Get started <i className="fa-solid fa-arrow-right"></i>
        </button>
      </Link>
    </div>
  );
};

export default Wellcome;
