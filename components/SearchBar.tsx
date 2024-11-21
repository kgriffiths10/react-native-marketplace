import React, { useState } from 'react';
import { TextInput, TouchableOpacity, Text, View } from 'react-native';

interface SearchBarProps {
  onSearch: (query: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchBar = ({ onSearch, searchQuery, setSearchQuery }: SearchBarProps) => {
  const handleSearchSubmit = () => {
    onSearch(searchQuery);
  };

  return (
    <View className="flex flex-row items-center justify-between p-4">
      <TextInput
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search"
        onSubmitEditing={handleSearchSubmit} // This triggers search on return press
        returnKeyType="search" // Change the return key to "Search"
        className="flex-1 border border-neutral-500 rounded p-2"
      />

      <TouchableOpacity
        onPress={handleSearchSubmit}
        className="ml-4 p-2 bg-neutral-800 rounded-full"
      >
        <Text className="text-white">Search</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
