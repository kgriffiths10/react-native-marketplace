
import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Search } from 'lucide-react-native'

const SearchBar = () => {

    return (
        <View className='flex flex-row items-center bg-neutral-700 rounded-full p-4'>
            <Search className='text-gray-100 mr-4' />
            <TextInput className='text-gray-100' placeholder='Search the marketplace'> </TextInput>
        </View>
    )
}

export default SearchBar