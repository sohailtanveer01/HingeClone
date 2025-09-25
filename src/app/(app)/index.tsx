import { useMyProfile } from "@/api/my-profile";
import {
  useChildren,
  useEthnicities,
  useFamilyPlans,
 
  usePrompts,
  
} from "@/api/options";
import { Redirect } from "expo-router";
import { ActivityIndicator, Text, View } from "react-native";

export default function Page() {
  const { isPending, isError } = useMyProfile();

  usePrompts();
  useChildren();
  useEthnicities();
  useFamilyPlans();


  if (isPending) {
    return (
      <View className="flex-1 bg-white items-center justify-center">
        <ActivityIndicator size={"small"} />
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 bg-white items-center justify-center">
        <Text>Something went wrong.</Text>
      </View>
    );
  }
  // if(data)
  //   return (
  //     <View className="flex-1 bg-white items-center justify-center">
  //       <Text>{data.first_name} {data.last_name}</Text>
  //     </View>
  //   );
  

  return <Redirect href={"/(app)/(tabs)"} />;
}