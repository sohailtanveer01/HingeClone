import { Tabs } from "expo-router";
import React, { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useMyProfile } from "../../../api/my-profile";
import { useConnection } from "@sendbird/uikit-react-native";
import { View } from "react-native";
import { cn } from "@/utils/cn";
import { Image } from "expo-image";
import colors from "tailwindcss/colors";

const _layout = () => {
  const { data: profile } = useMyProfile();
  const { connect } = useConnection();

  useEffect(() => {
    if (profile) {
      connect(profile.id, { nickname: profile.first_name || undefined });
    }
  }, [profile, connect]);
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.neutral[950],
        },
        tabBarActiveTintColor: colors.white,
        tabBarInactiveTintColor: colors.neutral[500],
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="likes"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="matches"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbox-outline" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="hinge"
        options={{
          tabBarIcon: ({ color, size, focused }) =>
            profile && profile.avatar_url ? (
              <View
                style={{
                  width: size,
                  height: size,
                }}
                className={cn(
                  focused && "border border-white rounded-full p-0.5"
                )}
              >
                <Image
                  source={profile.avatar_url}
                  className="flex-1 aspect-square rounded-full bg-neutral-200"
                />
              </View>
            ) : (
              <Ionicons name="person-circle" color={color} size={size} />
            ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
