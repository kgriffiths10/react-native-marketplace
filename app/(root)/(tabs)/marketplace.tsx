import React, { useState, useCallback, useRef } from 'react';
import {
	Dimensions,
	FlatList,
	Keyboard,
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SignedIn, useUser } from '@clerk/clerk-expo';
import WelcomeMessage from '@/components/WelcomeMessage';
import CategoryScroll from '@/components/CategoryScroll';
import { useFetch } from '@/lib/fetch';
import { ChevronLeft, Locate, MapPin, Search, Settings2 } from 'lucide-react-native';

interface Listing {
	listing_id: string;
	user_id: string;
	title: string;
	price: number;
	description: string;
	status: string;
	category_id: number;
	created_at: string;
	is_trade: boolean;
	image_paths: string[];
	listing_views: number;
	featured: number;
	condition: string;
	location: string;
	category_name: string;
	first_name: string;
	last_name: string;
}

const Marketplace = () => {
	const { user } = useUser();
	const clerkID = user?.id;

	// State for selected category and search query
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [searching, setSearching] = useState<boolean>(false);

	const { data: listings, loading, error } = useFetch<Listing[]>('/(api)/listings');


	// Filter listings based on search query
	const searchResults =
		searchQuery.trim() !== ''
		? listings?.filter((listing) =>
			listing.title.toLowerCase().includes(searchQuery.toLowerCase())
			) || []
		: [];

	// Filter listings based on selected category
	const filteredListings =
		selectedCategory
		? listings?.filter((listing) => listing.category_name === selectedCategory) || []
		: [];


	const handleSearch = () => {
		setSearching(true);
		Keyboard.dismiss(); 
	}


	// JSX for conditional rendering
	let content;
	if (loading) {
		content = <Text>Loading...</Text>;
	} else if (error) {
		content = <Text>Error fetching listings</Text>;
	} else if (searching) {
		content = (
			<FlatList
				data={searchResults}
				renderItem={({ item }) => (
					<View className="mb-8 flex flex-1">
						<View className="h-64 bg-neutral-200 rounded-xl"></View>
						<View className="flex flex-row justify-between mt-2">
							<Text className="text-md font-PoppinsMedium text-neutral-800">{item.title}</Text>
							<Text className="text-md font-PoppinsMedium text-neutral-800">${item.price}</Text>
						</View>
						<Text className="text-sm font-PoppinsRegular text-neutral-500">{item.location}</Text>
						<Text className="text-sm font-PoppinsRegular text-neutral-500">
							Sold by {item.first_name} {item.last_name}
						</Text>
					</View>
				)}
				keyExtractor={(item) => item.listing_id}
				className="bg-neutral-100"
				showsVerticalScrollIndicator={false}
				ListFooterComponent={<View className="h-32"></View>}
				ListHeaderComponent={
					<View className='flex flex-row mb-4'>
						{/* Back button when searching */}
						<TouchableOpacity
						onPress={() => {
							setSearching(false);
							setSearchQuery('');
						}}
						className="rounded-full justify-center mr-2"
						>
							<ChevronLeft size={24} strokeWidth={2} className="text-neutral-900" />
						</TouchableOpacity>
						{/* Search Results header */}
						<Text className="text-lg font-PoppinsSemiBold text-neutral-800">
							Search Results ({searchResults.length})
						</Text>
					</View>
				}
			/>
		);
	} else if (selectedCategory) {
		content = (
			<FlatList
				data={filteredListings}
				renderItem={({ item }) => (
					<View className="mb-8 flex flex-1">
						<View className="h-64 bg-neutral-200 rounded-xl"></View>
						<View className="flex flex-row justify-between mt-2">
							<Text className="text-md font-PoppinsMedium text-neutral-800">{item.title}</Text>
							<Text className="text-md font-PoppinsMedium text-neutral-800">${item.price}</Text>
						</View>
						<Text className="text-sm font-PoppinsRegular text-neutral-500">{item.location}</Text>
						<Text className="text-sm font-PoppinsRegular text-neutral-500">
							Sold by {item.first_name} {item.last_name}
						</Text>
					</View>
				)}
				keyExtractor={(item) => item.listing_id}
				className="bg-neutral-100"
				showsVerticalScrollIndicator={false}
				ListFooterComponent={<View className="h-32"></View>}
				ListHeaderComponent={
					<Text className="text-lg font-PoppinsSemiBold text-neutral-800 mb-4">
					{selectedCategory} ({filteredListings?.length})
					</Text>
				}
			/>
		);
	} else {
		content = <Text>No listings found. Search or select a category</Text>;
	}



	return (
		<View className="bg-neutral-100 flex-1 p-4">

			<SafeAreaView>

				<SignedIn>
					<WelcomeMessage clerkID={clerkID || ''} />
				</SignedIn>
				
				<View className='flex flex-row gap-4'>
					{/* Search Bar */}
					<View className='flex flex-row flex-1 border-neutral-300 border rounded-full align-center justify-start p-3 '>
						<Search className='text-neutral-800 w-12 h-12 mr-4' />
						<TextInput 
							placeholder='Search Listings' 
							className='text-neutral-800 w-full'
							value={searchQuery}
							onChangeText={setSearchQuery}
							onSubmitEditing={handleSearch}
						>
						</TextInput>
					</View>
					{/* Filter Button */}
					<TouchableOpacity className='border-neutral-300 border rounded-full align-center justify-center p-3'>
						<Settings2 className='text-neutral-800 w-12 h-12'></Settings2>
					</TouchableOpacity>	
				</View>

				{/* Ad an Category Scroller */}
				<View className="rounded-t-3xl bg-neutral-100 mt-8">
					{/* Hide category scroller when searching */}
					{!searching && selectedCategory === null && (
					<View className="mb-4 w-full bg-primary-400 h-16 rounded-xl items-center justify-center">
						<Text>This is an ad spot</Text>
					</View>
					)}

					{/* Category scroller */}
					{!searching && (
						<CategoryScroll onCategorySelect={setSelectedCategory} />
					)}
				</View>
			</SafeAreaView>
			{content}
		</View>
	);
};

export default Marketplace;


			