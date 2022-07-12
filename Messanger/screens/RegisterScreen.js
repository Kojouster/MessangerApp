import { StyleSheet, View,KeyboardAvoidingView} from 'react-native';
import {Button,Input,Text} from "react-native-elements";
import React, {useState, useLayoutEffect} from 'react';
import { auth } from '../firebase';





const RegisterScreen = ({navigation}) => {
// declaring getters and setters
    const[name,setName] = useState("");
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const[imageUrl,setImageUrl] = useState("");

    // changes back button on top left og the screen
    //can be customized
    useLayoutEffect(()=>{
        navigation.setOptions({
          headerBackTitle: " Back To Login",
         
          
        })

    },[navigation])
    
    const register =() =>{
      auth
      .createUserWithEmailAndPassword(email, password)
      .then(authUser => {
        authUser.user.updateProfile({
          displayName: name,
          // dont forget to add an or next to image url with default image
          //make sure it has png or jpeg extension
          photoURL: imageUrl || "https://www.pikpng.com/pngl/m/292-2924795_user-icon-png-transparent-white-user-icon-png.png"
        });

      })
      .catch(error => alert(error.message));
    }; 

  return (
      //so keyboard does't appear annoying
    <KeyboardAvoidingView behavior='padding' style ={styles.container}>
      <Text h3 style = {{marginBottom: 50}}>
            Create New Account
      </Text>
    
      <View style = {styles.inputContainer}>
            <Input                              //Creating Input fields 
            placeholder='Full Name' 
            autofocus 
            type = "text" 
            value ={name}
            onChangeText = {text => setName(text)}

            />
              <Input 
            placeholder='Email' 
            type = "text" 
            value ={email}
            onChangeText = {text => setEmail(text)}

            />
              <Input 
            placeholder='Password' 
            autofocus 
            type = "text" 
            secureTextEntry
            value ={password}
            onChangeText = {text => setPassword(text)}

            />
              <Input 
            placeholder='Profile Image Url  (optional)' 
            autofocus 
            type = "text" 
            value ={imageUrl}
            onChangeText = {text => setImageUrl(text)}
            onSubmitEditing = {register}
            />

      </View>

      <Button
      type = "outline"
      style ={styles.button}
      onPress={register} 
      title ="Register"
      
      />
      <View style = {{height: 105}}/>
    </KeyboardAvoidingView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({

inputContainer: {
  width:300,
  
},

  container: {
      flex:1,
      alignItems: "center",
      justifyContent: "center",
      padding: 10,
      backgroundColor: "#C7D3D4FF",

  },

  button: {
     backgroundColor: "#603F83FF",
     width:200,
     marginTop: 10,
     
    },
  

})