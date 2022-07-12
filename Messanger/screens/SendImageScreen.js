import { StyleSheet, Text, View, Button, Alert,Image, ActivityIndicator} from 'react-native'
import React,{useState, useEffect} from 'react'
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase/compat/app';
import {firebaseConfig} from  '../firebase';

const SendImageScreen = ({}) => {
    

  
    const [image, setImage]  = useState("");
    const [uploading,setUploading] = useState(false);
    // requesting user persmission
    useEffect(()=>{
        (async()=>{
            if(Platform.OS !=="web"){
                const{status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if(status !== "granted") {
                    alert("Sorry, we need camera roll permission to make this work");
                }
            }
        })();
    }, [])

    const pickImage = async()=>{
        let result = await ImagePicker.launchImageLibraryAsync ({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            quality: 1,
        });

        if(!result.cancelled){
            setImage(result.uri);
        }
    }
    
    const uploadImage = async(image) =>{
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function() {
                resolve(xhr.response);
            };
            xhr.onerror = function() {
                reject(new TypeError ("Network request failed"));
            }
            xhr.responseType = "blob";
            xhr.open("GET", image, true);
            xhr.send(null);
        });


        const ref = firebase.storage.ref().child(new Date().toISOString())
        const snapshot = ref.put(blob);

        snapshot.on(firebase.storage.TaskEvent.STATE_CHANGED,()=>{
                setUploading(true)
        },
        (error)=>{
            setUploading(false)
            console.log(error)
            blob.close()
            return
        },
        ()=>{
            snapshot.snapshot.ref.getDownloadURL().then((url) =>{
                setUploading(false);
                console.log("download url ", url);
                blob.close();
                return url;
            })
        }
        )
    }
      
  return (
    <View style = {styles.container}>
            <Image source ={{uri:image}} style = {{width:300,height:300}}/>
           <Button title = "Choose Image..." onPress={pickImage}  />
          {!uploading? <Button title = "Upload..." onPress={uploadImage} />:<ActivityIndicator size = "large" color = "red"/>}
           
    </View>
  )
}

export default SendImageScreen

const styles = StyleSheet.create({

    container: {
        flex:1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor:"#CBC3E3"
    },
    imageContainer:{
        marginTop:50,
        borderWidth:1,
        borderColor: "#603F83FF",
        width: "80%",
        height: 400
    }
})