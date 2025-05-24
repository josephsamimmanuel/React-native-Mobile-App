import React from 'react';
import { getMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { Link } from "expo-router";
import { Image, Text, View } from "react-native";

const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating / 2);
    const halfStar = rating % 2 >= 1;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    return (
      <>
        {'★'.repeat(fullStars)}
        {halfStar ? '✬' : ''}
        {'☆'.repeat(emptyStars)}
      </>
    );
};

export const MovieCard = ({ movie }: { movie: any }) => {
    return (
      <Link href={`/movies/${movie.id}`} className="w-full">
        <View className="flex-row items-center rounded-lg p-4 mb-2">
          <Image 
            source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}` }} 
            className="w-24 h-36 rounded-lg"
            resizeMode="cover"
          />
          <View className="flex-1 ml-4">
            <Text className="text-white text-lg font-bold mb-1" numberOfLines={2}>
              {movie.title}
            </Text>
            <Text className="text-gray-300 text-sm mb-2">
              {movie.release_date}
            </Text>
            <View className="flex-row items-center gap-2">
              <Text className="text-yellow-400 text-sm">
                {renderStars(movie.vote_average)} ({movie.vote_average.toFixed(1)})
              </Text>
              <Text className="text-black text-sm bg-green-500 rounded-lg px-2 py-1">
                {movie.original_language.toUpperCase()}
              </Text>
            </View>
          </View>
        </View>
      </Link>
    );
}