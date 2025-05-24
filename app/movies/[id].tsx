import { ActivityIndicator, Image, ScrollView, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { getMovieDetails } from '@/services/api'

const MovieDetails = () => {
  const { id } = useLocalSearchParams()
  const [movieDetails, setMovieDetails] = useState(null);

  const fetchMovieDetails = async () => {
    try {
      const data = await getMovieDetails(id as string);
      if (data) {
        setMovieDetails(data);
      } else {
        console.log("Error fetching movie details");
      }
    } catch (error) {
      console.log("Error fetching movie details", error);
    }
  }

  useEffect(() => {
    fetchMovieDetails();
  }, []);

  if (!movieDetails) {
    return (
      <View className="flex-1 bg-gray-900 justify-center items-center">
        <ActivityIndicator size="large" color="#fff" />
        <Text className="text-white text-lg">Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-900">
      <StatusBar style="light" />
      
      {/* Hero Section */}
      <View className="relative">
        <Image 
          source={{ uri: `https://image.tmdb.org/t/p/original/${movieDetails?.backdrop_path}` }} 
          className="w-full h-96"
          resizeMode="cover"
        />
        <View className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900" />
        
        {/* Movie Info Overlay */}
        <View className="absolute bottom-0 left-0 right-0 p-6">
          <Text className="text-white text-4xl font-bold mb-2">{movieDetails?.title}</Text>
          <Text className="text-gray-300 text-lg italic mb-4">{movieDetails?.tagline}</Text>
          <View className="flex-row items-center gap-4">
            <View className="bg-yellow-500 px-3 py-1 rounded-full">
              <Text className="text-black font-bold">{movieDetails?.vote_average.toFixed(1)}</Text>
            </View>
            <Text className="text-gray-300">{movieDetails?.runtime} min</Text>
          </View>
        </View>
      </View>

      {/* Content Section */}
      <View className="p-6">
        {/* Overview */}
        <View className="mb-6">
          <Text className="text-white text-xl font-bold mb-2">Overview</Text>
          <Text className="text-gray-300 text-base leading-6">{movieDetails?.overview}</Text>
        </View>

        {/* Details Grid */}
        <View className="bg-gray-800 rounded-xl p-4">
          <View className="flex-row justify-between items-center border-b border-gray-700 pb-3 mb-3">
            <Text className="text-gray-400">Status</Text>
            <Text className="text-white font-medium">{movieDetails?.status}</Text>
          </View>
          
          <View className="flex-row justify-between items-center border-b border-gray-700 pb-3 mb-3">
            <Text className="text-gray-400">Original Language</Text>
            <Text className="text-white font-medium uppercase">{movieDetails?.original_language}</Text>
          </View>

          <View className="flex-row justify-between items-center border-b border-gray-700 pb-3 mb-3">
            <Text className="text-gray-400">Release Date</Text>
            <Text className="text-white font-medium">{movieDetails?.release_date}</Text>
          </View>
          
          <View className="flex-row justify-between items-center border-b border-gray-700 pb-3 mb-3">
            <Text className="text-gray-400">Budget</Text>
            <Text className="text-white font-medium">
              ${movieDetails?.budget?.toLocaleString() || 'N/A'}
            </Text>
          </View>
          
          <View className="flex-row justify-between items-center">
            <Text className="text-gray-400">Revenue</Text>
            <Text className="text-white font-medium">
              ${movieDetails?.revenue?.toLocaleString() || 'N/A'}
            </Text>
          </View>
        </View>

        {/* Genres */}
        {movieDetails?.genres && movieDetails.genres.length > 0 && (
          <View className="mt-6">
            <Text className="text-white text-xl font-bold mb-3">Genres</Text>
            <View className="flex-row flex-wrap gap-2">
              {movieDetails.genres.map((genre: any) => (
                <View key={genre.id} className="bg-blue-500 px-3 py-1 rounded-full">
                  <Text className="text-white">{genre.name}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  )
}

export default MovieDetails