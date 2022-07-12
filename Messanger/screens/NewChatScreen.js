import { StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import {Button, Input} from "react-native-elements";
import { Feather } from '@expo/vector-icons'; 
import { db } from '../firebase';
const NewChatScreen = ({navigation}) => {

// creating an empty string const 
const [input, setInput] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Add a new Chat",
            headerBackTitle: "MyChats"
        })

    },[navigation])

    // all the chats will be stored in the collections in the firebase
    //adding chats to it
    const createNewChat = async () => {
        await db.collection("chats").add({
            //chat name is equal to the users input
            chatName: input
        }).then(() =>{
            // navigating back to chat screen
            navigation.goBack()
        }).catch((error)=>alert(error));
    }

  return (
    <View style = {styles.container}>
      <Input placeholder = "Enter a chat name" 
      value = {input}
      onChangeText = {(text) =>setInput (text)}
      leftIcon = {
            <Feather name = "message-circle" type="antdesign" size ={30} color = "#C7D3D4FF"/>
      }
      />
      <Button disabled ={!input} style ={styles.button} type = "outline" onPress = {createNewChat} title = "Create New Chat"/>
    </View>
  )
}

export default NewChatScreen

const styles = StyleSheet.create({
        container: {
            flex:1,
            backgroundColor: '#CBC3E3',
            padding: 30,

        },
        button:{
            backgroundColor: "#603F83FF",
            width:200,
            marginLeft: 55,
           
            
          }
})