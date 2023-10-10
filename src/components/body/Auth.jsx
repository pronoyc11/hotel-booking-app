import React, { useEffect, useState } from "react";
import classes from "../css/Auth.module.css";
import { connect } from "react-redux";
import { authenticate, clearAuthMsg } from "../../redux/ActionCreator";

const mapStateToProps = (state) => {
  return {
    authMsg: state.authMsg,
  };
};
//DISPATCH FUNCTIONS STARTS HERE
const mapDispatchToprops = (dispatch) => {
  return {
    authenticate: ({ name, email, password }) => {
      dispatch(authenticate({ name, email, password }));
    },
    clearAuthMsg: () => {
      dispatch(clearAuthMsg());
    },
  };
};
//DISPATCH FUNCTIONS STARTS HERE

const Auth = (props) => {
  useEffect(() => {
    props.clearAuthMsg();
  }, []);

  //STATES START HERE
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [mode, setMode] = useState("signUp");
  //STATES END HERE

  //TOGGLE FUNCTION STARTS HERE
  const toggle = () => {
    if (mode === "signUp") {
      setMode("logIn");
    } else {
      setMode("signUp");
    }
  };
  //TOGGLE FUNCTION ENDS HERE
  //FORM SUBMISSIONS STARTS HERE
  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === "signUp") {
      props.authenticate({
        name: userInfo.name,
        email: userInfo.email,
        password: userInfo.password,
      });
    } else {
      props.authenticate({
        email: userInfo.email,
        password: userInfo.password,
      });
    }
  };
  const handleChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  //FORM SUBMISSIONS ENDS HERE

  return (
    <div>
      <form
        action=""
        className={classes.form}
        onSubmit={(e) => handleSubmit(e)}
      >
     { props.authMsg &&  <div>
          <h3 style={{color:"red"}}>{props.authMsg}</h3>
        </div>}
        <div>
          <button type="button" onClick={toggle}>
            Switch to {mode === "signUp" ? "Log in" : "Sign up"}
          </button>
        </div>
        {mode === "signUp" && (
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              required
              autoComplete="name"
              minLength="5"
              value={userInfo.name}
              onChange={(e) => handleChange(e)}
            />
          </div>
        )}
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            value={userInfo.email}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            required
            autoComplete="password"
            minLength="6"
            value={userInfo.password}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <button type="Submit">
            {mode === "signUp" ? "Sign up" : "Log in"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToprops)(Auth);
