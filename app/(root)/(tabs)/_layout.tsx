import { Stack, Tabs } from 'expo-router';
import { Text, View } from 'react-native';
import { Heart, ListPlus, MessageCircleMore, Search, Settings } from 'lib/icons';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


const TabIcon = ({ source, focused} : {source: JSX.Element, focused: boolean}) => {
	return (
		<View className={`rounded-full ${focused ? 'bg-neutral-100' : ''} w-16 h-16 items-center justify-center`}>
			{source}
		</View>
	);
}

const TabsLayout = () => {
    return (
		<GestureHandlerRootView>
			<BottomSheetModalProvider>
				<Tabs 
					initialRouteName='marketplace' 
					screenOptions={{
					tabBarShowLabel: false, 
					tabBarStyle: {
						backgroundColor: "#171717",
						position: 'absolute',
						bottom: 24,
						height: 72,
						alignItems: 'center',
						justifyContent: 'center',
						paddingTop: 16,
						marginHorizontal: 15,
						borderRadius: 50,
						borderTopWidth: 0,
					},
				}}>
					<Tabs.Screen name="favListings" options={{title: "Favorite Listings", headerShown: false, tabBarIcon: ({ focused}) => <TabIcon focused={focused} source={<Heart size={28} strokeWidth={1.75} className={focused ? 'text-primary-500' : 'text-gray-400'} />}/>}} />
					<Tabs.Screen name="userListings" options={{title: "Your Listings", headerShown: false, tabBarIcon: ({ focused}) => <TabIcon focused={focused} source={<ListPlus size={28} strokeWidth={1.75} className={focused ? 'text-primary-500' : 'text-gray-400'} />}/>}} />
					<Tabs.Screen name="marketplace" options={{title: "Marketplace", headerShown: false, tabBarIcon: ({ focused}) => <TabIcon focused={focused} source={<Search size={28} strokeWidth={1.75} className={focused ? 'text-primary-500' : 'text-gray-400'} />}/>}} /> 
					<Tabs.Screen name="messages" options={{title: "Messages", headerShown: false, tabBarIcon: ({ focused}) => <TabIcon focused={focused} source={<MessageCircleMore size={28} strokeWidth={1.75} className={focused ? 'text-primary-500' : 'text-gray-400'} />}/>}} />
					<Tabs.Screen name="settings" options={{title: "Settings", headerShown: false, tabBarIcon: ({ focused}) => <TabIcon focused={focused} source={<Settings size={28} strokeWidth={1.75} className={focused ? 'text-primary-500' : 'text-gray-400'} />}/>}} />
				</Tabs>
				
			</BottomSheetModalProvider>
		</GestureHandlerRootView> 
	);
};

export default TabsLayout;