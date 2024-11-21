import React, { useState } from 'react';
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
import { ChevronLeft, Locate, MapPin, Search } from 'lucide-react-native';

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
}

const Marketplace = () => {
	const { user } = useUser();
	const clerkID = user?.id;

	// State for selected category and search query
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [searching, setSearching] = useState<boolean>(false);

	const { data: listings, loading, error } = useFetch<Listing[]>('/(api)/listings');
	if (loading) {
		return <Text>Loading...</Text>;
	}
	if (error) {
		return <Text>Error fetching listings</Text>;
	}

	const featuredListings = listings?.filter((listing) => listing.featured > 0) || [];
	const recentListings =
		listings?.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()) || [];

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

	const handleLocation = () => {
		// Implement location change using a modal
	}

	return (
		<View className="bg-neutral-900 flex-1">
			<SafeAreaView className="p-4 pb-0 ">
				<SignedIn>
				<WelcomeMessage clerkID={clerkID || ''} />
				</SignedIn>
				
				{/* Search Bar */}
				<View className='flex flex-row gap-4'>
					<TextInput
					value={searchQuery}
					onChangeText={setSearchQuery}
					placeholder="Search listings..."
					placeholderTextColor="gray"
					onSubmitEditing={handleSearch} // Trigger search on return key press
					className="bg-neutral-700 text-neutral-100 p-4 rounded-lg flex flex-1"
					/>
					<TouchableOpacity
					onPress={() => setSearching(true)}
					className=" bg-primary-400 rounded-full w-12 h-12 items-center justify-center"
					>
						<Search className='text-neutral-100' />
					</TouchableOpacity>
				</View>

				{/* Location Setting */}
				<TouchableOpacity className="flex flex-row items-center gap-2 mt-1" onPress={handleLocation}>
					<MapPin strokeWidth={1} className=" text-neutral-600">Location:</MapPin>
					<Text className="text-sm font-PoppinsLight text-neutral-600">San Francisco, CA</Text>
				</TouchableOpacity>

			</SafeAreaView>

			{/* Content */}
			<View className="p-4 rounded-t-3xl bg-neutral-100">
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

			{/* Render Search Results when searching */}
			{searching ? (
				<FlatList
				data={searchResults}
				renderItem={({ item }) => (
					<View className="mb-4 flex flex-1">
					<View className="h-32 bg-neutral-200"></View>
					<Text className="text-sm font-PoppinsSemiBold text-neutral-900">{item.title}</Text>
					<Text className="text-sm font-PoppinsRegular text-neutral-900">${item.price}</Text>
					</View>
				)}
				keyExtractor={(item) => item.listing_id}
				numColumns={2}
				className="bg-neutral-100 px-4"
				columnWrapperStyle={{ gap: 16, justifyContent: 'space-between' }}
				ListFooterComponent={<View className="h-32"></View>}
				ListHeaderComponent={
					<View className='flex flex-row gap-3 mb-4'>
						{/* Back button when searching */}
						{searching && (
							<TouchableOpacity
							onPress={() => {
								setSearching(false);
								setSearchQuery('');
							}}
							className="rounded-full text-center align-center justify-center "
							>
								<ChevronLeft size={24} strokeWidth={2} className="text-neutral-900" />
							</TouchableOpacity>
						)}
						{/* Search Results header */}
						<Text className="text-lg font-PoppinsSemiBold text-neutral-900">
							Search Results ({searchResults.length})
						</Text>
					</View>
				}
				/>
			) : selectedCategory ? (
				// FlatList for selected category
				<FlatList
				data={filteredListings}
				renderItem={({ item }) => (
					<View className="mb-4 flex flex-1">
					<View className="h-32 bg-neutral-200"></View>
					<Text className="text-sm font-PoppinsSemiBold text-neutral-900">{item.title}</Text>
					<Text className="text-sm font-PoppinsRegular text-neutral-900">${item.price}</Text>
					</View>
				)}
				keyExtractor={(item) => item.listing_id}
				numColumns={2}
				className="bg-neutral-100 px-4"
				columnWrapperStyle={{ gap: 16, justifyContent: 'space-between' }}
				ListFooterComponent={<View className="h-32"></View>}
				ListHeaderComponent={
					<Text className="text-lg font-PoppinsSemiBold text-neutral-900 mb-4">
					{selectedCategory} ({filteredListings?.length})
					</Text>
				}
				/>
			) : (
				// Flatlists for Featured and Recent Listings
				<ScrollView className="bg-neutral-100 flex-1">
				<Text className="text-lg font-PoppinsSemiBold text-neutral-900 mb-4 px-4">
					Featured Listings
				</Text>
				<FlatList
					data={featuredListings}
					renderItem={({ item }) => (
					<View className="mb-4 flex flex-1 pr-4 w-40">
						<View className="h-32 bg-neutral-200"></View>
						<Text className="text-sm font-PoppinsSemiBold text-neutral-900">{item.title}</Text>
						<Text className="text-sm font-PoppinsRegular text-neutral-900">${item.price}</Text>
					</View>
					)}
					horizontal={true}
					showsHorizontalScrollIndicator={false}
					className="px-4"
				/>
				<Text className="text-lg font-PoppinsSemiBold text-neutral-900 mb-4 px-4">
					Recent Listings
				</Text>
				<FlatList
					data={recentListings}
					renderItem={({ item }) => (
					<View className="mb-4 flex flex-1 pr-4 w-40">
						<View className="h-32 bg-neutral-200"></View>
						<Text className="text-sm font-PoppinsSemiBold text-neutral-900">{item.title}</Text>
						<Text className="text-sm font-PoppinsRegular text-neutral-900">${item.price}</Text>
					</View>
					)}
					horizontal={true}
					showsHorizontalScrollIndicator={false}
					className="px-4"
				/>
				<View className="h-32"></View>
				</ScrollView>
			)}
		</View>
	);
};

export default Marketplace;
