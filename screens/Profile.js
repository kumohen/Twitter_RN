import React,{useEffect, useState} from 'react';
import { View, StyleSheet, Text,FlatList ,Image,TouchableOpacity,Modal} from "react-native";
import {connect} from "react-redux";

import { EvilIcons,MaterialIcons,Feather,AntDesign } from '@expo/vector-icons';
import moment from 'moment';
import {logOut,profileDetails ,fetchFollowers,fetchFollowing,fetchOwnPosts,updateProfile} from "../redux/actions/auth"
import * as firebase from "firebase";
import { openImageibary, openCameraReal, PrepareBlob } from "./utils/hepler";
import Item from "../components/Item"
import {Button,Input} from "react-native-elements"


const Profile = ({user,isLogin,logOut,navigation,fetchFollowers,fetchFollowing,fetchOwnPosts,followers,followings,userPosts,updateProfile}) => {
    const[userInfo,setuserInfo] = useState({});
    const[followersList,setFollowersList]=useState([])
    const[followingList,setFollowingList]=useState([])
    const [modalVisible, setModalVisible] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const[userAllPost,setUserAllPost]=useState([])
    const[show,setShow] = useState("");
    const[bio,setBio]=useState("")
    const[location,setLocation] = useState("")
  

    useEffect(()=>{

        let  isMounted = true  ;
    
        if(user !== undefined){
        firebase.database().ref("shop/auth/" + user).on("value",snapShot => {
         
          if(snapShot && snapShot.val() ){
       
            setuserInfo(snapShot.val())
           
          }
        })
       
        fetchFollowers(user);
        fetchFollowing(user) ;
        fetchOwnPosts(user);
      }
        return (()=> isMounted = false)
    },[isLogin ,user,])
   
    useEffect(()=> {
      setFollowersList(followers)
      setFollowingList(followings)
      setUserAllPost(userPosts)
    },[followers,followings,userPosts])
    useEffect(()=> {
      if(userInfo && userInfo.bio && userInfo.location){
         
        setBio(userInfo.bio);
        setLocation(userInfo.location)
      }
    },[userInfo])
  
    const profileLogout = () => {
      
        logOut();
        navigation.navigate("Home")
    }
   
    const uploadImageToFirebase = async (image ,chooseImage) => {
        const uid = Math.floor(Math.random() * 1000);
        const ref = await firebase.storage().ref("shop/" + uid);
        try {
          const blob = await PrepareBlob(image.uri);
    
          const snapShot = await ref.put(blob);
    
          let downloadUrl = await ref.getDownloadURL();
          if(chooseImage === "profileImage"){
            await firebase
            .database()
            .ref("shop/auth/" + user)
            .update({ profileImage: downloadUrl });
          console.log("firebase image");
          blob.close();
          return downloadUrl;
          } else{
            await firebase
            .database()
            .ref("shop/auth/" + user)
            .update({ bgImage: downloadUrl });
          console.log("firebase image");
          blob.close();
          return downloadUrl;
          }
        
         
        } catch (error) {
          console.log(error);
        }
      };
    
      const pickImage = async (chooseImage) => {
        const result = await openImageibary();
    
        if (result) {
          const downloadUrl = await uploadImageToFirebase(result ,chooseImage);
        }
      };
      const pickCameraImage = async (chooseImage) => {
        const result = await openCameraReal();
    
        if (result) {
          const downloadUrl = await uploadImageToFirebase(result,chooseImage);
        }
      };
      const renderItem = (followingList)=> {
        return(
          <View style={styles.centeredView}>
          <View style={styles.modalView}>
          {followingList.length > 0 ? 
                (followingList.map((item,index) => (
                <View key={index} style={{marginBottom:10,flexDirection:"row"}}>  

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
    const updateAndSave = ()=>{
      updateProfile(user,bio,location);
      setModalVisible(false);
    } 

    return (
        <View style={{flex:1,marginTop:-10}}>
            <View style={styles.main_view}>

             <View >

              {userInfo && userInfo.bgImage ? (
                 <Image source={{ uri: userInfo.bgImage }}
                 style={{height:140,width:430}}
               />
              ):(
                <Image source={{ uri: "https://res.cloudinary.com/dvfpkko1z/image/upload/v1587451257/download_yfdqq4.png" }}
                style={{height:150,width:300,}}
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
           <View>
          <Text style={{marginLeft:8}}>{userInfo.bio}</Text>
           </View>  
          <View style={{marginTop:-80,marginBottom:55,}}>
          <Button  title="Edit Profile" buttonStyle={{
             height:30,width:100,borderRadius:20,marginLeft:280,zIndex:99,color:"black"}} 
            onPress={() => setShowModal(true)} />
          </View>  

          <View style={{flexDirection:"row",marginBottom:7}}>
               <View style={{flexDirection:"row"}}>
                   <EvilIcons name="location" size={24} color="black" />
          <Text>{userInfo.location}</Text>
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


        <Modal   animationType="slide"   transparent={true}
        visible={showModal}>
        <View style={{marginTop:53,borderColor:"white",borderWidth:1,backgroundColor:"white",flex:1,width:"100%",shadowColor: "#000"}}>
            <MaterialIcons name="cancel" size={34} color="black" style={{marginLeft:370}} onPress={() => setShowModal(false)} />
          <View>
            <View style={{backgroundColor:"#fff"}}>
         
            {/* <Text style={{fontSize:18,marginTop:11,marginRight:10}}>Profile Image</Text>   */}
            {userInfo && userInfo.bgImage ? (
                 <Image source={{ uri: userInfo.bgImage }}
                 style={{height:140,width:360,opacity:0.6}}
               />
              ):(
                <Image source={{ uri: "https://res.cloudinary.com/dvfpkko1z/image/upload/v1587451257/download_yfdqq4.png" }}
                style={{height:150,width:260,}}
              />
              )} 
               <MaterialIcons name="add-to-photos" size={40} color="white" 
               onPress={() => pickImage("bgImage")} style={{position:"absolute",marginTop:60,marginLeft:150 }} />
           
            </View>
            <View>
            {userInfo && userInfo.profileImage ? (
            <Image source={{ uri: userInfo.profileImage }} style={styles.profile_image} />
             ) : (
            <Image source={{uri: "https://res.cloudinary.com/dvfpkko1z/image/upload/v1587451257/download_yfdqq4.png", }}
              style={styles.profile_image}
            />
             )}
             <View style={{marginLeft:32,flexDirection:"row",marginTop:-57}}>
             <Feather name="camera" size={24} color="white"  onPress={() => pickCameraImage("profileImage")} 
             style={{marginRight:26,}} />
             <MaterialIcons name="add-to-photos" size={24} color="black"  onPress={() => pickImage("profileImage")}/>
             </View>
            </View>  

            <View style={{marginTop:20}}>
           
             <Input placeholder='Bio' onChangeText={(text) => setBio(text)} value={bio} />
             <Input placeholder='Location' onChangeText={(text) => setLocation(text)} value={location} />
            <Button title="Save" onPress={() => updateAndSave()} /> 
          <Button icon={ <AntDesign name="logout" size={19} color="black" />} 
               title="  Logout" buttonStyle={{width:130,marginLeft:90 ,marginTop:220}}  onPress={() => profileLogout()} />  
           </View>   
       
          </View>
        
        </View> 
        </Modal>


      
        </View>
       
      
            


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

     
  
   
    
           {userAllPost.length ?
            <FlatList data={userAllPost} renderItem={renderItem2} keyExtractor={(item)=> item.id} />
           :null}
   
        </View>
    );
};


const mapStateToProps = state => {
 
    return {
        user:state.auth.user ,
        userPosts:state.post.ownPosts ,
        isLogin:state.auth.isLoginin,
        getProfileItem:state.auth,
        followers:state.auth.followers,
        followings:state.auth.followings
    }
}

const styles = StyleSheet.create({
    container: {
   
      backgroundColor: "#fff",
    },
    main_view:{
      flexDirection: "row",
      height: 160,
      paddingTop: 10,
      marginBottom:145
    },
    right_view:{
      marginBottom: 10,
      marginHorizontal: 20,
      flexDirection: "row",
    },
    img_con: {
      display: "flex",
      flex: 1,
      flexDirection: "row",
      paddingVertical: 10,
    },
    image: {
      height: 120,
      width: "40%",
      marginHorizontal: 15,
      marginVertical: 15,
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
    render_list:{
      flexDirection:"row",
      width:"80%",
      alignItems:"flex-start",
      justifyContent:"space-around",
      marginLeft:30
    },
    payment_header:{
      flexDirection:"row",
      width:"90%",
      borderColor:"black",
      borderWidth:1,
      alignItems:"flex-start",
      justifyContent:"space-around",
      marginTop:20,
      marginLeft:20
    },
    icon_style: {
      marginLeft:15,
      marginTop: 15,
      height: 30,
      width: 50,
      borderRadius: 30,
      borderWidth: 1,
      borderColor: "black",
      alignItems: "center",
      justifyContent: "center",
    },
    pay_style_header:{
      backgroundColor:"gray",width:"90%",color:"white",
            marginLeft:20,marginTop:10,textAlign:"center",height:40,paddingTop:7,fontSize:18
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      marginVertical: 15,
      backgroundColor: "white",
     
      padding: 15,
      height:200,
      width:250,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
  });

export default connect(mapStateToProps,{logOut,profileDetails,fetchFollowers,fetchFollowing,fetchOwnPosts,updateProfile})(Profile);