import BottomSheetModalComponent from '@/components/BottomSheets/BottomSheetModal';
import { useFetch } from '@/lib/fetch';
import { useUser } from '@clerk/clerk-expo';
import BottomSheet, { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { EllipsisVertical, Minus, Pin, Plus, Scroll, Search, Settings2, Zap } from 'lucide-react-native';
import { useCallback, useRef, useState } from 'react';
import { ScrollView, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Slider from '@react-native-community/slider'; 
import InputField from '@/components/Form/InputField';
import CustomButton from '@/components/CustomButton';
import PriceInput from '@/components/Form/PriceInput';
import SelectSlider, { ScrollSelect } from '@/components/Form/ScrollSelect';
import { cssInterop } from 'nativewind';

cssInterop(Settings2, {
    className: {
        target: 'style'
    }
});


const SearchBar = ({ searchQuery, setSearchQuery, handlePresentModalPress, handlePresentAddBottomSheet }: { searchQuery: string, setSearchQuery: (query: string) => void, handlePresentModalPress: () => void, handlePresentAddBottomSheet: ()=>void }) => {
    return (
        <View className="flex flex-row gap-2 mb-8">
            <View className="flex flex-row flex-1 border-neutral-300 border rounded-full align-center justify-start p-3">
                <Search className='stroke-neutral-400 mr-2' />

                <TextInput
                    placeholder="Search Listings"
                    className="text-neutral-800 w-full"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>
            <TouchableOpacity className="border-neutral-300 border rounded-full align-center justify-center p-3" onPress={handlePresentModalPress}>
                <Settings2 className='stroke-neutral-800' />
            </TouchableOpacity>
            <TouchableOpacity className="bg-primary-400 rounded-full align-center justify-center p-3" onPress={handlePresentAddBottomSheet}>
                <Plus className="stroke-neutral-100" />
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
    const addListingBottomSheetRef = useRef<BottomSheetModal>(null);
    const handlePresentAddBottomSheet = useCallback(() => {
        addListingBottomSheetRef.current?.present();
    }, []);
    
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




    return (
        <View className='flex flex-1'>
            <SafeAreaView className="flex-1 bg-white p-4">
                <Text className="heading-1">
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
                            <TouchableOpacity key={listing.listing_id} className="w-full mb-4">
                                <View className="rounded-2xl bg-neutral-100 p-4 flex flex-row">
                                    <View className="mr-4 w-28 rounded-lg bg-white"></View>
                                    <View className='flex-1'>
                                        <Text className="heading-2" numberOfLines={1} ellipsizeMode="tail">{listing.title}</Text>
                                        <Text className="heading-3-light mb-1">${listing.price}</Text>
                                        {/* <Text className="text-sm font-PoppinsRegular text-neutral-400">{listing.category_name}</Text> */}
                                        <View className={`self-start rounded-full border ${statusStyles(listing.status).view} px-3 py-1`}>
                                            <Text className={`text-sm font-PoppinsMedium ${statusStyles(listing.status).text}`}>{listing.status}</Text>
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
                ref={addListingBottomSheetRef}
                content = {
                    <View>
                        <Text className='text-lg font-PoppinsSemiBold text-neutral-800 mb-4 text-center'>
                             Add a Product
                        </Text>
                        <View>
                            <InputField label='Title' placeholder='A descriptive listing title' maxLength={50} required={true}></InputField>
                            <PriceInput label='Price' required={true}/>
                            <InputField label='Description' placeholder='Detailed listing description' maxLength={500} multiline={true} className='h-24' required={true}></InputField>
                            <ScrollSelect
                                label="Category"
                                options={['Electronics', 'Furniture', 'Clothing', 'Textbooks', 'Vehicles', 'Housing', 'Sports']}
                                selectedValues={addListingCategory}
                                onChange={(value) => setAddListingCategory(value as string)}
                                required={true} // Will default to first option and prevent deselection
                            />
                            <ScrollSelect
                                label="Condition"
                                options={['New', 'Used', 'Refurbished']}
                                selectedValues={addListingCondition}
                                onChange={(value) => setAddListingCondition(value as string)}
                                required={false} // Allows no selection
                            />
                            <View className='flex flex-row items-center justify-between mb-4'>
                                <Text className='heading-3'>Open to trade?</Text>
                                <Switch onValueChange={toggleSwitch} value={addListingIsTrade}                         />    
                            </View>

                            <InputField label='Location' placeholder='Enter listing location' required={true}></InputField>
                            
                            <Text className='heading-3 mb-2'>Images</Text>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} className='flex flex-row mb-4 gap-4 overflow-visible'>
                                <View className="w-28 h-24 mr-4 rounded-lg bg-neutral-100 items-center justify-center">
                                    <Plus className='text-neutral-800' size={32} />
                                </View>
                                <View className="w-28 h-24 mr-4 rounded-lg bg-neutral-100 "></View>
                                <View className="w-28 h-24 mr-4 rounded-lg bg-neutral-100 "></View>
                                <View className="w-28 h-24 mr-4 rounded-lg bg-neutral-100 "></View>
                                <View className="w-28 h-24 rounded-lg bg-neutral-100 "></View>
                            </ScrollView>
                            
                            {/* Buttons */}
                            <View className='flex flex-col gap-4 mt-6'>
                                <CustomButton title='Add Listing' onPress={()=>{}}></CustomButton>
                                <View className='flex flex-row gap-4'>
                                    <CustomButton title='Save Draft' bgVariant='outline' textVariant='primary' onPress={()=>{}} className='flex-1'></CustomButton>
                                    <CustomButton title='Cancel' bgVariant='danger' textVariant='danger' onPress={()=>{}} className='flex-1'></CustomButton>
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



