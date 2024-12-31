import DetailedListing from "@/components/BottomSheets/DetailedListing";
import MarketplaceFilter from "@/components/BottomSheets/MarketplaceFilter";
import CategoryScroll from "@/components/CategoryScroll";
import { useFetch } from "@/lib/fetch";
import { SignedIn, useUser } from "@clerk/clerk-expo";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { MapPinned, Search, Settings2 } from "lib/icons";
import { useState, useEffect, useRef, useCallback } from "react";
import { FlatList, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Marketplace = () => {
	const { user } = useUser();
	const clerkFirstName = user?.firstName;

	const [filters, setFilters] = useState({
		searchQuery: '',
		category: '', // Take values from CategoryScroll
		location: 'Los Angeles, California',
		sortby: '',
		price: { min: '', max: '' }, // Separate min and max prices
	});

	const { data: listings, loading, error, refetch } = useFetch<any>(`/(api)/marketplace/listings?
		category=${filters.category}&
		location=${filters.location}&
		sortby=${filters.sortby}&
		price_min=${filters.price.min}&
		price_max=${filters.price.max}&
		searchQuery=${filters.searchQuery}
	`);

	const handleCategorySelect = (categoryName: string | null) => {
		setFilters((prevFilters) => ({
			...prevFilters,
			category: categoryName || '',
		}));
		console.log('Selected category:', categoryName);
	};

	useEffect(() => {
		console.log('Filters changed:', filters);
		refetch();
	}, [filters]);

	// Filter Bottom Sheet 
	const filterBottomSheetRef = useRef<BottomSheetModal>(null);
	const handlePresentFilters = useCallback(() => {
		filterBottomSheetRef.current?.present();
	}, []);

	// DetailedListing Bottom Sheet
	const detailedListingBottomSheetRef = useRef<BottomSheetModal>(null);
	const [selectedListing, setSelectedListing] = useState<any>(null);
	const presentDetailedListing = useCallback((listing: any) => {
		setSelectedListing(listing);
		detailedListingBottomSheetRef.current?.present();
	}, []);



	return (
		<View className="bg-white flex-1 px-4 pt-4 pb-16">
				
			<SafeAreaView>
				<SignedIn>
					<Text className='heading-1'>Welcome back, {clerkFirstName}</Text>
				</SignedIn>

				<View className='flex flex-row gap-4 mb-2'>
					{/* Search Bar */}
					<View className='flex flex-row flex-1 border-neutral-300 border rounded-full align-center justify-start p-3 '>
						<Search className='text-neutral-800 w-12 h-12 mr-4' />
						<TextInput 
							placeholder='Search Listings' 
							className='text-neutral-800 w-full'
							returnKeyType="search"
							// value={searchQuery}
							// onChangeText={setSearchQuery}
							// onSubmitEditing={handleSearch}
						>
						</TextInput>
					</View>
					{/* Filter Button */}
					<TouchableOpacity 
						className='border-neutral-300 border rounded-full align-center justify-center p-3'
						onPress={handlePresentFilters}
					>
						<Settings2 className='text-neutral-800 w-12 h-12'></Settings2>
					</TouchableOpacity>
				</View>
				{/* Location */}
				<TouchableOpacity className='flex flex-row items-center gap-2 mb-4'>
					<MapPinned strokeWidth={1.5} size={18} className='text-neutral-500 w-12 h-12'></MapPinned>
					<Text className="text-sm-light">Los Angeles, California</Text>	
				</TouchableOpacity>
				{/* Banner Ad */}
				<View className="mb-4 w-full bg-neutral-200 h-16 rounded-xl items-center justify-center">
					<Text className="text-neutral-800 text-sm font-PoppinsLight">Banner Ad</Text>
				</View>

				<CategoryScroll onCategorySelect={handleCategorySelect} />
			</SafeAreaView>
			{loading ? (
				<ActivityIndicator size={'small'} />
			) : error ? (
				<Text className="text-red-500">Error loading listings</Text>
			) : (
				<FlatList
					data={listings}
					renderItem={({ item }) => (
						<TouchableOpacity
							key={item.listing_id}
							className="w-full mb-4"
							onPress={() => presentDetailedListing(item)}
						>
							<View className="mb-4">
								<View className="h-72 bg-neutral-200 rounded-xl"></View>
								<View className="flex flex-row justify-between mt-2">
									<Text className="text-base font-PoppinsMedium text-neutral-800 flex-1" numberOfLines={1} ellipsizeMode="tail">{item.title}</Text>
									<Text className="text-base font-PoppinsMedium text-neutral-800">${item.price}</Text>
								</View>
								<Text className="text-sm font-PoppinsRegular text-neutral-500">{item.location}</Text>
								<Text className="text-sm font-PoppinsRegular text-neutral-500">
									Sold by {item.first_name} {item.last_name}
								</Text>
							</View>	
						</TouchableOpacity>
						
					)}
					keyExtractor={(item) => item.listing_id}
					showsVerticalScrollIndicator={false}
					ListFooterComponent={<View className="h-32"></View>}
					refreshing={loading}
					onRefresh={refetch}
					ListHeaderComponent={
						<Text className="heading-2 mb-4">
							{filters.category} ({listings?.length || 0} results)
						</Text>
					}
				/>
			)}
			<MarketplaceFilter ref={filterBottomSheetRef} />
			<DetailedListing ref={detailedListingBottomSheetRef} listing={selectedListing} />

		</View>
	);
}

export default Marketplace;

