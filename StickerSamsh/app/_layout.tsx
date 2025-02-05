import { Stack, Tabs } from "expo-router";
import { LogBox } from "react-native";

LogBox.ignoreAllLogs(true)
export default function RootLayout() {
  return <Stack>
    <Stack.Screen name="(tabs)" options={{
      headerTitle: "Sticker Smash",
      headerShown:false
      
      
      
    }}/>
    <Stack.Screen name="+not-found"/>
  </Stack>;
}
