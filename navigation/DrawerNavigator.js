import React,{useEffect, useState} from "react";
import * as firebase from "firebase"
import { createDrawerNavigator } from "@react-navigation/drawer";
import {  AuthStackNavigator,ProfileStackNavigator} from "./StackNavigator";
import TabNavigator from "./TabNavigator";
import { FontAwesome,FontAwesome5,MaterialCommunityIcons ,Entypo} from '@expo/vector-icons';
import {Image,Text,View} from "react-native"
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import {fetchFollowers,fetchFollowing} from "../redux/actions/auth"
import {connect} from "react-redux"

const Drawer = createDrawerNavigator();

const DrawerNavigator = ({fetchFollowers,fetchFollowing,followers,followings} ) => {
  const[isLogin,setIslogin] = useState(false);
  const[userId,setUserId] = useState(null)
  const[userInfo,setuserInfo]=useState({})
  useEffect(() => {
    let isMounted = true 
    firebase.auth().onAuthStateChanged(function (user) {
      if (user !== null && user.uid) {

        setIslogin(true);
        setUserId(user.id)
        // fetchFollowers(user.uid);
        // fetchFollowing(user.uid) ;
        firebase.database().ref("shop/auth/" + user.uid).on("value",snapShot => {
                   if(snapShot && snapShot.val() ){
                    setuserInfo(snapShot.val())
                   }
        })
      } else {
        setIslogin(false);
      }
    });
    return (()=> isMounted = false)
  }, [userId]); 

  
  return (
    <Drawer.Navigator  drawerContentOptions={{
      activeTintColor: '#e91e63',
    
    }} >
      
          <>
          
             <Drawer.Screen name="Home" component={TabNavigator}
              options={{
                title: "Home",
                drawerIcon: ({ focused, size }) => (
                  <>
              
                  <FontAwesome name="home" size={18} color="black" />
                  </>
                  ) }}
                 
             />
        { userId !== null && userInfo && userInfo.profileImage &&  <Drawer.Screen name="Home43" component={TabNavigator}
              options={{
                title: '',
                drawerIcon: ({ focused, size }) => (
                  <>
                    <View style={{flexDirection:"row",marginTop:-12,marginBottom:35,}}>
                    <Image  source={{uri:userInfo.profileImage}} style={{height:50,width:50,borderRadius:25}}  />
                    </View>
                    <View style={{marginTop:40,marginLeft:-48,marginBottom:10}}>
                    <Text style={{fontWeight:"bold",fontSize:20}}>{userInfo.username.split(" ")[0]}</Text>
                    </View>
                    <View style={{flexDirection:"row",marginTop:70,marginLeft:-63 ,borderBottomColor:"black",}}>
                    {/* <Text style={{fontWeight:"bold"}}>{  followings.length}</Text ><Text style={{fontWeight:"normal",opacity:0.4}}> Following</Text>
                    <Text style={{fontWeight:"bold",marginLeft:14}}>{  followers.length}</Text ><Text style={{fontWeight:"500",opacity:0.4}}> Followers</Text> */}
                       
                  
                    </View>  
                  </>
                  ) }}
                 
             /> }
       
          
        
  {userId === null ? <Drawer.Screen name="Signup" component={AuthStackNavigator} 
        options={{
          drawerIcon:()=> (
            <>
            <FontAwesome name="sign-in" size={20} color="black" />
           </> 
          )
        }}
                /> : null }
 { userId !== null ? 
 <>
  <Drawer.Screen name="Profile" component={ProfileStackNavigator}  options={{
              
                drawerLabel: 'Profile',
                drawerIcon: ({ focused, size }) => (
                  <>
                  <AntDesign name="user" size={20} color="black" />
                  </>
                  ) ,
                
                  }}
/>
     <Drawer.Screen name="Lists" component={TabNavigator}
              options={{
                // title: 'Lists',
                contentOptions:{
                  labelStyle:{fontWeight:"blod"}
                },
                drawerIcon: ({ focused, size }) => (
                  <>
              
              <Ionicons name="md-list-box" size={20} color="black" />
                  </>
                  ) }}
             />
              <Drawer.Screen name="Topics" component={TabNavigator}
              options={{
                title: 'Topics',
                drawerIcon: ({ focused, size }) => (
                  <>
              
              <FontAwesome5 name="discourse" size={20} color="black" />
                  </>
                  ) }}
             />
              <Drawer.Screen name="Bookmarks" component={TabNavigator}
              options={{
                title: 'Bookmarks',
                drawerIcon: ({ focused, size }) => (
                  <>
              
              <FontAwesome name="bookmark-o" size={20} color="black" />
                  </>
                  ) }}
             />
              <Drawer.Screen name="Moments" component={TabNavigator}
              options={{
                title: 'Moments',
                TitleStyle:{
                  fontWeight: "bold"
                },
                drawerIcon: ({ focused, size }) => (
                  <>
              
              <FontAwesome5 name="bolt" size={20} color="black" />
                  </>
                  ) }}
             />
         </> : null }
  
 </>

          
      
    
    
    </Drawer.Navigator>
  );
}

const mapStateToProps = state => {
 
  return {
      followers:state.auth.followers,
      followings:state.auth.followings
  }
}

export default  connect(mapStateToProps,{fetchFollowers,fetchFollowing} )  (DrawerNavigator);