import axios from "axios";
import * as actionTypes from "./ActionTypes";
import { RBDATA_KEY, baseUrl } from "./baseUrl";

export const putAllRooms = (allrooms) =>{
    return {
        type:actionTypes.PUT_ROOMS,
        payload:allrooms
    }
} 

export const getAllRooms = (token) => dispatch =>{
   
axios.get(baseUrl+"bookings/"+RBDATA_KEY+".json?auth="+token)
.then(res=>{
    const data = res.data;
    const bookingData = [];

    for(let key in data){
        let obj = {room:key,booked:data[key].booked}
        bookingData.push(obj);
        
    }
    dispatch(putAllRooms(bookingData));



})
.catch(err=>console.log(err));

}