import { Tabs } from "expo-router";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
const _layout = () => {
  return (
    <Tabs
    screenOptions={{
        tabBarStyle: {
            backgroundColor: "#0a0a0a",
        },
        tabBarActiveTintColor: "#fff",
        tabBarShowLabel: false,
        tabBarInactiveTintColor: "#888",
        tabBarLabelStyle: {
            fontSize: 12,
        }
    }}
    >
         <Tabs.Screen name="index" options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="home" color={color} size={size} />
        ),
      }} />
     
      <Tabs.Screen name="likes" options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="heart" color={color} size={size} />
        ),
      }} />
      <Tabs.Screen name="matches" options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="chatbox-outline" color={color} size={size} />
        ),
      }} />
     

    <Tabs.Screen name="hinge" options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="person-circle" color={color} size={size} />
        ),
      }} />
    </Tabs>
  )
}

export default _layout