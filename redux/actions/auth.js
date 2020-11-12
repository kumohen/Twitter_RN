import * as firebase from "firebase";
import { connect } from "react-redux";

export const userRegistration = (username,email,password)=> async (dispatch) => {
 
   const respon = await firebase.auth().createUserWithEmailAndPassword(email, password) ;
    console.log(respon.user.uid)
   const response = await  firebase.database().ref("shop/auth/" + respon.user.uid).set({ username, email, password});
    // const user = {
    //     username:username,
    //     id:respon.user.uid,
    // } ;
    // console.log(user);
    dispatch({
        type:"USER_SIGNUP",
        payload: respon.user.uid
    })
}


export const userLogin = (email,password)=> async (dispatch) => {
 
    const response = await firebase.auth().signInWithEmailAndPassword(email, password);

     dispatch({
         type:"USER_SIGNIN",
         payload: response.user.uid
     })
 }

export const logOut = () => async (dispatch)=> {
     await firebase.auth().signOut() ;
     dispatch({
         type:"LOGOUT",
         payload:null
     })
}

export const checkIsLogin = () => {
    firebase.auth().onAuthStateChanged(function (user) {
         if(user){
             return true 
         }else {
             return false ;
         }
      });
     
}


export const postSubmit = (username ,  image, userId, content,postImage)=> async (dispatch)=> {
   await firebase.database().ref("twitter/posts/" ).push().set({
       date:Date.now() ,
       content,username ,  image,userId,postImage
   })
   dispatch({
       type:"PAYMENT_PAY"
   })
}

export const commentSubmit = (postId ,username ,  image, userId, content)=> async (dispatch)=> {
    await firebase.database().ref("twitter/comments/" + postId).push().set({
        date:Date.now() ,
        content,username ,  image,userId
    })
    dispatch({
        type:"CREATE_COMMENTS"
    })
 }

 export const testSubmit = (postId ,username ,  image, userId, content)=> async (dispatch)=> {
    await firebase.database().ref("twitter/posts/" + postId).set({comments:[{id:1,text:"mohen"}]},{merge:true}) ;
    console.log(postId)
    
    dispatch({
        type:"CREATE_COMMENTS"
    })
 }
 export const followeAUser = (followingUser,followerUser) => async (dispatch) => {
    //  console.log("followingUser",followingUser);
    //  console.log(followerUser);
   
     await firebase.database().ref("twitter/followers/" + followingUser.id ).push().set({
         id:followerUser.id,
         username:followerUser.username,
         profileImage:followerUser.profileImage
     })
     await firebase.database().ref("twitter/following/" + followerUser.id ).push().set({
        id:followingUser.id,
        username:followingUser.username,
        profileImage:followingUser.profileImage
     })
     dispatch({
         type:"Followes"
     })
 }

