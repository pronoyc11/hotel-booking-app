import React, { useEffect } from "react";
import rooms from "../../database/rooms.json";
import Room from "./rooms/Room";
import { getAllRooms } from "../../redux/RoomActionCreator";
import { connect } from "react-redux";
import classes from "../css/Home.module.css";

//**RESEARCH AND ANALYSIS */
//DISCPATCH AND STATE FUNCTIONS STARTS
const mapStateToProps = (state) => {
  return {
    token: state.token,
    userId: state.userId,
    allRooms: state.allRooms,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAllRooms: (token) => {
      dispatch(getAllRooms(token));
    },
  };
};

//DISCPATCH AND STATE FUNCTIONS ENDS
const Home = (props) => {
  useEffect(() => {
    props.getAllRooms(props.token);
  }, []);

//NUMBER OF LEFT ROOMS FUNCTION STARTS HERE
const leftRooms = (rooms)=>{
     let leftRoomNum = 0;
     for(let i = 0;i<rooms.length;i++){
      if(rooms[i].booked === false){
        leftRoomNum += 1 ;
      }
     }
     return leftRoomNum ;
}
//NUMBER OF LEFT ROOMS FUNCTION ENDS HERE

  const showRooms = rooms.allrooms.map((room) => {
    return (
      <Room
        key={new Date() * Math.random()}
        room={room}
        allRooms={props.allRooms}
      />
    );
  });

  return (
    <div
      style={{
        minHeight: "100vh",
      }}
    >
      <div className={classes.showRoomUpdate}>
        <div className={classes.showRoomUpDiv}>
          <div className={classes.showRoomTotal}>
            {" "}
            <strong>
              Total room </strong> : <span>{props.allRooms.length}</span>{" "}
            
            <hr />{" "}
          </div>
          <div className={classes.showRoomLeft}>
            <strong>Rooms left </strong> : <span>{leftRooms(props.allRooms)}</span>
            <hr />
          </div>
        </div>
      </div>
      {showRooms}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
