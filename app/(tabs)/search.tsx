import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { images } from '@/constants/images'
import { icons } from '@/constants/icons';
import { MovieCard } from './movieCard';
import { SearchBar } from './searchBar';
import { getSearchMovies } from '@/services/api';

interface SearchResponse {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}

const Search = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      const data = await getSearchMovies(query);
      if (data) {
        setData(data);
      } else {
        console.log("Error fetching data");
      }
    } catch (error) {
      console.log("Error fetching data", error);
    }
  }

  // Trigger search when query changes
  useEffect(() => {
    if (query.trim()) {
      setTimeout(() => {
        fetchData();
      }, 1000);
    }
  }, [query]);

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="flex-1 absolute z-0 w-full h-full" resizeMode="cover"/>
      <FlatList
        data={data?.results || []}
        renderItem={({ item }) => <MovieCard movie={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 16 }}
        ListHeaderComponent={
          <>
            <View className="flex-row items-center justify-center mt-10 w-full">
              <Image source={icons.logo} className="w-20 h-20" resizeMode="contain"/>
            </View>
            <View className="flex-row items-center justify-center mt-10 w-full">
              <SearchBar 
                query={query} 
                setQuery={setQuery} 
                placeholder="Search movies..."
              />
            </View>

            {loading && <ActivityIndicator size="large" color="#0000ff" />}
            {error && <Text className="text-white text-center text-2xl">Error: {error.message}</Text>}

            {!loading && !error && query && (!data?.results || data.results.length === 0) && (
              <Text className="text-white text-center text-2xl my-4">
                No movies found for &quot;{query}&quot;
              </Text>
            )}

            {!loading && !error && data?.results && data.results.length > 0 && (
              <Text className="text-white text-center text-2xl my-4">
                Found {data.results.length} movies
              </Text>
            )}
          </>
        }
      />
    </View>
  )
}

export default Search

const styles = StyleSheet.create({})

