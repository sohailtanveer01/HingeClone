import { View, Text, Button } from 'react-native'
import React from 'react'
import { supabase } from '@/lib/supabase'
import { Link, router } from 'expo-router'
import { useMyProfile } from '@/api/my-profile'
const hinge = () => {
  const { data: profile } = useMyProfile()
  const onLogout = async () => {
    await supabase.auth.signOut()
    router.replace('/(auth)/signin')
  }

  return (
    <View>
      <Text>hinge</Text>
      <Text>{profile?.first_name} {profile?.last_name}</Text>
      <Text>{profile?.avatar_url}</Text>
      <Button title="Logout" onPress={onLogout} />
    </View>
  )
}

export default hinge