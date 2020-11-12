
import React, { useState,useEffect } from 'react';
import {View,Text,StyleSheet,Image,FlatList,KeyboardAvoidingView} from "react-native"; 
import {Card,Input,Button} from "react-native-elements"
import moment from "moment";
import {commentSubmit,fetchComments,testSubmit,} from "../redux/actions/auth";
import {connect} from "react-redux";
import * as firebase from "firebase"
import Item from "../components/Item";

const SinglePost = ({route,navigation,commentSubmit,user,isLogin,fetchComments,comments,testSubmit}) => {
    const {item} = route.params ;
 
    const[content,setContent] = useState("");
    const[userInfo,setuserInfo] = useState({});
  const[elements,setElements] = useState([]);
  useEffect(()=>{
    let isMounted = true 
    fetchComments(item.id);
    if(user !== undefined){
   firebase.database().ref("shop/auth/" + user ).on("value",snapShot => {
    
     if(snapShot && snapShot.val() ){
       setuserInfo(snapShot.val())
     }
   })
 } 
   return (()=> isMounted = false)
  
},[isLogin ,user]) ;

useEffect(()=> {
    setElements(comments);
  },[elements,comments]);
  
     const {username ,  profileImage} = userInfo ;

     const addComment = (postId)=> {
          
         commentSubmit( postId ,username ,  profileImage, user, content)
        // testSubmit(postId);
     }
    
     const renderItem =({item,i})=> (
   
        <Item    item={item} navigation={navigation} single />
      )

    return (
        <View style={{flex:1}}>
  
     <View>  
    <Card>
        <View  style={{flexDirection:"row",justifyContent:"space-between"}}>
     <View style={{flexDirection:"row"}}>       
    <Image
            style={styles.image}
            resizeMode="cover"
            source={{ uri: item.image }}
          />   
    <Card.Title   style={{marginLeft:3,marginTop:3}}>{item.username}</Card.Title>
    </View>
    <View>
       <Text style={{marginTop:3}}>{moment(item.date).format("DD MMM YYYY")}</Text>
    </View>    
    </View>
  <Card.Divider/>
 
        <View  style={styles.user}>
        
          <Text style={{textAlign:"justify"}}>{item.content}</Text>
          {item.postImage && <Image  source={{uri:item.postImage}} style={{height:160,width:350,marginLeft:-4}} />}
        </View>
        </Card>
         </View>
      
      <View style={{marginVertical:10}}>
      <KeyboardAvoidingView>
        <View style={{width:220}}>
        <Input
        placeholder='Tweet your reply' onChangeText={(text) => setContent(text)}
        inputContainerStyle={{width:230}} multiline  />
        </View>
        <View  style={{marginLeft:260,width:100,marginTop:-67}}>
         <Button
          title="Reply"
          onPress={() => addComment(item.id)}
          buttonStyle={{ width:90,height:40,borderRadius:22,  backgroundColor:"#00b9fb",}}
        />  
        </View>
        </KeyboardAvoidingView>
  </View>
 
 
<FlatList
          data={elements}
          renderItem={renderItem}
        
          keyExtractor={(item)=> item.id}
        />
      
        </View>
 
    );
};


const styles = StyleSheet.create({
    image:{
        height:30,
        width:30,
        borderRadius:15
    }
})
const mapStateToProps = state => {
 
    return {
        user:state.auth.user ,
        comments:state.post.comments,
        isLogin:state.auth.isLoginin,
        getProfileItem:state.auth
    }
  }
export default connect(mapStateToProps,{commentSubmit,fetchComments,testSubmit})(SinglePost);

