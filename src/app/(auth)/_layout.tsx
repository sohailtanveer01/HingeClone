import { Stack } from "expo-router";
import React from "react";

const _layout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="signin" />
      <Stack.Screen name="phone" />
      <Stack.Screen name="otp" />
    </Stack>
  )
}

export default _layout