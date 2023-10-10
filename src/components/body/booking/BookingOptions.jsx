import React, { useEffect, useState } from "react";
import classes from "../../css/BookingOptions.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { BDDATA_KEY, RBDATA_KEY, baseUrl } from "../../../redux/baseUrl";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    token: state.token,
    userId: state.userId,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};

const BookingOptions = (props) => {

  //STATES START HERE
  const room = useLocation().state;
  const navigate = useNavigate();
  const [roomObj, setRoomObj] = useState(room);

  const [userChoice, setUserChoice] = useState({ guests: 1, days: 1 });
  //STATES END HERE
  
  //SUBMISSION OF THE FORM STARTS
  const handleChange = (e) => {
    setUserChoice({
      ...userChoice,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    if (roomObj) {
      const bookingDetails = {

        [roomObj.id]: {
          userId: props.userId,
          type: roomObj.type,
          days: userChoice.days,
          cost: roomObj.price * userChoice.days,
        }
      
      };
      //POSTING BOOKING DETAILS OF AUTHORIZED USERS
      axios
        .patch(baseUrl + "booked/"+BDDATA_KEY+".json?auth="+props.token, bookingDetails)
        .then((res) => {
          if (res.statusText === "OK") {
           return axios.put(
              baseUrl + "bookings/"+RBDATA_KEY+"/" + roomObj.id + ".json?auth="+props.token,
              { booked: true }
            );
          }
        })
        .then(res =>{ 
         if(res.statusText === "OK"){
          alert("Room resrved successfully.")
          navigate("/profile",{replace:true});
         }else{
          alert("Something went wrong,room is not reserved!")
         }
        })
        .catch((err) => console.log(err));
      //POSTING BOOKING DETAILS OF AUTHORIZED USERS ENDS
    } else {
      alert("Please select a room to continue!!");
    }

    e.preventDefault();
  };
  //SUBMISSION OF THE FORM ENDS

  //useEffect HOOK STARTS
  useEffect(() => {}, []);
  //useEffect HOOK ENDSS

  return (
    <div className={classes.booking}>
      <form
        action=""
        className={classes.form}
        onSubmit={(e) => handleSubmit(e)}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              flex: "0.7",
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <label htmlFor="question">How many guests?</label>
              <select
                name="guests"
                id=""
                value={userChoice.guests}
                onChange={(e) => handleChange(e)}
              >
                <option value="0" className="text-center">
                0
                </option>
                <option value="1" className="text-center">
                1
                </option>
                <option value="2" className="text-center">
                 2
                </option>
                <option value="3" className="text-center">
                 3
                </option>
              </select>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <label htmlFor="question">How many days you want to stay?</label>
              <input
                name="days"
                type="number"
                min="1"
                max="200"
                onChange={(e) => handleChange(e)}
                value={userChoice.days}
                required
              />
            </div>
          </div>
          <div
            style={{
              flex: "0.3",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <div>
              <h2>Cost</h2>
              <h4>
                {roomObj
                  ? roomObj.price * userChoice.days + "$"
                  : "No room selected."}
              </h4>
            </div>
          </div>
        </div>
 { roomObj?   <button type="submit">Reserve</button>
            :<button type="button"><Link to="/home"> Please select a room!</Link></button>
 }
      
      </form>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingOptions);
