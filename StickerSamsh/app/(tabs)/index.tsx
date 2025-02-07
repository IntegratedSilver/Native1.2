import { Link } from "expo-router";
import { Text, View, StyleSheet } from "react-native";
import { type ImageSource } from "expo-image";
import ImageViewer from "@/components/ImageViewer";
import Button from "@/components/Button";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useRef, useState } from "react";
import IconButton from "@/components/IconButton";
import CircleButton from "@/components/CircleButton";
import EmojiPicker from "@/components/EmojiPicker";
import EmojiList from "@/components/EmojiList";
import EmojiSticker from "@/components/EmojiSticker";
import * as MediaLibrary from 'expo-media-library'
import { captureRef } from "react-native-view-shot";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { requestPermissionsAsync } from "expo-media-library";


const placeHolderImage = require("../../assets/images/background-image.png");

export default function Index() {

  const imageRef = useRef<View>(null)

  const [permissionResponse, requestPermission] = MediaLibrary. usePermissions();

  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );

  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const [pickedEmoji, setPickedEmoji] = useState<ImageSource | undefined>(undefined)

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
      console.log(result);
    } else {
      alert("You did not select an image");
    }
  };

  const onReset = () => {
    setShowAppOptions(false)
  }

  const onAddSticker = () => {
   setIsModalVisible(true)
  }

  const onSaveImageAsync = async () => {
    try{
      const localUri = await captureRef(imageRef,{
        height:440,
        quality:1
      })
      await MediaLibrary.saveToLibraryAsync(localUri)
      if(localUri){
        alert("Saved!")
      }
    } catch(error){
      console.log(error)
      alert("Hey! Something went wrong.")
    }
  }


  const onModalClose = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    if(!permissionResponse?.granted){
      requestPermissionsAsync();
    }
  }, [])
  

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
      <View ref={imageRef} collapsable={false}>
        <ImageViewer imgSource={selectedImage || placeHolderImage} />
        {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji}/>}
      </View>
      </View>
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
              <IconButton icon="refresh" label="Reset" onPress={onReset}/>
              <CircleButton onPress={onAddSticker}/>
              <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync}/>
          </View>

        </View>
   
      ) : (
        <View style={styles.footerContainer}>
          <Button
            onPress={pickImageAsync}
            label="Choose a photo"
            theme="primary"
          />
          <Button label="Use this photo" onPress={() => setShowAppOptions(true)} />
        </View>
      )}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose}/>
      </EmojiPicker>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
  imageContainer: {
    flex: 1,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
  optionsContainer: {
    position:'absolute',
    bottom: 80
  },
   optionsRow: {
    alignItems:"center",
    flexDirection:'row'
   }
});