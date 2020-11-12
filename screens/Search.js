import React,{useEffect, useState} from 'react';
import { View, StyleSheet, Text,FlatList ,Image,TouchableOpacity,ScrollView,SafeAreaView,ActivityIndicator,Modal,TextInput, } from "react-native";
import {connect} from "react-redux";
import {Button} from "react-native-elements"
import {searchUser} from "../redux/actions/auth"
import * as firebase from "firebase"

const Search = ({searchUser ,queryUser ,navigation }) => {
    const[searchText,setSearchText]=useState("")
    const[users,setUsers]=useState([])
    
    useEffect(()=>{
        // searchUser("Ma");
        // setUsers(queryUser)
    },[searchText])

    const searchItem = async ()=> {
        setUsers("");
        await firebase.database().ref("shop/auth/").on("value",snapshot => {
            if(snapshot && snapshot.val()){
                const User = Object.values(snapshot.val());
                   let userData = (snapshot.val());

                   var variable = searchText.toLowerCase();
                   var expression = `.*${variable}.*`
                   var re = new RegExp(expression, 'g')
                   let dataArr = [];
                for(let ele in userData){
                       if(re.test(userData[ele].username.toLowerCase())){
                          let obj = {
                              userId:ele ,
                              username:userData[ele].username,
                              profileImage:userData[ele].profileImage
                          }
                          dataArr.push(obj)
                       }
                   }

               setUsers(dataArr);
            }
           
        })
    }
    const renderItem =({item})=> {
        return(
            <View key={item.password} >
                <TouchableOpacity onPress={() => navigation.navigate("UserProfile",{
                    userId:item.userId
                })} style={{flexDirection:"row",marginBottom:3,height:65,width:220,backgroundColor:"#fff",
                   marginBottom:8,alignItems:"center",justifyContent:"center"}}>
                <View>
                    
                <Image  style={{height:50,width:50,borderRadius:25}} source={{uri:item.profileImage}} />
                </View>
                <View style={{marginLeft:5}}>
               <Text style={{fontWeight:"bold"}}>{item.username}</Text>
               <Text>@{item.username.split(" ")[0]}</Text>
             
               </View>
               </TouchableOpacity>
            </View>    
        )
    }
    return (
        <View>
           <View style={{flexDirection:"row",margin:10}}>
           <TextInput style={{  height: 40, width:220, borderColor: 'gray', borderWidth: 1,borderRadius:15  }}
           onChangeText={text => setSearchText(text)}
            placeholder="Search Tweet"
            value={searchText}
          />
           <Button
          title="Search"
          onPress={() => searchItem()} 
          buttonStyle={{ width:90,height:40,borderRadius:22,  backgroundColor:"#00b9fb",marginLeft:4}}
        /> 
         
          </View>
      <View style={{marginTop:10,marginLeft:10}}>
      <FlatList  data={users}     renderItem={renderItem}
      keyExtractor={(item,i)=> i.toString()} />
      </View>

        </View>
    );
};

const styles = StyleSheet.create({

})
const mapStateToProps = state => {
 
    return {
        queryUser:state.auth.searchUser ,
     
    }
  }
export default connect(mapStateToProps,{searchUser})(Search);