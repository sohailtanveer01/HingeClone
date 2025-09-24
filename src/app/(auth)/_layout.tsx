import { useAuth } from "@/store/auth";
import { Redirect, Stack } from "expo-router";
import React from "react";

const _layout = () => {
  const { session } = useAuth();
  if (session) {
    return <Redirect href="/(app)/(tabs)" />
  }
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="signin" />
      <Stack.Screen name="phone" />
      <Stack.Screen name="otp" />
    </Stack>
  )
}

export default _layout