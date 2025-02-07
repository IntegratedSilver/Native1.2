import { Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { PropsWithChildren } from 'react'
import { MaterialIcons } from '@expo/vector-icons';

type Props = PropsWithChildren<{
    isVisible: boolean;
    onClose: () => void;
}>

export default function EmojiPicker({isVisible, onClose,children}:Props) {
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
        <View style={styles.modalContent}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Choose a Sticker</Text>
                <Pressable onPress={onClose}>
                    <MaterialIcons name='close' color={"#fff"} size={22}  />
                </Pressable>
            </View>
            {children}
        </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
    modalContent: {
        height:'25%',
        width:"100%",
        backgroundColor:'#29252e',
        borderTopRightRadius:18,
        borderTopLeftRadius:18,
        position:'absolute',
        bottom:0,
    },
    titleContainer: {
        height:'16%',
        backgroundColor:"#464C55",
        borderTopRightRadius:10,
        borderTopLeftRadius:10,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'

    },
    title: {
        color:'#fff',
        fontSize:16
    }
})