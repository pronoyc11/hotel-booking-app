import React, { useEffect } from "react";
import Navigation from "./components/navigation/Navigation";
import { Navigate, Outlet, Route, Routes } from "react-router";
import Home from "./components/body/Home";
import Wellcome from "./components/body/Wellcome";
import BookingOptions from "./components/body/booking/BookingOptions";
import Auth from "./components/body/Auth";
import Profile from "./components/body/booking/Profile";
import LogOut from "./components/navigation/LogOut";
import { authCheck } from "./redux/ActionCreator";
import { connect } from "react-redux";
import { getAllRooms } from "./redux/RoomActionCreator";
import RoomDetails from "./components/body/rooms/RoomDetails";

const mapStateToProps = (state) => {
  return {
    token: state.token,
    userId: state.userId,
  };
};

const mapDispatchToprops = (dispatch) => {
  return {
    authCheck: () => {
      dispatch(authCheck());
    },
    getAllRooms:(token)=>{
      dispatch(getAllRooms(token))
    }
  };
};
const MainComponent = (props) => {
  useEffect(() => {
    props.authCheck();
   
  },[]);
  
  return (
    <div>
      <Navigation />
      <Routes>

        {/* <Route element={props.token===null ? <Navigate to="/auth" />  : <Outlet />}>
          <Route path="/profile" element={<Profile />} />
        </Route> */}
         <Route path="/profile" element={<Profile />} />
        <Route
          element={props.token === null ? <Outlet /> : <Navigate to="/" />}
        >
          <Route path="/auth" element={<Auth />} />
        </Route>

     <Route element={props.token? <Outlet /> : <Navigate to="/home" />}>
     <Route path="/booking" element={<BookingOptions />} />
     </Route>

     
      <Route path="/home" element={<Home />} />
      <Route path="/roomDetails" element={<RoomDetails />} />
        <Route path="/" element={<Wellcome />} />
      
        <Route path="/logOut" element={<LogOut />} />
        <Route path="*" element={<Wellcome />} />
      
      </Routes>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToprops)(MainComponent);
