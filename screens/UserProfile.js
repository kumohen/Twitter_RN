import React,{useState,useEffect} from 'react';
import {View,Text,Image,Modal,Alert,TouchableOpacity,StyleSheet,FlatList,ScrollView} from "react-native";
import * as firebase from "firebase"
import { connect } from 'react-redux';
import {followeAUser ,fetchFollowers,fetchFollowing,fetchOwnPosts,setFollowersAndFollowing} from "../redux/actions/auth";
import Item from "../components/Item";
import { EvilIcons,MaterialIcons,Feather,AntDesign ,SimpleLineIcons} from '@expo/vector-icons';

import {Button} from "react-native-elements"

const UserProfile = ({route,navigation,user,followeAUser ,fetchFollowers,fetchFollowing ,
  followings,followers,fetchOwnPosts,userPosts,setFollowersAndFollowing}) => {
    const {userId,title} = route.params ;
  
    const[userInfo,setuserInfo] = useState({});
   const[currentUser,setCurrentUser] = useState({})
   const[followersList,setFollowersList]=useState([])
   const[followingList,setFollowingList]=useState([])
   const[userAllPost,setUserAllPost]=useState([])
   const [modalVisible, setModalVisible] = useState(false);
   const[show,setShow] = useState("");

    useEffect(()=>{
         let isMounted = true 
      
        firebase.database().ref("shop/auth/" + userId).on("value",snapShot => {
         
          if(snapShot && snapShot.val() ){
            setuserInfo(snapShot.val())
          }
        })
        fetchFollowers (userId);
        fetchFollowing(userId);
        fetchOwnPosts(userId);
         
   if(user !== undefined){
    firebase.database().ref("shop/auth/" + user ).on("value",snapShot => {
     
      if(snapShot && snapShot.val() ){
        setCurrentUser(snapShot.val())
      }
    })
   }
      
        return (()=> isMounted = false)
    },[ userId ,user])
    
    useEffect(()=> {
         setFollowersList(followers)
         setFollowingList(followings)
         setUserAllPost(userPosts)
        //  return (()=> {
        //   setFollowersAndFollowing();
        //  })
    },[followers,followings,userPosts])

    

      const followingFuntion = () => {
          const followingUser = {
              id:userId ,
              username:userInfo.username,
              profileImage:userInfo.profileImage    
          }
          const followerUser = {
              id:user ,
              username:currentUser.username,
              profileImage:currentUser.profileImage  
          }
          followeAUser(followingUser,followerUser)
      }
      const renderItem = (followingList)=> {
        return(
          <View style={styles.centeredView}>
          <View style={styles.modalView}>
             {followingList.length > 0 ? 
                (followingList.map((item,index) => (
                <View key={index} style={{marginBottom:5,flexDirection:"row"}}>  

                  <Image  source={{uri:item.profileImage}} style={{height:40,width:40,borderRadius:20}} />
                 <View>
                <Text style={{marginLeft:6,fontWeight:"bold"}}>{item.username}</Text>
                <Text style={{marginLeft:6,}}>@{item.username.split(" ")[0] + Math.floor(Math.random()*1000000)}</Text>
                 </View>
                </View>
                )))
            : null}
          </View>
        </View>
        )
      }
    const handleModel = (item)=> {
      setModalVisible(true);
      setShow(item);
    }  
    const renderItem2 =({item,i})=> (
   
      <Item    item={item} navigation={navigation} />
    )
     let allFollowers = [] ;

     for(let item of followersList){
       allFollowers.push(item.id)
     }
     const renderPostItem = ()=> {
       return  userAllPost.length ? userAllPost.map((item,index)=> (
        <Item    item={item} navigation={navigation} key={index} />
       )) : null
     }
    return (
        <ScrollView>
            <View>
            {userInfo && userInfo.bgImage ? (
                 <Image source={{ uri: userInfo.bgImage }}
                 style={{height:140,width:"100%"}}
               />
              ):(
                <Image source={{ uri: "https://res.cloudinary.com/dvfpkko1z/image/upload/v1587451257/download_yfdqq4.png" }}
                style={{height:150,width:"100%",}}
              />
              )} 
          {userInfo && userInfo.profileImage ? (
            <Image source={{ uri: userInfo.profileImage }} style={styles.profile_image} />
          ) : (
            <Image source={{uri: "https://res.cloudinary.com/dvfpkko1z/image/upload/v1587451257/download_yfdqq4.png", }}
              style={styles.profile_image}
            />
          )}
          <Text style={{ fontWeight: "bold", marginLeft: 10,fontSize:20,marginTop:-10 }}>
            {userInfo && userInfo.username && userInfo.username.split(" ")[0]}
          </Text>
      
          <View style={{marginTop:-70,marginBottom:55}}>

           {user &&  !allFollowers.includes(user) ? 
          
          <Button  title="Follows" buttonStyle={{
            height:30,width:100,borderRadius:20,marginLeft:290,zIndex:99,color:"black"}} 
            onPress={() => followingFuntion()} /> 
         
            :  
            <View style={{flexDirection:"row",marginLeft:290,zIndex:99}}>
             
            <Button  title="Following" buttonStyle={{
              height:30,width:100,borderRadius:20,color:"#00b9fb"}} 
            /> 
            </View>
            }
          </View> 
          
          <View style={{flexDirection:"row",marginBottom:7}}>
               <View style={{flexDirection:"row"}}>
                   <EvilIcons name="location" size={24} color="black" />
                   <Text>Delhi</Text>
               </View>  
               <View style={{flexDirection:"row",marginLeft:10}}>
                   <EvilIcons name="calendar" size={24} color="black" />
                   <Text>Join Octobar 2019</Text>
               </View>
          </View> 

          <View style={{flexDirection:"row",marginLeft:5}}>
               <TouchableOpacity onPress={() => handleModel("following")} style={{flexDirection:"row"}}>
                  
                 <Text style={{fontWeight:"bold"}}>{  followingList.length}</Text ><Text style={{fontWeight:"500"}}> Following</Text>
                </TouchableOpacity> 
                <TouchableOpacity onPress={() => handleModel("followers")} style={{marginLeft:20}}>
               <Text>{followersList.length} Followers</Text>
               </TouchableOpacity>
          </View> 

          </View>  
            {renderPostItem()}
               {/* {userAllPost.length ?
            
                <FlatList data={userAllPost} renderItem={renderItem2} keyExtractor={(item)=> item.id} />
             
             :null}
             */}
           <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
           setModalVisible(false)
        }}
      >
         { show == "following" && renderItem(followingList) } 
         {show == "followers" && renderItem(followersList)} 
      </Modal>

     
    </View>
        </ScrollView>
    );
};


const mapStateToProps = state => {

    return {
        user:state.auth.user ,
        Posts:state.post.posts,
        isLogin:state.auth.isLoginin,
        getProfileItem:state.auth,
        followers:state.auth.followers,
        followings:state.auth.followings,
        userPosts:state.post.ownPosts 
    }
  }
  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      height:200,
      width:250,
      padding: 10,
      shadowColor: "#000",
      overflow:"scroll"
    },
    profile_image: {
      height: 90,
      width: 90,
      borderRadius: 45,
      marginBottom: 5,
      marginTop: -30,
      borderColor:"#fff",
      borderWidth:5
    },
  });

export default connect(mapStateToProps,{followeAUser,fetchFollowers,fetchFollowing,
  fetchOwnPosts,setFollowersAndFollowing})(UserProfile);