import * as actionTypes from "./ActionTypes";

const initialState = {
  authLoading: false,
  userId: null,
  token: null,
  currentUserName: null,
  authMsg: null,
  bookingDetails:null,
  allRooms:[]
};

export const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_LOADING:
      return {
        ...state,
        authLoading: true,
      };
      break;
    case actionTypes.AUTH_SUCCESS:
        
      return {
        ...state,
        authLoading: false,
        token: action.payload.token,
        userId: action.payload.userId,
      };
      break;
    case actionTypes.AUTH_FAILED:
      return {
        ...state,
        authLoading: false,
        authMsg: action.payload,
      };
      break;
    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        userId: null,
      };
      break;
    case actionTypes.CLR_AUTH_MSG:
      return {
        ...state,
        authMsg: null,
      };
      break;
    case actionTypes.FBD:
      return{
        ...state,
        bookingDetails:action.payload
      }
     break;
    case actionTypes.DRBDS:

      return {
  ...state,
  bookingDetails:state.bookingDetails.filter(detail => detail.id !== action.payload)

      }
    break;
    case actionTypes.PUT_ROOMS:
      return {
        ...state,
        allRooms:action.payload
      }
    break;
    case actionTypes.CURRENT_USERNAME:
      return {
        ...state,
        currentUserName: action.payload,
      };

    default:
      return state;
  }
};
