import React, { useEffect,useState } from "react";
import { Pressable, StyleSheet,View,Image,Text, TouchableOpacity} from "react-native";
import {Camera} from "expo-camera";
import { MaterialIcons } from '@expo/vector-icons'; 


const CameraScreen = ({navigation}) => {
    
    const [hasPermission, setHasPermission] = useState(null);
    const getPermission = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission (status === "granted");

   }; 
   useEffect(()=>{
    navigation.setOptions({
        
            headerTitle: () => (
                <TouchableOpacity>
                <MaterialIcons name="monochrome-photos" size={50} color="grey" />
                </TouchableOpacity>
              )

    })

},)

let camera;
const getPicture = async () => {
if (camera) {
    let photo = await camera.takePictureAsync();
    navigation.navigate("Photo", {uri: photo.uri});
           }
}
  

   useEffect (()=>{
       getPermission();

   },[])
   if (hasPermission === null) {
    return <Text> Awaiting Permission </Text>
}
if (hasPermission === false) {
    return <Text> Access Denied! </Text>
}
 
    return(
        <View style= {styles.container}>
            <Camera style = {styles.subContainer}  ref = {(ref)=>{camera=ref}}>  
                <Pressable style = {styles.buttonStyle} onPress = {()=> {
                     getPicture()
                }}>
                   <MaterialIcons name="motion-photos-on" size={100} color="white" />
                </Pressable>
            </Camera>
        </View>
    )
    
}




const styles = StyleSheet.create({
        container: {

            flex: 1,
        },
        subContainer: {

            flex: 1,
            backgroundColor: "transparent",
            flexDirection: "row-reverse",
            alignItems: "flex-end",
        },
        buttonStyle: {

            flex: 1,
            alignItems: "center",
            
           
        },
      



});
export default CameraScreen;