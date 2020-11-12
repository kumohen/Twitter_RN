import React,{useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Alert,
    
    TextInput,
    TouchableOpacity,
    SafeAreaView,
  } from "react-native";
import * as firebase from "firebase";
import {userRegistration} from "../redux/actions/auth";
import { Input,Button,Card } from 'react-native-elements';
import { Fontisto,Entypo,FontAwesome } from '@expo/vector-icons';
import {connect} from "react-redux";


const Signup = ({ navigation,  userRegistration}) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const handleSubmit = ()=> {
        userRegistration(username,email,password);
        // navigation.navigate("Home");
    }

    return (
        <View style={styles.container}>
      <SafeAreaView />
      <View style={styles.input_Con}>
      <Card containerStyle={{width:"100%"}}>
      <Input
  placeholder='Full name'
  onChangeText={(text) => setUsername(text)}
  leftIcon={
    <FontAwesome name="user-circle" size={17} color="black" />
  }
/>
      <Input
  placeholder='Email'
  onChangeText={(text) => setEmail(text)}
  leftIcon={
    <Fontisto name="email" size={17} color="black" />
  }
/>
<Input
  placeholder='Password'
  onChangeText={(text) => setPassword(text)}
  leftIcon={
    <Entypo name="lock" size={17} color="black" />
  }
/>
<Button
  title="Register"
  onPress={() => handleSubmit()}
  buttonStyle={{ width:"100%",height:45,backgroundColor:"#00b9fb",alignSelf:"center",marginTop:10}}
/>
        
        {/* <TouchableOpacity
          onPress={() => handleSubmit()}
          style={styles.btn_signin}
        >
          <Text style={{ fontSize: 18, color: "white" }}>SignUp</Text>
        </TouchableOpacity> */}
        </Card>
      </View>

      <TouchableOpacity onPress={() => navigation.push("Signin")}>
        <Text style={{ fontSize: 15, textAlign: "center" }}>
          {" "}
          Go to <Text style={{ fontWeight: "bold" }}> SignIn Page </Text> If U
          have a account
        </Text>
      </TouchableOpacity>
      <SafeAreaView />
    </View>
    );
};

export default connect(null,{userRegistration})(Signup);

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



  //  <TextInput
  //         style={styles.inputStyle}
  //         onChangeText={(text) => setUsername(text)}
  //         placeholder="your user name"
  //         value={username}
  //       />

  //       <TextInput
  //         style={styles.inputStyle}
  //         onChangeText={(text) => setEmail(text)}
  //         placeholder="your email"
  //         value={email}
  //       />
  //       <TextInput
  //         style={styles.inputStyle}
  //         onChangeText={(text) => setPassword(text)}
  //         placeholder="your password"
  //         value={password}
  //         secureTextEntry={true}
  //       /> 