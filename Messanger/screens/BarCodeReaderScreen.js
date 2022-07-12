import { StyleSheet, Text, View, Button} from 'react-native'
import React,{useEffect,useState} from  'react'
  import { BarCodeScanner } from 'expo-barcode-scanner'
import { MaterialIcons } from '@expo/vector-icons'; 

const BarCodeReaderScreen = () => {
    const [hasPermission,setPermission] = useState(null);
    const [scanned,setScanned] = useState(false)
    const [text, setText] = useState("Not Yet Scanned")

    const askForCameraPermission = () => {
        (async () => {
            const {status} = await BarCodeScanner.requestPermissionsAsync();
            setPermission(status === "granted")
        })()
    }
    useEffect(()=>{
        askForCameraPermission();
    },[])

    //what happens when we scan the barcode
    const handleBarCodeScanner = ({type, data}) =>{
        setScanned(true);
        setText(data);
        console.log("Type " + type + "\ndata " + data)
    }

    // check permisson and return the screens
      if (hasPermission === null)
      return (
            <View>
            <Text>Requesting CameraScreen</Text>
          </View>
        )

    if (hasPermission === false) {
  return (
    <View>
      <Text style = {{margin: 10}}>No access to camera</Text>
      <Button title = {"Allow Camera"} onPress = {()=> askForCameraPermission()}/>
      
    </View>
  )
    }

    return (
        <View style = {styles.container}> 
        <View style = {styles.barcodeBox}>
        <BarCodeScanner
            onBarCodeScanned={scanned ? undefined :  handleBarCodeScanner}
            style = {{height: 400, width: 400}}/>
        </View>
        <Text style ={styles.mainText}>{text}</Text>
        {scanned && <Button  title={'Scan Again'} onPress = {()=> setScanned(false)}  style = {styles.roundButton1} color = "#603F83FF"/>}
        
      </View>
    )
}

export default BarCodeReaderScreen

const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "#CBC3E3",
            alignItems: "center",
            justifyContent: "center"
        },
        barcodeBox: {
            backgroundColor: "white",
            alignItems: "center",
            justifyContent: "center",
            height: 400,
            width: 400,
            overflow: "hidden",
            borderRadius: 30,
            backgroundColor: "tomato"
        },
        mainText: {
            fontSize: 16,
            margin:20
        },
  

})