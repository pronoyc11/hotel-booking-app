import React from "react";
import { Link } from "react-router-dom";
import classes from "../css/Navgation.module.css";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    token: state.token,
    userId: state.userId,
  };
};
const Navigation = (props) => {
  return (
    <div className={classes.navigation}>
      <Link to="/home" className={classes.hotelName}>
        BookEnjoy
      </Link>

      <nav className={classes.navbar}>
        <Link to="/profile" className={classes.navLink}>
          Profile
        </Link>
        {props.token === null ? (
          <Link to="/auth" className={classes.navLink}>
            Sign up
          </Link>
        ) : (
          <Link to="/logOut" className={classes.navLink}>
            Log out
          </Link>
        )}
      </nav>
    </div>
  );
};

export default connect(mapStateToProps)(Navigation);
