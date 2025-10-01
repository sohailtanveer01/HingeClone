import { useMyProfile, useUpdateProfile } from "@/api/my-profile";
import { StackHeaderV3 } from "@/components/stack-header-v3";
import { MaterialTopTabs } from "@/layouts/material-top-tabs";
// import { useEdit } from "../../../../store/edit";
import { router, Stack } from "expo-router";
// import { isEqual } from "lodash";
import { Alert } from "react-native";
import colors from "tailwindcss/colors";

export default function Layout() {
  const { data: profile } = useMyProfile();
//   const { edits, setEdits, gridActive } = useEdit();
  const { mutate } = useUpdateProfile();

  const handlePressCancel = async () => {
    router.dismiss();
    // if (isEqual(profile, edits)) {
    //   router.dismiss();
    //   return;
    // }

    // Alert.alert(
    //   "Discard Changes",
    //   "Are you sure you want to discard your changes?",
    //   [
    //     {
    //       text: "Cancel",
    //       style: "cancel",
    //     },
    //     {
    //       text: "Discard",
    //       onPress: () => {
    //         setEdits(profile);
    //         router.dismiss();
    //       },
    //     },
    //   ]
    // );
  };

  const handlePresDone = async () => {
    router.dismiss();
    // if (!edits) {
    //   Alert.alert("Error", "Something went wrong, please try again later");
    //   return;
    // }

    // if (isEqual(profile, edits)) {
    //   router.dismiss();
    //   return;
    // }

    // mutate(edits, {
    //   onSuccess: () => {
    //     router.dismiss();
    //   },
    //   onError: () => {
    //     Alert.alert("Error", "Something went wrong, please try again later");
    //   },
    // });
  };
  return (
    <>
      <StackHeaderV3
        title={profile?.first_name || ""}
        onPressCancel={handlePressCancel}
        onPressDone={handlePresDone}
      />
      <MaterialTopTabs
        screenOptions={{
          tabBarIndicatorStyle: {
            backgroundColor: colors.fuchsia[900],
          },
          tabBarLabelStyle: {
            textTransform: "capitalize",
            fontWeight: "bold",
            fontSize: 13,
          },
          tabBarActiveTintColor: colors.fuchsia[900],
          tabBarInactiveTintColor: colors.neutral[300],
          swipeEnabled: false,
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "Edit",
          }}
        />
        <Stack.Screen
          name="view"
          options={{
            title: "View",
          }}
        />
      </MaterialTopTabs>
    </>
  );
}