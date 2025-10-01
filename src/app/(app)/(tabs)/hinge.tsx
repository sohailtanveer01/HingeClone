import { View, Text, Button, SafeAreaView } from 'react-native'
import React from 'react'
import { supabase } from '@/lib/supabase'
import { Link, router, Stack } from 'expo-router'
import { useMyProfile } from '@/api/my-profile'
import { Ionicons } from '@expo/vector-icons'
import HingeLogo from "~/assets/images/hinge-logo.svg";
import { Card } from '../../../components/card'
import { Pressable } from 'react-native'
import { Image } from 'expo-image'
const hinge = () => {
  const { data: profile } = useMyProfile()
  const onLogout = async () => {
    await supabase.auth.signOut()
    router.replace('/(auth)/signin')
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <View className="px-5 border-b border-neutral-300">
        <View className="flex-row items-center justify-between">
          <HingeLogo width={64} />
          <View className="flex-row items-center gap-4">
            {/* <Link href={"/preferences"} suppressHighlighting>
              <Ionicons name="options-outline" className="text-2xl" />
            </Link> */}
            <Link href={"/settings"} suppressHighlighting>
              <Ionicons name="settings-outline" className="text-2xl" />
            </Link>
          </View>
        </View>
        <View className="items-center gap-2 my-12">
          <Pressable
            className="h-32 aspect-square rounded-full border-4 border-fuchsia-900 p-1"
            onPress={() => router.push("/profile")}
          >
            <Image
              source={profile?.avatar_url}
              className="flex-1 rounded-full bg-neutral-400"
            />
          </Pressable>
          <Text className="text-2xl font-poppins-semibold">
            {profile?.first_name}
          </Text>
        </View>
      </View>
      <View className="flex-1 p-5 gap-4">
        <Card
          key={"help"}
          icon={<Ionicons name="help" className="text-2xl" />}
          title="Help Center"
          subtitle="Safety, Security, and more"
        />
        <Card
          key={"what-works"}
          icon={<Ionicons name="bulb-outline" className="text-2xl" />}
          title="What Works"
          subtitle="Check out our expert dating tips"
        />
      </View>
    </SafeAreaView> 
  )
}

export default hinge