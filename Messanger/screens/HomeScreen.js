import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity} from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import MyCustomList from '../components/MyCustomList'
import { Avatar } from 'react-native-elements';
import { auth, db } from '../firebase';
import { AntDesign,Octicons,Entypo } from '@expo/vector-icons'; 


const HomeScreen = ({navigation}) => {
    const [chats,setChats] = useState([]);
    const onChatEnter = (id,chatName) => {
      navigation.navigate("Chat",{
          id,
          chatName,

      })
    }

  //when pressing the profile icon the user will be signed out
      const signMeOut =() =>{
        auth.signOut().then(() => {
            navigation.replace("Login")
        })
      }
// gives a snapshot of realtime database
      useEffect(()=>{
          const undo = db.collection("chats").onSnapshot(snapshot => (
            setChats(snapshot.docs.map(doc => ({
              id: doc.id,
              data:doc.data()
            })))
          ))
          //cleaning up
          return undo;
      },[])

    useLayoutEffect(()=>{
       navigation.setOptions({
           title: "Back & Forth",
           headerStyle: {backgroundColor:"#603F83FF"},
           headerLeft: () => (
                <View style ={{marginLeft: 5}} >
                  <TouchableOpacity onPress={signMeOut}>
                    <Avatar rounded source = {{uri:auth?.currentUser?.photoURL}} /> 
                    </TouchableOpacity>
                </View>
           ),
           headerRight:() =>(
              <View style = {styles.styleHeaderRight}>
                  <TouchableOpacity activeOpacity={0.5}>
                      <Entypo  onPress ={()=> navigation.navigate("Barcode")} name = "camera" size ={24} color = "#C7D3D4FF"/>
                  </TouchableOpacity>

                  <TouchableOpacity
                  activeOpacity={0.5}
                  onPress ={()=> navigation.navigate("NewChat")}>
                      <Octicons name = "pencil" size ={24} color = "#C7D3D4FF"/>
                  </TouchableOpacity>
              </View>
           )
       })
    },[navigation]);


  return (
    <SafeAreaView style={styles.container}>
     <ScrollView style = {styles.scrollContaier}>
       {chats.map(({id,data:{chatName}})=> (
            <MyCustomList
             key = {id} 
             id ={id}
             chatName = {chatName} 
             onChatEnter = {onChatEnter}
             />
       ))}
   
         </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
   container:{
     flex:1,
     backgroundColor: '#CBC3E3'

   },

   styleHeaderRight: {
     flexDirection: 'row',
     justifyContent: "space-between",
     width: 80,
     marginRight:10,
   },

   scrollContaier:{
      height: "100%"

   }
})