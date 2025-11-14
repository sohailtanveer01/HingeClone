import { PrivateProfile } from "@/api/my-profile/types";

export const identity = [
  {
    title: "Gender",
    getValue: (profile: PrivateProfile) => {
      return profile?.gender?.name || "None";
    },
    route: "/profile/gender",
  },
  {
    title: "Sexuality",
    getValue: (profile: PrivateProfile) => {
      return profile?.sexuality?.name || "None";
    },
    route: "/profile/sexuality",
  },
];
