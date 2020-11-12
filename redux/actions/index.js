import * as firebase from "firebase"; 


export const getAllProducts = ()=> async (dispatch) => {
 
  
  await  firebase.database().ref("shop/products/").on("value",snapshot => {
     if(snapshot && snapshot.val()){
        const data = (Object.values(snapshot.val())) ;
        
         let items = [];
         const getValue = snapshot.val() ;
         let obj ;
         for(let item in getValue){
              obj = {
                  postId:item ,
                  id:getValue[item].id,
                  desc:getValue[item].desc,
                  title:getValue[item].title,
                  imageUrl:getValue[item].imageUrl,
                  price:getValue[item].price,
                  size:getValue[item].size
              }
              items.push(obj)
         }
       
        dispatch({
          type:"FETCH_ITEMS",
          payload: items
      })
     }
  } );
  
  
}

export const addToCart = (id) => {
    return {
      type: "ADD_TO_CART",
      id,
    };
  };

export const removeFromCart = (id)=> {
    return{
        type:"REMOVE_FROM_CART",
        id
    }
}  

export const addQuantity = id => {
  return {
    type:"ADD_QUANTITY",
    id
  }
}

export const clearCart = () => {
  return {
    type: "CLEAR_CART_ITEMS",
  };
};


export const testFun = async() => {
  await  firebase.database().ref("shop/products/") ;
  console.log("okk")
}

export const buyProducts = (productArr,userId)=> async (dispatch) => {
 let items = [];
 items.push(userId)
  for(let item of productArr){
     await firebase.database().ref("shop/products/" + item.postId).update({
       buy:items
     })
  }
}

export const productUpload = (productArr)=> async (dispatch) => {
 
  for(let item of productArr){
     await firebase.database().ref("shop/products/").push().set({
        id:item.id,
        desc:item.desc,
        title:item.title,
        imageUrl:item.imageUrl,
        price:item.price,
        size:item.size
    })
  }
}