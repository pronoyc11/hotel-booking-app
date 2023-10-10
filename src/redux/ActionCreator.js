import axios from "axios";
import * as actionTypes from "./ActionTypes";
import { API_KEY, BDDATA_KEY, RBDATA_KEY, baseUrl, logInUrl, signUpUrl } from "./baseUrl";

export const authLoading = () => {
  return {
    type: actionTypes.AUTH_LOADING,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    payload: { token: token, userId: userId },
  };
};
export const authFailed = (msg) => {
  return {
    type: actionTypes.AUTH_FAILED,
    payload: msg,
  };
};
export const setCurrentUserName = (name) => {
  return {
    type: actionTypes.CURRENT_USERNAME,
    payload: name,
  };
};
//LOGING OUT AND REMOVING ALL AUTHENTICATION CREDINTIALS FROM LOACL STORAGE
export const clearAuthMsg = ()=>dispatch=>{
    dispatch({
      type:actionTypes.CLR_AUTH_MSG
    })
}
export const logOut = ()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("currentUserName");
    return {
        type:actionTypes.AUTH_LOGOUT,
  
      }
    
  }
//NORMAL FUNCTIONS AS HELP HAND IN AXIOS OPERATION STARTS
export const queryUsersForName = (data)=>{
    let userOBJ = data;
                    let usersArr = [];
                  for(let key in userOBJ){
                    usersArr.push(userOBJ[key]);
                  }  
                
                  
               
                  localStorage.setItem("currentUserName",usersArr[0].name);
                  return usersArr[0].name;
                 
                  
  }
  export const postUsers = (name,userId,idToken) =>{
    axios.post(baseUrl+"/users.json?auth="+idToken,{name:name,userId:userId});
  }
//NORMAL FUNCTIONS AS HELP HAND IN AXIOS OPERATION ENDS

//ACTIVE DISPATCH FUNTION STARTS HERE
export const authenticate = ({ name, email, password }) => (dispatch) => {
  let authData = {
    email: email,
    password: password,
    returnSecureToken: true,
  };
  //DISPATCHING AUTHLOADING
  dispatch(authLoading());
  //DISPATCHING AUTH LOADING ENDS
  //SETTING UP THE URL STARTS
  let authUrl = null;
  if (name) {
    authUrl = signUpUrl;
    dispatch(setCurrentUserName(name));
    localStorage.setItem("currentUserName",name);
  } else {
    authUrl = logInUrl;
  }
  //SETTING UP THE URL EMDS
  //AXIOS POST FOR AUTHENTICATION STARTS
 
  axios
    .post(authUrl + API_KEY, authData)
    .then((res) => {
      localStorage.setItem("token", res.data.idToken);
      localStorage.setItem("userId", res.data.localId);
      let expirationTime = new Date(
        new Date().getTime() + res.data.expiresIn * 1000
      );

      localStorage.setItem("expirationTime", expirationTime);
      dispatch(authSuccess(res.data.idToken, res.data.localId));

      if (name) {
        postUsers(name, res.data.localId,res.data.idToken);
      } else {
        const queryParams = '&orderBy="userId"&equalTo="' + res.data.localId +'"';
        return axios.get(baseUrl + "/users.json?auth="+res.data.idToken + queryParams);
      }
    })
    .then((res) => {
    
      if (res) {
        dispatch(setCurrentUserName(queryUsersForName(res.data)));
      }
    })
    .catch((err) =>{ dispatch(authFailed(err.response.data.error.message));console.log(err); });
  //AXIOS POST FOR AUTHENTICATION ENDS
};
//AUTHENTICATION AT THE ROOT COMPONENT AT IT'S FIRST RENDER
export const authCheck = () => dispatch =>{
    let token = localStorage.getItem("token");
    if(!token){
        //logout
        dispatch(logOut());
    }else{
        let expirationTime = new Date(localStorage.getItem("expirationTime"));
        if(expirationTime <= new Date()){
            //logout
            dispatch(logOut());
        }else{
            let userId = localStorage.getItem("userId");
           
            dispatch(setCurrentUserName(localStorage.getItem("currentUserName")));
            dispatch(authSuccess(token,userId));
        }
    }
}
//ACTIVE DISPATCH FUNTION ENDS HERE




//FETCHING SPECIFIC BOOKING DETAILS STARTS
export const fsbd = (bdsArr)=>{
  return{
    type:actionTypes.FBD,
    payload:bdsArr
  }
}
export const fetcBookinghDetails = (bdsArr)=> dispatch =>{

dispatch(fsbd(bdsArr));
} 
//FETCHING SPECIFIC BOOKING DETAILS ENDS


//DELETING SPECIFIC BOOKING DETAILS STARTS HERE
export const deleteRbds = (data)=>{
return {
  type:actionTypes.DRBDS,
  payload:data
}
}
export const deleteBds = (roomNo,token) => dispatch =>{

  axios.delete(baseUrl+'booked/'+BDDATA_KEY+'/'+roomNo+'.json?auth='+token)
  .then(res=>{
    
    if (res.statusText === "OK") {
    axios.put(
         baseUrl + "bookings/"+RBDATA_KEY+"/" + roomNo + ".json?auth="+ token,
         { booked: false }
       );
     }



  })
  
  .catch(err=>console.log(err));
  dispatch(deleteRbds(roomNo));
}
//DELETING SPECIFIC BOOKING DETAILS ENDS HERE

