import { StyleSheet, Text, View , TouchableOpacity} from 'react-native';
import React, { useEffect, useState } from 'react';
import {ListItem, Avatar} from "react-native-elements";
import { db } from '../firebase';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const MyCustomList = ({id, chatName,onChatEnter}) => {
  const [chatMessages,setChatMessages] = useState([]);

  //deleting the chat
  const deleteChat = async () => {

      db.collection("chats").doc(id).delete();
  }
  useEffect(()=> {
      const undo = db
      .collection("chats")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp","desc")
      .onSnapshot((snapshot)=>
        setChatMessages(snapshot.docs.map((doc) => doc.data()))
      );
      return undo;
  });
 
  return (
    
    <ListItem  onPress = {() => onChatEnter (id,chatName)} key ={id} bottomDivider containerStyle={{backgroundColor:"#C7D3D4FF"}} > 
     <Avatar
        rounded
        source={{
            uri: chatMessages?.[0]?.photoURL ||"https://www.pikpng.com/pngl/m/292-2924795_user-icon-png-transparent-white-user-icon-png.png"// displays last message sent
        }}
     />
     <ListItem.Content  >
       <ListItem.Title style ={{fontWeight: "800" }}>
          {chatName}
       </ListItem.Title>
        <ListItem.Subtitle  numberOfLines={1}  ellipsizeMode = "tail"> {chatMessages?.[0]?.displayName}:{chatMessages?.[0]?.message} </ListItem.Subtitle>
     </ListItem.Content>

     <TouchableOpacity activeOpacity={0.5}>
      <MaterialCommunityIcons onPress={deleteChat} style = {styles.deletebtnStyle} name="delete-empty" size={34} color="#603F83FF" />
      </TouchableOpacity>
    </ListItem >
  )
}

export default MyCustomList

const styles = StyleSheet.create({

  deletebtnStyle:{
    alignSelf: "flex-end",
    

  }

})