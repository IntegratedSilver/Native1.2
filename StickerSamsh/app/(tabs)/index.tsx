import Button from "@/components/Button";
import ImageViewer from "@/components/ImageViewer";
import { View,StyleSheet } from "react-native";

const placeHolderImage = require("../../assets/images/background-image.png")

export default function Index() {
  return (
    <View style={styles.container} >
      <View style={styles.ImageContainer}>
        {/* <Image source={placeHolderImage} style={styles.image}/> */}
        <ImageViewer imgSource={placeHolderImage}/>

      </View>
      <View style={styles.footerContainer}>
      <Button label={"Choose a Photo"} theme="primary"/>
      <Button label={"Use this Photo"}theme="primary"/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: "center",
    justifyContent:"center"

  },
  ImageContainer: {
    flex: 1
  },
  footerContainer: {
    flex: 1/3,
    alignItems:'center',
   
  }
})