export const fetchPosts = ( )=> async (dispatch)=> {
    await firebase.database().ref("twitter/posts/").on("value", snapshot => {
        // let data = Object.values(snapshot.val());
        if(snapshot && snapshot.val()){
            let items = [];
        const getValue = snapshot.val() ;
        let obj ;
        for(let item in getValue){
             obj = {
                 id:item ,
                 date:getValue[item].date,
                 content:getValue[item].content,
                 userId:getValue[item].userId,
                 username:getValue[item].username,
                 image:getValue[item].image,
                 postImage:getValue[item].postImage
             }
             items.push(obj)
        }
        let reArr = items.reverse();
        dispatch({
            type:"FETCH_ALL_POSTS",
            payload:reArr
        })
        } else{
            dispatch({
                type:"PAYMENT_DETAIL",
                payload:[]
            })
        }
      
    })
 }

 export const fetchOwnPosts = ( userId)=> async (dispatch)=> {
    await firebase.database().ref("twitter/posts/").on("value", snapshot => {
        // let data = Object.values(snapshot.val());
        if(snapshot && snapshot.val()){
            let items = [];
        const getValue = snapshot.val() ;
        let obj ;
        for(let item in getValue){
             obj = {
                 id:item ,
                 date:getValue[item].date,
                 content:getValue[item].content,
                 userId:getValue[item].userId,
                 username:getValue[item].username,
                 image:getValue[item].image,
                 postImage:getValue[item].postImage
             }
             items.push(obj)
        }
        let useArr = [];
        for(let element of items){
            if(element.userId === userId){
                useArr.push(element)
            }
        }
     
        dispatch({
            type:"FETCH_OWN_POSTS",
            payload:useArr
        })
        } else{
            dispatch({
                type:"FETCH_OWN_POSTS",
                payload:[]
            })
        }
      
    })
 }

 export const fetchComments = ( postId)=> async (dispatch)=> {
    await firebase.database().ref("twitter/comments/" + postId).on("value", snapshot => {
        // let data = Object.values(snapshot.val());
        if(snapshot && snapshot.val()){
            let items = [];
        const getValue = snapshot.val() ;
        let obj ;
        for(let item in getValue){
             obj = {
                 id:item ,
                 date:getValue[item].date,
                 content:getValue[item].content,
                 userId:getValue[item].userId,
                 username:getValue[item].username,
                 image:getValue[item].image
             }
             items.push(obj)
        }
        
        dispatch({
            type:"FETCH_ALL_COMMENTS",
            payload:items
        })
        } else{
            dispatch({
                type:"PAYMENT_DETAIL",
                payload:[]
            })
        }
      
    })
 }
 
 export const fetchFollowers  = ( userId) => async (dispatch)=>{
    await firebase.database().ref("twitter/followers/" + userId).on( "value", snapshot => {
          if(snapshot && snapshot.val()){
              let data = Object.values(snapshot.val())
           
              dispatch({
                 type:"FOLLWERS_LIST",
                 payload:data
              })
          }else{
            dispatch({
                type:"FOLLWERS_LIST",
                payload:[]
             })
          }
    })
}

export const fetchFollowing  = ( userId) => async (dispatch)=>{
   
    await firebase.database().ref("twitter/following/" + userId).on( "value",  snapshot => {
        
          if(snapshot && snapshot.val()){
              console.log(snapshot.val());
              let data = Object.values(snapshot.val())
            
              dispatch({
                 type:"FOLLWERING_LIST",
                 payload:data
              })
          }else{
            dispatch({
                type:"FOLLWERING_LIST",
                payload:[]
             })
          }
    })
}

export const setFollowersAndFollowing = () => async dispatch => {
    dispatch({
        type:"SET_FOLLOW_FOLLOWERS",
        payload:[]
    })
}

 export const deletePayment = (userId,postId) => async (dispatch)=>{
     await firebase.database().ref("shop/payment/" + userId).child(postId).remove(()=> {
         console.log(` your post ${postId} deleted  `)
     })
     dispatch({
         type:"PAYMENT_DELETED"
     })
 }

 
 export const profileDetails = (userId )=> async (dispatch)=> {
    await firebase.database().ref("shop/auth/" + userId).on("value", snapshot => {
        // let data = Object.values(snapshot.val());
     

        if(snapshot && snapshot.val()){
            let data = snapshot.val() ;
            let arrData = [];
            arrData.push(data);
          
            dispatch({
                type:"PROFILE_DETAIL",
                payload:arrData
            })
        }
     })
 }

 export const updateProfile = (userId,bio,location) => async(dispatch)=> {
    await firebase.database().ref("shop/auth/" + userId ).update({
        bio:bio,location:location
    })
 }

 export const searchUser = (query) => async(dispatch)=> {
    await firebase.database().ref("shop/auth/").on("value",snapshot => {
        if(snapshot && snapshot.val()){
            const User = Object.values(snapshot.val());
            var variable = query.toLowerCase();
            var expression = `.*${variable}.*`
            var re = new RegExp(expression, 'g')
            let dataArr = [];
           for(let element of User){
              if(re.test(element.username.toLowerCase())){
                  dataArr.push(element)
              }
           }
           dispatch({
               type:"Search_User",
               payload:dataArr
           })
        }
       
    })
 }


 const testFunction = (userId)=> async (dispatch) => {
    await firebase.database().ref("shop/auth/" + userId) ;

    console.log("okkk")
 }

 testFunction(183883)