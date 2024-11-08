import SearchBar from '@/components/SearchBar'
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import { ScrollView, Text, View, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useEffect, useState } from 'react'
import WelcomeMessage from '@/components/WelcomeMessage'
import CategoryScroll from '@/components/CategoryScroll'
import { featuredListings } from '@/constants'


export default function Marketplace() {
	const { user } = useUser()
	const clerkID = user?.id
	console.log(clerkID)

	const renderFeatured = ({ item }: { item: { title: string; price: number } }) => (
		<View className='mr-4'>
			<View className='bg-neutral-300 w-32 h-24 items-start rounded-lg'></View>
		  	<Text className='w-32'>{item.title}</Text>
		  	<Text>${item.price}</Text>
		</View>
	);


	return (
		<View className='bg-neutral-900'>
			<SafeAreaView className='p-4'>
					<SignedIn>
						<WelcomeMessage clerkID={clerkID || ''}/>
					</SignedIn>
					<SearchBar />
			</SafeAreaView>
			<ScrollView className='bg-neutral-200 h-full p-4 rounded-3xl'>
				<View className='mb-4 w-full bg-primary-400 h-32 rounded-xl items-center justify-center'>
		 			<Text>This is an ad spot</Text>
		 		</View>
				<CategoryScroll />
				
				<Text className='mb-2 text-neutral-800 text-lg font-PoppinsSemiBold'>
					Featured Listings
				</Text>
				<FlatList data={featuredListings} renderItem={renderFeatured} horizontal={true} className='overflow-visible'></FlatList>
				<Text className='mb-2 text-neutral-800 text-lg font-PoppinsSemiBold'>
					Featured Listings
				</Text>
				<FlatList data={featuredListings} renderItem={renderFeatured} horizontal={true} className='overflow-visible'></FlatList>
				<View className='py-48 bg-black'></View>
			</ScrollView>
		</View>
		
		
		// <SafeAreaView>
		//   <SignedIn>
		//     <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
		//   </SignedIn>
		//   <SignedOut>
		//     <Link href="/sign-in">
		//       <Text>Sign In</Text>
		//     </Link>
		//     <Link href="/sign-up">
		//       <Text>Sign Up</Text>
		//     </Link>
		//   </SignedOut>
		// </SafeAreaView>



		// <ScrollView className=' bg-neutral-200 p-4 rounded-3xl' >
		// 		{/* Add spot */}
		// 		<View className='mb-4 w-full bg-neutral-500 h-32 rounded-xl items-center justify-center'>
		// 			<Text>This is an add spot</Text>
		// 		</View>
		// 		{/* Categories */}
		// 		<View className='mb-8 flex flex-row gap-4 overflow-visible'>
		// 			<View className='h-16 w-16 rounded-full bg-neutral-500'></View>
		// 			<View className='h-16 w-16 rounded-full bg-neutral-500'></View>
		// 			<View className='h-16 w-16 rounded-full bg-neutral-500'></View>
		// 			<View className='h-16 w-16 rounded-full bg-neutral-500'></View>
		// 			<View className='h-16 w-16 rounded-full bg-neutral-500'></View>
		// 			<View className='h-16 w-16 rounded-full bg-neutral-500'></View>
		// 		</View>
				
		// 		{/* Featured Listings */}
		// 		<Text className='mb-2 text-neutral-800 text-lg font-PoppinsSemiBold'>Featured Listings</Text>
		// 		<View className='mb-8 flex flex-row overflow-visible'>
		// 			{/* Listing Card */}
		// 			<View className='bg-neutral-100 p-2 w-fit'>
		// 				<View className='bg-neutral-500 h-28 w-32'></View>
		// 				<Text>Macbook 2020 Pro</Text>
		// 				<Text>Price</Text>
		// 			</View>
		// 			<View className='bg-neutral-100 p-2 w-fit'>
		// 				<View className='bg-neutral-500 h-28 w-32'></View>
		// 				<Text>Macbook 2020 Pro</Text>
		// 				<Text>Price</Text>
		// 			</View>
		// 			<View className='bg-neutral-100 p-2 w-fit'>
		// 				<View className='bg-neutral-500 h-28 w-32'></View>
		// 				<Text>Macbook 2020 Pro</Text>
		// 				<Text>Price</Text>
		// 			</View>
		// 		</View>

		// 		{/* Recent Listings */}
		// 		<Text className='mb-2 text-neutral-800 text-lg font-PoppinsSemiBold'>Recent Steals</Text>
		// 		<View className='flex flex-row overflow-visible'>
		// 			{/* Listing Card */}
		// 			<View className='bg-neutral-100 p-2 w-fit'>
		// 				<View className='bg-neutral-500 h-28 w-32'></View>
		// 				<Text>Macbook 2020 Pro</Text>
		// 				<Text>Price</Text>
		// 			</View>
		// 			<View className='bg-neutral-100 p-2 w-fit'>
		// 				<View className='bg-neutral-500 h-28 w-32'></View>
		// 				<Text>Macbook 2020 Pro</Text>
		// 				<Text>Price</Text>
		// 			</View>
		// 			<View className='bg-neutral-100 p-2 w-fit'>
		// 				<View className='bg-neutral-500 h-28 w-32'></View>
		// 				<Text>Macbook 2020 Pro</Text>
		// 				<Text>Price</Text>
		// 			</View>
		// 		</View>

		// 		<View className='h-96'></View>
		// 	</ScrollView>
	)
}