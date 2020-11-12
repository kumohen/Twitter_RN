const initialState = {
    isLoginin: false,
    followers:[],
    followings:[],
    searchUser:[]
  };
  export default function (state = initialState, action) {
    switch (action.type) {
    //   case "USER_LOGIN":
    //     return { ...state, login: action.payload, isLoginin: true };
    //   case "USER_AUTH":
    //     return { ...state, login: action.payload };
    //   case "USER_LOGOUT":
    //     return { ...state, isLoginin: false };
    //   case "GET_USERS":
    //     return { ...state, users: action.payload };
      case "USER_SIGNUP":
        return {
          ...state,
          user: action.payload,
          isLoginin: true,
        };
      case "USER_SIGNIN":
          return {
             ...state,
            user: action.payload,
            isLoginin: true,
          }  
      case "LOGOUT": 
         return {...state,isLoginin:false}    
      case "FOLLWERS_LIST":
         return {...state , followers:action.payload}   
      case "FOLLWERING_LIST":
       
         return {...state,followings:action.payload}   
      case "SET_FOLLOW_FOLLOWERS":
          return{
            ...state,followers:action.payload,followings:action.payload
          }   
      case "Search_User":
        return{...state,searchUser:action.payload}   

      default:
        return state;
    }
  }