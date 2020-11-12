import React from 'react';
import { View, StyleSheet, Text,FlatList ,Image,TouchableOpacity} from "react-native";
import {Card} from "react-native-elements";
import moment from 'moment';
import {connect} from "react-redux"
import { EvilIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const Item = ({item ,navigation,user,single }) => {
   
    return (
     
  
       <View  style={styles.container}>
           <View style={{width:"15%"}}>
           <Image style={styles.image} resizeMode="cover" source={{ uri: item.image }}
          /> 
           </View>    
           <View style={{width:"85%",marginLeft:5,marginTop:5}}>
               <View style={{flexDirection:"row",justifyContent:"space-between"}}>
               {user !== item.userId  ? 
     <>     
    <TouchableOpacity onPress={() => navigation.navigate("UserProfile" ,{  userId:item.userId,title:item.username } )} style={{flexDirection:"row"}}>
    <Text  style={{marginLeft:3,marginTop:3,fontWeight:"bold"}}>{item.username}</Text>
    <Text  style={{marginLeft:7,marginTop:3}}>@{item.username.split(" ")[0]}</Text>
    </TouchableOpacity>
    </>:         
    <View style={{flexDirection:"row"}}>
    <Text  style={{marginLeft:3,marginTop:3,fontWeight:"bold"}}>{item.username}</Text>
    <Text  style={{marginLeft:7,marginTop:3}}>@{item.username.split(" ")[0]}</Text>
    </View>
    }
    <Text style={{marginTop:3,marginRight:8}}>{moment(item.date).format("DD MMM YY")}</Text>
               </View>    
               <View style={{flexDirection:"row"}}>
               <TouchableOpacity onPress={() => navigation.navigate("SinglePost",{item})}> 
               <View  style={styles.user}>
               <Text style={styles.name}>{item.content}</Text>
              {item.postImage && <Image  source={{uri:item.postImage}} style={{height:160,width:330,marginLeft:-4}} />}
              </View>
              </TouchableOpacity> 
                 
               </View>   
               {!single &&
               <View style={{flexDirection:"row",width:"80%",justifyContent:"space-between"}}>
                    <EvilIcons name="comment" size={24} color="black" />
                    <MaterialCommunityIcons name="twitter-retweet" size={24} color="black" />
                    <Ionicons name="md-heart-empty" size={24} color="black" />
                 
               </View>   }
          </View>   
       
        
  
       
        </View>
    );
};
const styles = StyleSheet.create({
    container:{
        flexDirection:"row",flex:1,paddingHorizontal:10,backgroundColor:"#fff",
      
        marginVertical:2,
        paddingBottom:5
    },
    image:{
        marginTop:5,
        height:50,
        width:50,
        borderRadius:25
    },
    name:{
        textAlign:"justify",
        marginBottom:5,
       
    }
})

const mapStateToProps = state => {
 
    return {
        user:state.auth.user ,
       
    }
  }
export default  connect(mapStateToProps)(Item);