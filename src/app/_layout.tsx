  import { SplashScreen, Stack } from "expo-router";
  import {VideoView} from "expo-video";
  import {cssInterop} from "nativewind";
  import "../../global.css";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import { fonts } from "../constants/fonts";
import { useFonts } from "expo-font";
import { supabase } from "../lib/supabase";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "../store/auth";
import { Image } from "expo-image";

const queryClient = new QueryClient();

cssInterop(VideoView, { className: { target: "style" } });
cssInterop(Ionicons, { className: { target: "style" } });
cssInterop(Image, { className: { target: "style" } });
SplashScreen.preventAutoHideAsync();


export default function RootLayout() {
  const [loaded, error] = useFonts(fonts);
supabase.from('children').select('id').then(
    ({data, error}) => {if(data) console.log(data);
  if(error) console.log(error);
  }
)


useEffect(() => {
  if (loaded || error) {
    SplashScreen.hideAsync();
  }
}, [loaded, error]);

if (!loaded && !error) {
  return null;
}
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
         <Stack.Screen name="(app)" options={{
                animation: "none",
              }} />
         <Stack.Screen
              name="(auth)"
              options={{
                animation: "none",
              }}
            />
        </Stack>
       
      </AuthProvider>
    
    </QueryClientProvider>

  )
}
