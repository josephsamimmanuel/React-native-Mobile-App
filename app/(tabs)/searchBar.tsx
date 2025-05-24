import { Image, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { icons } from '@/constants/icons'

interface SearchBarProps {
    placeholder: string;
    query: string;
    setQuery: (query: string) => void;
    onPress: () => void;
}

export const SearchBar = ({ placeholder, query, setQuery, onPress, editable }: SearchBarProps) => {
    return (
        <TouchableOpacity onPress={onPress} className="flex-row items-center bg-white/20 rounded-full px-4 py-2 w-[90%]">
            <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
            <TextInput
                className="flex-1 text-white ml-2"
                placeholder={placeholder}
                placeholderTextColor="#9CA3AF"
                value={query}
                onChangeText={setQuery}
                returnKeyType="search"
                editable={editable}
            />
        </TouchableOpacity>
    )
}
