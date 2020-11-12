import React, { useState,useEffect } from 'react';
import { View, StyleSheet, Text,FlatList ,Image,TouchableOpacity,ScrollView,SafeAreaView,ActivityIndicator,Modal} from "react-native";
import {Button,Input} from "react-native-elements";
import { connect } from 'react-redux';
import { EvilIcons,MaterialIcons,Feather,AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {postSubmit,fetchPosts,setFollowersAndFollowing} from "../redux/actions/auth";
import { openImageibary, openCameraReal, PrepareBlob } from "./utils/hepler";
import * as firebase from "firebase"
import Item from "../components/Item";


const Home = ({user,isLogin,navigation,postSubmit,fetchPosts,Posts,setFollowersAndFollowing}) => {
  const[content,setContent] = useState("");
  const[userInfo,setuserInfo] = useState({});
  const[elements,setElements] = useState([]);
  const[postImage,setImage]=useState(null);
  const[loading,setLoading]=useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(()=>{
    let isMounted = true 
  
    fetchPosts();
    setFollowersAndFollowing();
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
  setElements(Posts);
},[elements,Posts]);
  
  const {username ,profileImage} = userInfo ;

  const handleSubmit = ()=> {
      postSubmit(username ,profileImage,user,content,postImage );
      setModalVisible(false);
      setContent("");
  } 
     
  const uploadImageToFirebase = async (image ) => {
    const uid = Math.floor(Math.random() * 1000);
    setLoading(true);
    const ref = await firebase.storage().ref("shop/" + uid);
    try {
      const blob = await PrepareBlob(image.uri);

      const snapShot = await ref.put(blob);

      let downloadUrl = await ref.getDownloadURL();
      if(downloadUrl){
        setImage(downloadUrl);
        setLoading(false);
      }
    
     
    } catch (error) {
      console.log(error);
    }
  };

  const pickImage = async (chooseImage) => {
    const result = await openImageibary();

    if (result) {
      const downloadUrl = await uploadImageToFirebase(result );
    }
  };
  const renderItem =({item,i})=> (
   
    <Item    item={item} navigation={navigation} />
  )

  return (
    <SafeAreaView style={{flex:1}}>
      
   

     <FlatList
          data={elements}
          renderItem={renderItem}
        
          keyExtractor={(item)=> item.id}
        />
       <View style={styles.add_btn}>
         <TouchableOpacity onPress={() => setModalVisible(true)}>
         <Text style={{color:"white",fontSize:30}}>+</Text>
         </TouchableOpacity>
       </View>  
       <Modal    animationType="slide"
        transparent={true}
        visible={modalVisible}>
      <View style={styles.modal_container}>     
      <EvilIcons name="close-o" size={30} color="black" style={{marginTop:-4,marginLeft:260}} onPress={() => setModalVisible(false)} />
       <Input
        placeholder='Write Your content'
       onChangeText={(text) => setContent(text)}
       multiline
/>
<TouchableOpacity
              onPress={() => pickImage()}
                style={{flexDirection:"row"}}
            >
              <Text>Upload Image</Text>
              <MaterialCommunityIcons name="image-plus" size={37} color="black" style={{marginTop:-10,marginLeft:6}} />
            </TouchableOpacity>
   {loading ?   <ActivityIndicator size="small" color="#0000ff" /> : null}
   {!loading ?   
<Button
  title="Tweet"
  onPress={() => handleSubmit()}
  buttonStyle={{ width:100,height:45,backgroundColor:"#00b9fb",alignSelf:"center",marginTop:6}}
/> : null}    
</View> 
       </Modal>  
    </SafeAreaView>
  );
};


const mapStateToProps = state => {
 
  return {
      user:state.auth.user ,
      Posts:state.post.posts,
      isLogin:state.auth.isLoginin,
      getProfileItem:state.auth
  }
}
const styles = StyleSheet.create({
  add_btn:{
    height:50,width:50,borderRadius:25,backgroundColor:"#00b9fb",alignItems:"center",justifyContent:"center",
    position:"absolute",bottom:5,right:10
  },
  modal_container:{
    height:200,
    width:300,
    backgroundColor:"#f2e5e4",
    marginLeft:20,
    marginTop:70,
    padding:7,
    alignSelf:"center"
  }
})
export default connect(mapStateToProps,{postSubmit,fetchPosts,setFollowersAndFollowing})(Home);