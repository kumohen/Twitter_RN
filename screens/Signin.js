import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from "react-native";
import {Card} from "react-native-elements";

import { Input,Button } from 'react-native-elements';
import { Fontisto,Entypo,FontAwesome } from '@expo/vector-icons';
import {userLogin} from "../redux/actions/auth"
import {connect} from "react-redux"

const Signin = ({userLogin,navigation}) => {
  const [email, setEmail] = useState("mohen1@gmail.com");
  const [password, setPassword] = useState("123456");

  const handleSubmit = async () => {
    userLogin(email,password);
     navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <SafeAreaView />

      <View style={styles.input_Con}>
       <Card containerStyle={{width:"100%"}}>
       <Input
  placeholder='Email'
  onChangeText={(text) => setEmail(text)}
  value={email}
  leftIcon={
    <Fontisto name="email" size={17} color="black" />
  }
/>
<Input
  placeholder='Password'
  onChangeText={(text) => setPassword(text)}
  value={password}
  secureTextEntry
  leftIcon={
    <Entypo name="lock" size={17} color="black" />
  }
/> 
      
<Button
  title="Signin"
  onPress={() => handleSubmit()}
  buttonStyle={{ width:"100%",height:45,backgroundColor:"#00b9fb",alignSelf:"center",marginTop:10}}
/>
      </Card >
      </View>
      <TouchableOpacity onPress={() => navigation.push("Signup")}>
        <Text style={{ fontSize: 15, textAlign: "center" }}>
          {" "}
          Go to <Text style={{ fontWeight: "bold" }}> SignUp Page </Text> If U
          haven't a account
        </Text>
      </TouchableOpacity>
     
      <SafeAreaView />
    </View>
  );
};

export default connect(null,{userLogin})(Signin);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  img_con: {
    height: 250,
  },
  image: {
    flex: 1,
  },
  input_Con: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    marginTop: 20,
  },
  inputStyle: {
    height: 60,
    borderColor: "gray",
    width: "100%",
    borderWidth: 1,
    marginBottom: 7,
    borderRadius: 15,
  },
  btn_signin: {
    height: 56,
    width: 100,
    backgroundColor: "#06A43C",
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
});
