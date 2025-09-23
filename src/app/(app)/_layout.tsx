import { Redirect } from 'expo-router'
import React from 'react'

const _layout = () => {
    return <Redirect href="/signin" /> 
//   return (
//    <Stack screenOptions={{ headerShown: false }}>
//    </Stack>
//   )
}

export default _layout