import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
 <Tabs>
     <Tabs.Screen name="index" options={{
       headerTitle: "Sticker Smash",
       
       
     }}/>
     <Tabs.Screen name="about" options={{
       headerTitle: "About"
     }}/>
     <Tabs.Screen name="+not-found"/>
   </Tabs>
  )
 }

const styles = StyleSheet.create({})