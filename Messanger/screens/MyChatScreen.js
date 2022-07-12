import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Avatar, Image } from 'react-native-elements'
import { FontAwesome } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth, db } from '../firebase';
import firebase from 'firebase/compat/app';

import { MaterialIcons } from '@expo/vector-icons'; 
import moment from 'moment';
import * as ImagePicker from 'expo-image-picker';
import {v4 as uuidv4} from "uuid";


const MyChatScreen = ({navigation, route,}) => {

  
        const[input,setInput] = useState("");
        const [messages,setMessages] =useState([])
         
    
        // This is where user gonna type their message and send it
        const sendMessage = () =>{
            //dismissing the keyboard when sending a message
            Keyboard.dismiss();
            db.collection("chats").doc(route.params.id).collection("messages").add({
                // timestap stands for uniform time around the world
                timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                message: input,
                displayName: auth.currentUser.displayName,
                email: auth.currentUser.email,
                photoURL: auth.currentUser.photoURL,
            })
                // set input to clear
                setInput("");
        };
    useLayoutEffect(()=>{
            navigation.setOptions({
                title:"Chat",
                headerBackTitleVisible: false,
                headerTitleAlign: "left",
                headerTitle: () =>(
                    <View style = {styles.styleHeader}>
                        <Avatar 
                         rounded
                        source ={{
                            uri: messages[0]?.data.photoURL, // showing the avatar of the last person who messaged
                        }}
                       />
                        <Text style ={styles.styleText}>{route.params.chatName}</Text>
                    </View>
                ),
                headerRight:() =>(
                    <View style={styles.styleIcons}>
                        <TouchableOpacity>
                            <FontAwesome name="video-camera" size={24} color="#C7D3D4FF" />
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Ionicons name="ios-call" size={24} color="#C7D3D4FF" />
                        </TouchableOpacity>
                    </View>
                )
            })
    },[navigation, messages])

    useLayoutEffect(()=>{
            const undo = db.collection("chats")
            .doc(route.params.id)
            .collection("messages")
            .orderBy("timestamp","asc")
            .onSnapshot((snapshot) => setMessages(
                // trought every single doc the object will be returned
                snapshot.docs.map(doc =>({
                    id: doc.id,
                    data: doc.data()
                }))
            ))
            return undo;
    },[route])
  return (
      //
    <SafeAreaView style = {styles.pageStyle}>
        <StatusBar style = "light"/>
        <KeyboardAvoidingView
            behavior = {Platform.OS ==="ios" ? "padding": "height"}
            style = {styles.container}
            keyboardVerticalOffset ={90} 
               
            >
              
               <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                   <>
                 <ScrollView>
                     
                    {messages.map(({id,data})=>
                        // logic for sender and receiver
                        data.email === auth.currentUser.email ?(

                                <View key ={id} style = {styles.sender}>
                                    <Avatar
                                          position = "absolute"
                                          rounded
                                          bottom ={-15}
                                          right ={-5}
                                          size = {30}
                                       source= {{
                                           uri:data.photoURL
                                       }}
                                    />
                                     
                                    <Text style = {styles.senderMessage}>{data.message} </Text>  
                                    <Text style = {styles.senderName}>me</Text>  
                                    <Text style = {styles.senderName}> {moment(new Date(data.timestamp?.toDate()).toString()).calendar()}</Text>   
                                   
                                </View>
                                
                        ):
                        (
                            <View key ={id} style ={styles.receiver}>
                                 <Avatar
                                    position = "absolute"
                                    rounded
                                    bottom ={-15}
                                    left ={-5}
                                    size = {30}
                                 source= {{
                                     uri:data.photoURL
                                 }}
                                 />
                                    <Text style = {styles.receiverMessage}>{data.message}  </Text> 
                                    <Text style = {styles.receiverName}>{data.displayName}  </Text>
                                    <Text style = {styles.receiverName}> {moment(new Date(data.timestamp?.toDate()).toString()).calendar()}</Text>       
                            </View>
                        )
                    )}
                      
                 </ScrollView>
                        <View style = {styles.footer}>
                            <TextInput 
                             value ={input} 
                             onChangeText = {(text) =>setInput(text)}
                             onSubmitEditing ={sendMessage}
                             placeholder='Message' 
                             style = {styles.textInput}/>
                                <TouchableOpacity
                                onPress={sendMessage}
                                >
                                <Ionicons name="send" size={34} color="#603F83FF" />
                                </TouchableOpacity>
                                <TouchableOpacity >
                                <MaterialIcons  onPress ={()=>  navigation.navigate("Image")} name="image" size={34} color="#603F83FF" />
                                
                                 
                                </TouchableOpacity>
                        </View>
                        </>
              </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default MyChatScreen

const styles = StyleSheet.create({

    container:{
        flex:1,
      
    }, 
    styleHeader:{
        flexDirection:"row",
        alignItems:"center",
    },
    styleText:{
        marginLeft:10,
        fontWeight: "700",
        color: "#C7D3D4FF",

    },
    styleIcons:{
        flexDirection: "row",
        justifyContent: "space-between",
        width: 80,
        marginRight:20

    },

    pageStyle: {
        flex:1,
        backgroundColor: "#CBC3E3"
    },

    footer:{
        flexDirection:"row",
        alignItems:"center",
        width:"100%",
        padding: 15,
    },

    textInput:{
        bottom:0,
        height:40,
        flex:1,
        marginRight:15,
        borderColor: "transparent",
        backgroundColor:"#C7D3D4FF",
     
        padding: 10,
        color: "black",
        borderRadius: 30,
    },
    sender: {
        padding: 10,
        backgroundColor:"#603F83FF",
        alignSelf: "flex-end",
        borderRadius: 10,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "70%",
        position: "relative",
    },
    receiver:{
        padding: 10,
        backgroundColor:"#C7D3D4FF",
        alignSelf: "flex-start",
        borderRadius:10,
        marginLeft: 15,
        marginBottom: 20,
        maxWidth: "70%",
        position: "relative",

    },
    
  receiverName:{
      left: 10,
      paddingLeft: 1,
      fontSize: 10,

  },
  senderName:{
    right: 10,
    paddingLeft: 30 ,
    fontSize: 10,
  },

  receiverMessage:{
     color: "black",
     fontWeight:"500",
     marginLeft: 10,
     marginBottom: 15,
  },

  senderMessage:{
    color: "#C7D3D4FF",
    fontWeight:"500",
    marginRight: 10,
    marginBottom: 15,
 },
  selectedImage:{
      width: "10%",
      height: "10%"
  }

   
})