import BottomSheetModalComponent from '@/components/BottomSheetModal';
import { useFetch } from '@/lib/fetch';
import { useUser } from '@clerk/clerk-expo';
import BottomSheet, { BottomSheetModal } from '@gorhom/bottom-sheet';
import { EllipsisVertical, Minus, Pin, Plus, Scroll, Search, Settings2, Zap } from 'lucide-react-native';
import { useCallback, useRef, useState } from 'react';
import { ScrollView, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Slider from '@react-native-community/slider'; 
import InputField from '@/components/InputField';
import CustomButton from '@/components/CustomButton';
import PriceInput from '@/components/PriceInput';

const SearchBar = ({ searchQuery, setSearchQuery, handlePresentModalPress, handlePresentAddBottomSheet }: { searchQuery: string, setSearchQuery: (query: string) => void, handlePresentModalPress: () => void, handlePresentAddBottomSheet: ()=>void }) => {
    return (
        <View className="flex flex-row gap-2 mb-8">
            <View className="flex flex-row flex-1 border-neutral-300 border rounded-full align-center justify-start p-3">
                <Search className="text-neutral-800 w-12 h-12 mr-4" />
                <TextInput
                    placeholder="Search Listings"
                    className="text-neutral-800 w-full"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>
            <TouchableOpacity className="border-neutral-300 border rounded-full align-center justify-center p-3" onPress={handlePresentModalPress}>
                <Settings2 className="text-neutral-800 w-12 h-12" />
            </TouchableOpacity>
            <TouchableOpacity className="bg-primary-400 rounded-full align-center justify-center p-3" onPress={handlePresentAddBottomSheet}>
                <Plus className="text-neutral-100 w-12 h-12" />
            </TouchableOpacity>
            
        </View>
    );
};

const UserListings = () => {
    const { user } = useUser();
    const clerkID = user?.id;

    const statusStyles = (status: string) => {
        switch (status) {
            case 'Active':
                return {
                    view: 'border-green-600 bg-green-200',
                    text: 'text-green-600',
                };
            case 'Draft':
                return {
                    view: 'border-gray-600 bg-gray-200',
                    text: 'text-gray-600',
                };
            case 'Sold':
                return {
                    view: 'border-blue-600 bg-blue-200',
                    text: 'text-blue-600',
                };
            case 'Inactive':
                return {
                    view: 'border-yellow-600 bg-yellow-200',
                    text: 'text-yellow-600',
                };
            default:
                return {
                    view: 'border-gray-300 bg-gray-100',
                    text: 'text-gray-300',
                };
        }
    };

    // Add listing bottom sheet
    const [addListingCategory, setAddListingCategory] = useState('Electronics');
    const [addListingCondition, setAddListingCondition] = useState('New');
    
    const [addListingIsTrade, setaddListingIsTrade] = useState(false);
    const toggleSwitch = () => setaddListingIsTrade(previousState => !previousState);

    // Fetch user listings summary data
    const { data: summaryData, loading: summaryLoading, error: summaryError } = useFetch<any>(
        `/(api)/listings/userListings?clerkID=${clerkID}`
    );

    // console.log('summaryData:', summaryData);

    const [filters, setFilters] = useState({
        searchQuery: '',
        status: [] as string[],
        price: { min: 0, max: 1000000 },
        category: [] as string[],
    });
    const { searchQuery, status, price, category } = filters;

    // Filter listings based on search query and other filters
    const filteredListings = summaryData?.listings.filter((listing: any) => {
        const matchesQuery = listing.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = status.length ? (status as string[]).includes(listing.status) : true;
        const matchesPrice = listing.price >= price.min && listing.price <= price.max;
        const matchesCategory = category.length ? category.includes(listing.category_name) : true;
        return matchesQuery && matchesStatus && matchesPrice && matchesCategory;
    });

    // Filter Bottom Sheet
    const filterBottomSheetRef = useRef<BottomSheetModal>(null);
    const handlePresentModalPress = useCallback(() => {
        filterBottomSheetRef.current?.present();
    }, []);
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    // Add Listing Bottom Sheet
    const addBottomSheetRef = useRef<BottomSheetModal>(null);
    const handlePresentAddBottomSheet = useCallback(() => {
        addBottomSheetRef.current?.present();
    }, []);


    return (
        <View className='flex flex-1'>
            <SafeAreaView className="flex-1 bg-white p-4">
                <Text className="text-lg font-PoppinsSemiBold text-neutral-800 mb-2">
                    Your Listings
                </Text>
                <SearchBar 
                    searchQuery={searchQuery} 
                    setSearchQuery={(query) => setFilters({ ...filters, searchQuery: query })} 
                    handlePresentModalPress={handlePresentModalPress} 
                    handlePresentAddBottomSheet={handlePresentAddBottomSheet}
                />
                <ScrollView>
                    <View>
                        {filteredListings?.map((listing: any) => (
                            <TouchableOpacity key={listing.listing_id} className="w-full">
                                <View className="border-t border-neutral-300 py-4 flex flex-row">
                                    <View className="mr-4 w-24 rounded-lg bg-neutral-100"></View>
                                    <View className='flex-1'>
                                        <Text className="text-md font-PoppinsSemiBold text-neutral-900" numberOfLines={1} ellipsizeMode="tail">{listing.title}</Text>
                                        <Text className="mb-2 text-md font-PoppinsRegular text-neutral-900">${listing.price}</Text>
                                        {/* <Text className="text-sm font-PoppinsRegular text-neutral-400">{listing.category_name}</Text> */}
                                        <View className={`self-start rounded-md border ${statusStyles(listing.status).view} px-2 py-1`}>
                                            <Text className={`text-xs font-PoppinsMedium ${statusStyles(listing.status).text}`}>{listing.status}</Text>
                                        </View>
                                          
                                    </View>
                                    
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <View className='h-32'></View>
                </ScrollView>
            </SafeAreaView>
            
            {/* Filter Bottom Sheet */}
            <BottomSheetModalComponent
                ref={filterBottomSheetRef}
                content={
                    <View>
                        {/* Title */}
                        <Text className='text-lg font-PoppinsSemiBold text-neutral-800 mb-4 text-center'>
                            Filter Listings
                        </Text>
                        
                        {/* Status Filter */}
                        <View className='mb-6'>
                            <Text className='mb-2 text-md font-PoppinsSemiBold text-neutral-800'>Status</Text>
                            <View className='flex flex-row gap-2'>
                                {['Active', 'Inactive', 'Sold', 'Draft'].map((statusOption) => (
                                    <TouchableOpacity
                                        key={statusOption}
                                        onPress={() =>
                                            setFilters((prev) => ({
                                                ...prev,
                                                status: prev.status.includes(statusOption)
                                                    ? prev.status.filter((s) => s !== statusOption)
                                                    : [...prev.status, statusOption],
                                            }))
                                        }
                                        className={`rounded-full py-2 px-4 ${
                                            filters.status.includes(statusOption) ? 'bg-neutral-800' : 'bg-neutral-100'
                                        }`}
                                    >
                                        <Text className={`font-PoppinsRegular text-neutral-900 ${filters.status.includes(statusOption) ? 'text-neutral-100' : ''}`}>
                                            {statusOption}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>    
                        </View>

                        {/* Category Filter */}
                        <View className='mb-6'>
                            <Text className='mb-2 text-md font-PoppinsSemiBold text-neutral-800'>Categories</Text>
                            <View className='flex flex-row gap-2 flex-wrap'>
                                {['Electronics', 'Furniture', 'Clothing', 'Textbooks', 'Vehicles', 'Housing', 'Sports'].map((categoryOption) => (
                                    <TouchableOpacity
                                        key={categoryOption}
                                        onPress={() =>
                                            setFilters((prev) => ({
                                                ...prev,
                                                category: prev.category.includes(categoryOption)
                                                    ? prev.category.filter((c) => c !== categoryOption)
                                                    : [...prev.category, categoryOption],
                                            }))
                                        }
                                        className={`rounded-full py-2 px-4 ${
                                            filters.category.includes(categoryOption) ? 'bg-neutral-800' : 'bg-neutral-100'
                                        }`}
                                    >
                                        <Text className={`font-PoppinsRegular text-neutral-900 ${filters.category.includes(categoryOption) ? 'text-neutral-100' : ''}`}>
                                            {categoryOption}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>    
                        </View>
                        

                        {/* Price Filter */}
                        <Text className='mb-2 text-md font-PoppinsSemiBold text-neutral-800'>Price</Text>
                        <Slider
                            minimumValue={0}
                            maximumValue={10000}
                            step={10}
                            value={price.max}
                            onValueChange={(value) => setFilters((prev) => ({ ...prev, price: { ...prev.price, max: value } }))}
                        />
                        <Text>${price.min} - ${price.max}</Text>
                        
                    </View>
                }                                                                                                                                                                                                                                                                                                                                                                                                                                   
            />

            {/* Add Listing Bottom Sheet */}
            <BottomSheetModalComponent
                ref={addBottomSheetRef}
                content = {
                    <View>
                        <Text className='text-lg font-PoppinsSemiBold text-neutral-800 mb-4 text-center'>
                             Add a Product
                        </Text>
                        <View>
                            <InputField label='Title' placeholder='A descriptive listing title' maxLength={50} ></InputField>
                            
                            <Text className='text-neutral-900 text-md font-PoppinsMedium mb-2'>Price</Text>
                            <PriceInput />
                            <InputField label='Description' placeholder='Detailed listing description' maxLength={500} multiline={true} className='h-24'></InputField>
                            
                            <Text className='text-neutral-900 text-md font-PoppinsMedium mb-2'>Category</Text>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} className='flex flex-row mb-4 overflow-visible'>
                                <View className='flex flex-row gap-2'>
                                    {['Electronics', 'Furniture', 'Clothing', 'Textbooks', 'Vehicles', 'Housing', 'Sports'].map((categoryOption) => (
                                        <TouchableOpacity
                                            key={categoryOption}
                                            onPress={() => setAddListingCategory(categoryOption)}
                                            className={`rounded-full py-2 px-4 ${
                                                addListingCategory === categoryOption ? 'bg-neutral-800' : 'bg-neutral-100'
                                            }`}
                                        >
                                            <Text className={`font-PoppinsRegular text-neutral-900 ${addListingCategory === categoryOption ? 'text-neutral-100' : ''}`}>
                                                {categoryOption}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View> 
                            </ScrollView>

                            <View className='flex flex-row items-center justify-between mb-4'>
                                <Text className='text-neutral-900 text-md font-PoppinsMedium'>Open to trade?</Text>
                                <Switch onValueChange={toggleSwitch} value={addListingIsTrade}                         />    
                            </View>

                            <InputField label='Location' placeholder='Search listing location' icon={Pin}></InputField>

                            <Text className='text-neutral-900 text-md font-PoppinsMedium mb-2'>Condition (Optional)</Text>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} className='flex flex-row mb-4 overflow-visible'>
                                <View className="flex flex-row gap-2">
                                    {['New', 'Used', 'Refurbished'].map((conditionOption) => (
                                        <TouchableOpacity
                                        key={conditionOption}
                                        onPress={() =>
                                            setAddListingCondition((prev) => (prev === conditionOption ? '' : conditionOption))
                                        }
                                        className={`rounded-full py-2 px-4 ${
                                            addListingCondition === conditionOption ? 'bg-neutral-800' : 'bg-neutral-100'
                                        }`}
                                        >
                                        <Text
                                            className={`font-PoppinsRegular ${
                                                addListingCondition === conditionOption ? 'text-neutral-100' : 'text-neutral-900'
                                            }`}
                                        >
                                            {conditionOption}
                                        </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </ScrollView>

                            <Text className='text-neutral-900 text-md font-PoppinsMedium mb-2'>Images</Text>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} className='flex flex-row mb-4 gap-4 overflow-visible'>
                                <View className="w-28 h-24 rounded-lg bg-neutral-100 items-center justify-center">
                                    <Plus className='text-neutral-800' size={32} />
                                </View>
                                <View className="w-28 h-24 rounded-lg bg-neutral-100 "></View>
                                <View className="w-28 h-24 rounded-lg bg-neutral-100 "></View>
                                <View className="w-28 h-24 rounded-lg bg-neutral-100 "></View>
                                <View className="w-28 h-24 rounded-lg bg-neutral-100 "></View>
                            </ScrollView>
                            
                            
                            <View className='rounded-xl flex flex-col items-center border-2 border-neutral-200 pb-4'>
                                <View className='bg-neutral-200 p-4 rounded-xl flex flex-row items-center w-full'>
                                    <Zap className='text-neutral-800 mr-3' size={36} />
                                    <View>
                                        <Text className='text-lg text-neutral-900 font-PoppinsMedium flex-wrap'>Power Boost</Text>
                                        <Text className='text-sm text-neutral-500 font-PoppinsMedium flex-wrap'>Boost listing for more visibility</Text>
                                    </View>
                                    
                                </View>

                            
                            </View>
                        </View> 
                    </View>
                }
            />
        </View>
    );
};

export default UserListings;




/*
TODO:
    // MAke categories and status' dynamic in main page, and all bottom sheets (filters, add listing)
    // Add listing bottom sheet
    // When a user clicks on a list item, create a new bottom sheet modal that shows the full listing details with a new api route that fetches the full listing details for that listing_id.

*/



