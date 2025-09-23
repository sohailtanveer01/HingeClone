  import { SplashScreen, Stack } from "expo-router";
  import {VideoView} from "expo-video";
  import {cssInterop} from "nativewind";
  import "../../global.css";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import { fonts } from "./constants/fonts";
import { useFonts } from "expo-font";


cssInterop(VideoView, { className: { target: "style" } });
cssInterop(Ionicons, { className: { target: "style" } });


export default function RootLayout() {
  const [loaded, error] = useFonts(fonts);

useEffect(() => {
  if (loaded || error) {
    SplashScreen.hideAsync();
  }
}, [loaded, error]);

if (!loaded && !error) {
  return null;
}
  return (
    <Stack screenOptions={{ headerShown: false }}>
       <Stack.Screen name="(app)" />
 
  </Stack>
  )
}
