import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

export const usePrompts = () => {
  return useQuery({
    queryKey: ["prompts"],
    queryFn: async () => {
      const { data, error } = await supabase.from("prompts").select("*");

      if (error) {
        throw error;
      }

      return data;
    },
    initialData: [],
  });
};

export const useChildren = () => {
  return useQuery({
    queryKey: ["children"],
    queryFn: async () => {
      const { data, error } = await supabase.from("children").select("*");

      if (error) {
        throw error;
      }

      return data;
    },
    initialData: [],
  });
};


export const useEthnicities = () => {
  return useQuery({
    queryKey: ["ethnicities"],
    queryFn: async () => {
      const { data, error } = await supabase.from("ethnicities").select("*");

      if (error) {
        throw error;
      }

      return data;
    },
    initialData: [],
  });
};

export const useFamilyPlans = () => {
  return useQuery({
    queryKey: ["family_plans"],
    queryFn: async () => {
      const { data, error } = await supabase.from("family_plans").select("*");

      if (error) {
        throw error;
      }

      return data;
    },
    initialData: [],
  });
};

