import CategoryScroll from "@/components/CategoryScroll";
import CustomButton from "@/components/CustomButton";
import InputField from "@/components/Form/InputField";
import { useFetch } from "@/lib/fetch";
import { SignedIn, useUser } from "@clerk/clerk-expo";
import { MapPinned, Search, Settings2 } from "lib/icons";
import { useState, useEffect } from "react";
import { FlatList, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Location from 'expo-location';


const FavListings = () => {
	// Temporary data for location implementation

	const [location, setLocation] = useState({
		city: '',
		region: '',
		country: '',
		latitude: '',
		longitude: '',
	});

	const address = `${location.city}, ${location.region}, ${location.country}`;

	const capitalizeFirstLetter = (string: string) => {
		return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
	};

	const handleLocationSearch = async (address: string) => {
		if (!location.city || !location.region || !location.country) {
			alert('Please enter a valid city, region, and country');
			return;
		}
	
		const formattedAddress = `${capitalizeFirstLetter(location.city)}, ${capitalizeFirstLetter(location.region)}, ${capitalizeFirstLetter(location.country)}`;

		try {
			const results = await Location.geocodeAsync(formattedAddress);
			if (results.length > 0) {
				const { latitude, longitude } = results[0];
				console.log(`Geocoded Location: Latitude: ${latitude}, Longitude: ${longitude}`);
				setLocation((prev) => ({
					...prev,
					latitude: latitude.toString(),
					longitude: longitude.toString(),
				}));
			} else {
				console.log('No results found, verify address');
			}
		} catch (error) {
			console.error('Error fetching location data:', error);
			console.log('Failed to fetch location data. Please try again.');
		}
	}
	
    return (
        <SafeAreaView className="bg-white flex-1 p-4">
            
            <InputField
				label="City"
				className="mb-4"
				value={location.city}
				onChangeText={(text) => setLocation((prev) => ({ ...prev, city: text }))}
		
			/>
			<InputField
				label="Province/State"
				className="mb-4"
				value={location.region}
				onChangeText={(text) => setLocation((prev) => ({ ...prev, region: text }))}
			/>
			<InputField
				label="Country"
				className="mb-4"
				value={location.country}
				onChangeText={(text) => setLocation((prev) => ({ ...prev, country: text }))}
			/>
			<CustomButton title="Input Location" className="mt-4" onPress={() => handleLocationSearch(address)}/>


			<Text>PLace: {location.city}</Text>
			<Text>Region: {location.region}</Text>
			<Text>Country: {location.country}</Text>


			<Text>API location:</Text>
			<Text>{address}</Text>

			<Text>API Longitude and Latitude:</Text>
			<Text>Latitude: {location.latitude}</Text>
			<Text>Longitude: {location.longitude}</Text>

        </SafeAreaView>
    );
};


export default FavListings;

