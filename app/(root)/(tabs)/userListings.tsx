import ReusableBottomSheet from '@/components/BottomSheet';
import { useFetch } from '@/lib/fetch';
import { useUser } from '@clerk/clerk-expo';
import BottomSheet from '@gorhom/bottom-sheet';
import { EllipsisVertical, Search, Settings2 } from 'lucide-react-native';
import { useRef } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

const UserListings = () => {
    const { user } = useUser();
    const clerkID = user?.id;

    const { data, loading, error, refetch } = useFetch<any>(`/(api)/listings/userListings?clerkID=${clerkID}`);

    const statusStyles = (status: string) => {
        switch (status) {
            case 'active':
                return {
                    view: 'border-green-600 bg-green-200',
                    text: 'text-green-600',
                };
            case 'draft':
                return {
                    view: 'border-gray-600 bg-gray-200',
                    text: 'text-gray-600',
                };
            case 'sold':
                return {
                    view: 'border-blue-600 bg-blue-200',
                    text: 'text-blue-600',
                };
            case 'inactive':
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

    // Bottom Sheet
    const bottomSheetRef = useRef<BottomSheet>(null);
    const handleOpenBottomSheet = () => {
        bottomSheetRef.current?.expand();
    };

    return (
        <GestureHandlerRootView className='flex-1'>
            <SafeAreaView className='flex-1'>
                <View className="p-4 flex-1">
                    <Text className="text-lg font-PoppinsSemiBold text-neutral-800 mb-2">
                        Your Listings
                    </Text>
                    <View className="flex flex-row gap-4 mb-8">
                        <View className="flex flex-row flex-1 border-neutral-300 border rounded-full align-center justify-start p-3">
                            <Search className="text-neutral-800 w-12 h-12 mr-4" />
                            <TextInput
                                placeholder="Search Listings"
                                className="text-neutral-800 w-full"
                            />
                        </View>
                        <TouchableOpacity
                            className="border-neutral-300 border rounded-full align-center justify-center p-3"
                            onPress={handleOpenBottomSheet}
                        >
                            <Settings2 className="text-neutral-800 w-12 h-12" />
                        </TouchableOpacity>
                    </View>

                    {loading ? (
                        <Text>Loading...</Text>
                    ) : error ? (
                        <Text>Error: {error}</Text>
                    ) : (
                        <ScrollView>
                            {data && data.listings && data.listings.length > 0 ? (
                                data.listings.map((listing: any) => (
                                    <View
                                        key={listing.listing_id}
                                        className="flex flex-row py-4 border-t-[1px] border-neutral-300"
                                    >
                                        {/* Image */}
                                        <View className="bg-neutral-200 h-22 w-24 mr-4 rounded-lg">
                                            <Text className="text-center text-neutral-600">
                                                {listing.image}
                                            </Text>
                                        </View>

                                        <View className="flex-1">
                                            {/* Title and Price */}
                                            <View className="mb-2">
                                                <Text
                                                    className="text-md font-PoppinsSemiBold"
                                                    numberOfLines={1}
                                                    ellipsizeMode="tail"
                                                >
                                                    {listing.title}
                                                </Text>
                                                <Text className="text-md font-PoppinsRegular text-neutral-600">
                                                    ${listing.price}
                                                </Text>
                                            </View>
                                            {/* Status Badge */}
                                            <View
                                                className={`self-start rounded-md border ${statusStyles(
                                                    listing.status
                                                ).view} px-2 py-1`}
                                            >
                                                <Text
                                                    className={`text-xs font-PoppinsMedium ${statusStyles(
                                                        listing.status
                                                    ).text}`}
                                                >
                                                    {listing.status
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                        listing.status
                                                            .slice(1)
                                                            .toLowerCase()}
                                                </Text>
                                            </View>
                                        </View>

                                        <TouchableOpacity>
                                            <EllipsisVertical className="text-neutral-800" />
                                        </TouchableOpacity>
                                    </View>
                                ))
                            ) : (
                                <Text>No listings found</Text>
                            )}
                        </ScrollView>
                    )}

                    {/* Bottom Sheet */}
                    <ReusableBottomSheet
                        ref={bottomSheetRef}
                        content={
                            <View className="pb-24">
                                <Text className="text-lg font-PoppinsSemiBold text-neutral-800 mb-2">
                                    Filter Listings
                                </Text>
                                <Text className="text-md font-PoppinsRegular text-neutral-600">
                                    Coming soon...
                                </Text>
                                <Text className="text-md font-PoppinsRegular text-neutral-600">
                                    Coming soon...
                                </Text>
                                <Text className="text-md font-PoppinsRegular text-neutral-600">
                                    Coming soon...
                                </Text>
                                <Text className="text-md font-PoppinsRegular text-neutral-600">
                                    Coming soon...
                                </Text>
                                <Text className="text-md font-PoppinsRegular text-neutral-600">
                                    Coming soon...
                                </Text>
                                <Text className="text-md font-PoppinsRegular text-neutral-600">
                                    Coming soon...
                                </Text>
                            </View>
                        }
                    />
                    
                </View>
            </SafeAreaView>
        </GestureHandlerRootView>
    );
};

export default UserListings;
