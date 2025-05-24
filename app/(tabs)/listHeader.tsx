import { Image, Text, TextInput, View } from "react-native";
import { icons } from "@/constants/icons";
import { useRouter } from "expo-router";
import React from "react";
import { SearchBar } from "./searchBar";

export const ListHeader = () => {
  const router = useRouter();
  return (
    <View className="px-5">
      <Image source={icons.logo} className="w-12 h-12 mt-10 mb-5 mx-auto" />
      <Text className="text-white text-2xl font-bold text-center mb-4">MovieFlix</Text>
      <View className="flex-row justify-center items-center gap-2 mb-4">
        <SearchBar editable={false} placeholder="Search for a movie" placeholderTextColor="gray" onPress={() => router.push("/search")}/>
      </View>
      <Text className="text-white text-2xl font-bold mb-4">Latest Movies</Text>
    </View>
  )
}