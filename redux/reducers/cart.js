import {itemsList} from "../data";

const initState = {
    posts:[] ,
    comments: [],
    ownPosts:[],
  total: 0,
  };

  export default (state = initState, action) => {
    switch (action.type) {
      // case "FETCH_ITEMS":
      // // case "CREATE_ITEM":
      
      //   return {
      //     ...state,
      //     items: [...state.items,action.payload],
      //   };
        case "FETCH_ALL_POSTS":
     
          return { ...state, posts: action.payload };
        case "FETCH_OWN_POSTS":
          return{...state,ownPosts:action.payload};  
        case "FETCH_ALL_COMMENTS":
            return {...state,comments:action.payload};  
       
            case "CLEAR_CART_ITEMS":
              return {
                ...state,
                total: 0,
                addedItems: [],
              };
      default:
        return state;
    }
  };