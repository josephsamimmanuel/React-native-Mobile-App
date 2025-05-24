import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import { images } from "@/constants/images";
import { MovieCard } from "./movieCard";
import { ListHeader } from "./listHeader";
import { getMovies } from "@/services/api";

export default function Index() {
  const [data, setData] = useState([]);
  const fetchMovies = async () => {
    try {
      const data = await getMovies();
      if (data) {
        setData(data);
    }
    } catch (error) {
      return (
        <View className="flex-1 bg-primary justify-center items-center">
          <ActivityIndicator size="large" color="#fff" />
          <Text className="text-white">Error fetching movies</Text>
        </View>
      )
    }
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full h-full z-0" />
      <FlatList
        data={data?.results}
        renderItem={({ item }) => <MovieCard movie={item} />}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={ListHeader}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
