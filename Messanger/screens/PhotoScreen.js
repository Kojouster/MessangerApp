import React,{useEffect} from "react";
import { StyleSheet,View, Image,Pressable,Button} from "react-native";
import { Foundation } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 



const PhotoScreen = ({navigation,route}) => {

    useEffect(()=>{
        navigation.setOptions({
            headerTitle: () => (
               
                   <Foundation  name="photo" size={50} color="grey" />
            
                ),
                headerRight: () => (
                    <Pressable onPress = {() => navigation.navigate("Home")}>
                              <MaterialCommunityIcons name="home-edit-outline" size={35} color="grey" />
                    </Pressable>
                  )
              
    
        })
    
    },)
    const { uri } = route.params;
        return(

            <View style = {styles.container}>
                <Image style = {styles.imageStyle} source = {{ uri: uri}}/>   
            </View>
        )
}

const styles = StyleSheet.create({
        container: {
            flex:1
        },
        imageStyle: {
            flex: 1,
            alignSelf: "stretch",
        }

});

export default PhotoScreen;