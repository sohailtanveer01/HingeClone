import { useSignOut } from '@/api/auth'
import { View, Text } from 'react-native'
import React from 'react'

const index = () => {
  const {mutate} = useSignOut()
  return (
    <View>
      <Text onPress={() => mutate()}>index</Text>
    </View>
  )
}

export default index