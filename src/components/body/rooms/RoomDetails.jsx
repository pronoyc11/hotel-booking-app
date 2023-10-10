import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router';
import classes from "../../css/RoomDetails.module.css";
import { Alert, Card } from 'reactstrap';

const RoomDetails = () => {
    //ALL NESSECARY STATES AND HOOKS START HERE
    const room = useLocation().state;
const navigate = useNavigate()
    //ALL NESSECARY STATES AND HOOKS END HERE

useEffect(()=>{
 if(room===null){
    navigate("/");
 }
},[])



//IMPORTANT LOOPS TO SHOW ALL IMAGES START
const images = room.srcs.map(img => {
    return <Card key={new Date()*Math.random()} ><img className={classes.img} src={img} alt="Room previews" /></Card>
})
//IMPORTANT LOOPS TO SHOW ALL IMAGES END
  return (
    <div className={classes.roomDetails}>
     <div className={classes.imageDiv}>
     {images}
   
     </div>
     <hr />
  <div>
    <p>{room.description}</p>
  </div>
  <hr />
  <div>
    <strong>Category:</strong> <p>{room.type}</p> 
  </div>
  <hr />
  <div>
    <strong>Services:</strong> <p>{room.services}</p> 
  </div>
  <hr />
  <div>
    <strong>Room-size:</strong> <p>{room.roomSize}</p> 
  </div>
  <hr />
  <div>
    <strong>Windows:</strong> <p>{room.window}</p> 
  </div>

    </div>
  )
}

export default RoomDetails