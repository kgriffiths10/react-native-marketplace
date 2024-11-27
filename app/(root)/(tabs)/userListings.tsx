import { useFetch } from '@/lib/fetch';
import { useUser } from '@clerk/clerk-expo';
import { EllipsisVertical, Search, Settings2 } from 'lucide-react-native';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const userListings = () => {

    const { user } = useUser();
	const clerkID = user?.id;

    const { data, loading, error, refetch } = useFetch<any>(`/(api)/userListings?clerkID=${clerkID}`);
    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        return <Text>Error: {error}</Text>;
    }

    return (
        <View className='p-4'>
            <SafeAreaView> 
                <Text className="text-lg font-PoppinsSemiBold text-neutral-800 mb-2">
                    Your Listings
                </Text>
                <View className='flex flex-row gap-4'>
                    <View className='flex flex-row flex-1 border-neutral-300 border rounded-full align-center justify-start p-3 '>
                        <Search className='text-neutral-800 w-12 h-12 mr-4' />
                        <TextInput 
                            placeholder='Search Listings' 
                            className='text-neutral-800 w-full'
                        >
                        </TextInput>
                    </View>
                    <TouchableOpacity className='border-neutral-300 border rounded-full align-center justify-center p-3'>
                        <Settings2 className='text-neutral-800 w-12 h-12'></Settings2>
                    </TouchableOpacity>	
                </View>
            </SafeAreaView>

            <ScrollView >
                {/* Users Listings Card UI */}


                {data && data.listings && data.listings.length > 0 ? (
                    data.listings.map((listing: any) => (
                        <View key={listing.id} className="flex flex-row py-4 border-t-[1px] border-neutral-300">
                            {/* Image */}
                            <View className="bg-neutral-200 h-22 w-24 mr-4 rounded-lg">
                                {/* Replace with actual image URL if available */}
                                <Text className="text-center text-neutral-600">{listing.image}</Text>
                            </View>

                            <View className="flex-1">
                                {/* Title and Price */}
                                <View className="mb-2">
                                    <Text className="text-md font-PoppinsSemiBold" numberOfLines={1} ellipsizeMode="tail">
                                        {listing.title}
                                    </Text>
                                    <Text className="text-md font-PoppinsRegular text-neutral-600">${listing.price}</Text>
                                </View>
                                {/* Status Badge */}
                                <View className="self-start rounded-full border border-green-500 bg-green-200 px-2 py-1">
                                    <Text className="text-green-500 text-xs font-PoppinsMedium">
                                        {listing.status.charAt(0).toUpperCase() + listing.status.slice(1).toLowerCase()}
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
        </View>

    );
}

export default userListings;
