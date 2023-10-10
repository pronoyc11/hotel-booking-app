import React, { useEffect, useState } from "react";
import classes from "../../css/Profile.module.css";
import { connect } from "react-redux";
import { fetcBookinghDetails } from "../../../redux/ActionCreator";
import BookingDetail from "./BookingDetail";
import { Link } from "react-router-dom";
import { BDDATA_KEY, baseUrl } from "../../../redux/baseUrl";
import axios from "axios";

const mapStateToProps = (state) => {
  return {
    token: state.token,
    userId: state.userId,
    currentUserName: state.currentUserName,
    bookingDetails: state.bookingDetails,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetcBookinghDetails: (token, userId) => {
      dispatch(fetcBookinghDetails(token, userId));
    },
  };
};
const Profile = (props) => {
  //STATES START HERE
  //STATES END HERE
  //USEEFFECT HOOK STARTS HERE
  useEffect(() => {
    if (props.token) {
      const queryParams = '&orderBy="userId"&equalTo="' + props.userId + '"';
      axios
        .get(
          baseUrl +
            "booked/" +
            BDDATA_KEY +
            ".json?auth=" +
            props.token +
            queryParams
        )
        .then((res) => {
          // console.log(token,userId);

          const data = res.data;
          const bdsArr = [];

          for (const key in data) {
            bdsArr.push({
              id: key,
              type: data[key].type,
              days: data[key].days,
              cost: data[key].cost,
            });
          }

          props.fetcBookinghDetails(bdsArr);

          // dispatch(fsbd(bdsArr));
        })
        .catch((err) => {
          console.log(err.response.data.error);
        });
    }
  }, [props.userId]);
  //USEEFFECT HOOK ENDS HERE
  //MAPPING BOOKING DETAILS FOR PRESENTING STARTS
  let allBds = null;
  const bds = props.bookingDetails;

  if (bds) {
    if (bds.length === 0) {
      allBds = "No room reserved.";
    } else {
      allBds = bds.map((bd) => {
        return (
          <li key={new Date() * Math.random()}>
            <BookingDetail bd={bd} />
          </li>
        );
      });
    }
  } else {
    allBds = "No room reserved.";
  }

  //MAPPING BOOKING DETAILS FOR PRESENTING ENDS
  let content = null;
  if (props.token) {
    content = (
      <div className={classes.profileDiv}>
        <div className="profile">
          <span>
            <i className="fa-regular fa-user fa-5x"></i>
          </span>
          <h1>{props.currentUserName}</h1>
        </div>
        <div className="bookingDetails">
          <ol>{allBds}</ol>
        </div>
      </div>
    );
  } else {
    //WHEN NOVBODY IS LOGGED IN!!
    content = (
      <div style={{textAlign:"center",display:"flex",flexDirection:"column",gap:"1rem",marginTop:"9rem"}}>
        <h2>
          Hey you forgot to <b>sign up</b>!
        </h2>
        <Link to="/auth">
          <button>
            Go to sign up page <i className="fa-solid fa-arrow-right"></i>
          </button>
        </Link>
      </div>
    );
  }

  return <>{content}</>;
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
