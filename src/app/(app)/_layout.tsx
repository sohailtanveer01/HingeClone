import { useAuth } from '@/store/auth';
import { Redirect } from 'expo-router'
import { Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
    const { session, isLoading } = useAuth();
    if (isLoading) {
        return <Text>Loading...</Text>
    }
    if (!session) {
        return <Redirect href="/signin" />
    }
   
  return (
   <Stack screenOptions={{ headerShown: false }}>
   </Stack>
  )
}

export default _layout