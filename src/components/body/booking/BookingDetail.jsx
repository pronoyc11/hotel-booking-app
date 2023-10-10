import React from 'react'
import classes from "../../css/BookingDetail.module.css";
import { connect } from 'react-redux';
import { deleteBds } from '../../../redux/ActionCreator';


const mapStateToProps = state =>{
    return {
        token:state.token,
        userId:state.userId
    }
}

const mapDispatchToProps = dispatch =>{
    return {
     deleteBds:(roomNo,token)=>{
        dispatch(deleteBds(roomNo,token));
     }
    }
}
const BookingDetail = (props) => {

//DELETING BOOOKING STARTS HERE
const deleteBooking = (e)=>{

    const roomNo = e.target.parentElement.firstChild.children.item(2).textContent.trim();

props.deleteBds(roomNo,props.token);


}
//DELETING BOOOKING ENDS HERE

  return (
    <div className={classes.bdetail}>
    <div>
        <h3>Room No</h3>
        <hr />
        <p>{props.bd.id}</p>
    </div>
    <div>
        <h3>Type</h3>
        <hr />
        <p>{props.bd.type}</p>
    </div>
    <div>
        <h3>Days</h3>
        <hr />
        <p>{props.bd.days}</p>
    </div>
    <div>
        <h3>Cost</h3>
        <hr />
        <p>{props.bd.cost}</p>
    </div>
   
  <button onClick={e=>deleteBooking(e)}>Cancel</button>  


    </div>
  )
}

export default connect(mapStateToProps,mapDispatchToProps)(BookingDetail);