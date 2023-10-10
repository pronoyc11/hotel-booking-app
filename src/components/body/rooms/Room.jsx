import React, { useEffect, useState } from "react";
import classes from "../../css/Room.module.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Tooltip } from "reactstrap";

//STATE AND DISPATCH FUNCTION STARTS HERE
const mapStateToProps = state =>{
  return {
    token:state.token
  }
}
//STATE AND DISPATCH FUNCTION ENDS HERE
const Room = ({ room, allRooms,token }) => {
  //STATES START HERE
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggle = () => setTooltipOpen(!tooltipOpen);
  //STATES END HERE

  useEffect(() => {
    //SETING VALUE OF ROOM BOOKED OR NOT STARTS

    for (let data of allRooms) {
      if (data.room.trim() === room.id.trim()) {
        if (data.booked) {
          setRoomBooked(true);
        } else {
          setRoomBooked(false);
        }
      }
    }

    //SETING VALUE OF ROOM BOOKED OR NOT ENDS
  }, []);
  //STATES START HERE
  const [roomBooked, setRoomBooked] = useState(false);

  //STATES END HERE
//NAVIGATING FUNCTION STARTS
const navigateIt = ()=>{
 
   if(token === null){
    alert("Please sign up or log in first.");

   }
}
//NAVIGATING FUNCTION ENDS

  return (
    <div className={classes.roomCard}>
      <div className={classes.showSection}>
        <img src={room.srcs[0]} alt="" />

        <div className={classes.roomDescription}>
        <Link to="/roomDetails" state={room}><h3 id="tooltip">{room.adName}</h3></Link>
        {/* TOOLTIP STARTS */}
        <Tooltip
        placement="top"
        isOpen={tooltipOpen}
        autohide={false}
        target="tooltip"
        toggle={toggle}
      >
        Tap to see room details
      </Tooltip>
      {/* TOOLTIP ENDS */}
          <h4>Room sector: {room.id}</h4>
          <ul className={classes.lowerSide}>
            <li className={classes.type}>
              <h4>Category : {room.type}</h4>
            </li>
            <li className={classes.price}>Price: {room.price} $</li>
          </ul>
        </div>
      </div>
    { roomBooked ?   <Link>
        <div className={classes.buttonSection}>
          <button disabled>BOOKED</button>
        </div>
      </Link>
                 :  <Link to="/booking" state={roomBooked === false && room}>
                 <div className={classes.buttonSection}>
                   <button onClick={navigateIt}>BOOK NOW</button>
                 </div>
               </Link>

    }
    </div>
  );
};

export default connect(mapStateToProps)(Room);
