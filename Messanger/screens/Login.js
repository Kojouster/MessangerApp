import { StyleSheet, Text, View, Image, KeyboardAvoidingView } from 'react-native'
import React, {useState,useEffect} from 'react'
import {Button, Input} from "react-native-elements";
import { auth } from '../firebase';




const Login = ({navigation}) => {
  //declaring vars
  const [email, setEmail] = useState(""); // creating setters and getters
  const [password, setPassword] = useState("");

  useEffect(()=>{
     const undothis = auth.onAuthStateChanged((authUser) => {
        if(authUser) {
            navigation.replace("Home");
        }
      });
      //clenup function
      return undothis;
  },[]);

  const signIn = () => {
      auth.signInWithEmailAndPassword(email, password)
      .catch((error)=> alert(error));
      
  }
  return (
    <KeyboardAvoidingView behavior = "padding" style = {styles.container}>
      <Image source={require("../assets/logo_transparent.png")} style={{ width: 200, height: 200 }} /> 

      <View style = {styles.inputContainer}>
        <Input placeholder='Email' // turning it into text
         autoFocus 
         type = "email"
         value ={email}
         onChangeText = {text =>setEmail(text)}/>
        <Input placeholder='Password'
         secureTextEntry type = "password"
         value ={password}
         onChangeText = {text =>setPassword(text)}
         onSubmitEditing ={signIn}
         />
         
      </View>

      <Button containerStyle ={styles.button} onPress = {signIn} type = "outline" title = "Login"/>
      <Button containerStyle ={styles.button} onPress ={()=>navigation.navigate("Register")}type = "outline" title = "Register"/>
      <View style = {{height: 105}}/>
    </KeyboardAvoidingView>


  );
}

const styles = StyleSheet.create({
  
  container: {
     flex: 1,
     alignItems: "center",
     justifyContent: "center",
     padding: 10,
     backgroundColor: "#C7D3D4FF",
  },

  inputContainer: {
      width: 300,

  },
  button:{
    backgroundColor: "#603F83FF",
    width:200,
    marginTop: 10
  }

})

export default Login;