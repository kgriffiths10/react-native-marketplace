import SearchBar from '@/components/SearchBar'
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import { ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient';

export default function Marketplace() {
  const { user } = useUser()



  return (
    <View className='bg-neutral-900'>
		{/* <LinearGradient 
			colors={['#f6f6f6', 'transparent']} 
			start={[0, 0]}
			style={{
			position: 'absolute',
			top: 700,
			left: 0,
			right: 0,
			bottom: 0,
			zIndex: 10, 
		}}>
		</LinearGradient> */}
	
		<SafeAreaView className='bg-neutral-900 p-4'>
				<SignedIn>
					<Text className='text-gray-100 text-lg font-PoppinsSemiBold'>Welcome back, John Smith</Text>
				</SignedIn>
				<SearchBar />
			
		</SafeAreaView>
      
		<ScrollView className=' bg-neutral-200 p-4 rounded-3xl' >
			{/* Add spot */}
			<View className='mb-4 w-full bg-neutral-500 h-32 rounded-xl items-center justify-center'>
				<Text>This is an add spot</Text>
			</View>
			{/* Categories */}
			<View className='mb-8 flex flex-row gap-4 overflow-visible'>
				<View className='h-16 w-16 rounded-full bg-neutral-500'></View>
				<View className='h-16 w-16 rounded-full bg-neutral-500'></View>
				<View className='h-16 w-16 rounded-full bg-neutral-500'></View>
				<View className='h-16 w-16 rounded-full bg-neutral-500'></View>
				<View className='h-16 w-16 rounded-full bg-neutral-500'></View>
				<View className='h-16 w-16 rounded-full bg-neutral-500'></View>
			</View>
			
			{/* Featured Listings */}
			<Text className='mb-2 text-neutral-800 text-lg font-PoppinsSemiBold'>Featured Listings</Text>
			<View className='mb-8 flex flex-row overflow-visible'>
				{/* Listing Card */}
				<View className='bg-neutral-100 p-2 w-fit'>
					<View className='bg-neutral-500 h-28 w-32'></View>
					<Text>Macbook 2020 Pro</Text>
					<Text>Price</Text>
				</View>
				<View className='bg-neutral-100 p-2 w-fit'>
					<View className='bg-neutral-500 h-28 w-32'></View>
					<Text>Macbook 2020 Pro</Text>
					<Text>Price</Text>
				</View>
				<View className='bg-neutral-100 p-2 w-fit'>
					<View className='bg-neutral-500 h-28 w-32'></View>
					<Text>Macbook 2020 Pro</Text>
					<Text>Price</Text>
				</View>
			</View>

			{/* Recent Listings */}
			<Text className='mb-2 text-neutral-800 text-lg font-PoppinsSemiBold'>Recent Steals</Text>
			<View className='flex flex-row overflow-visible'>
				{/* Listing Card */}
				<View className='bg-neutral-100 p-2 w-fit'>
					<View className='bg-neutral-500 h-28 w-32'></View>
					<Text>Macbook 2020 Pro</Text>
					<Text>Price</Text>
				</View>
				<View className='bg-neutral-100 p-2 w-fit'>
					<View className='bg-neutral-500 h-28 w-32'></View>
					<Text>Macbook 2020 Pro</Text>
					<Text>Price</Text>
				</View>
				<View className='bg-neutral-100 p-2 w-fit'>
					<View className='bg-neutral-500 h-28 w-32'></View>
					<Text>Macbook 2020 Pro</Text>
					<Text>Price</Text>
				</View>
			</View>

			<View className='h-96'></View>

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
  )
}