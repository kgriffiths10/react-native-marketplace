import { Stack, Tabs } from 'expo-router';
import { Text, View, StyleSheet, ViewStyle } from 'react-native';
import { Heart, ListPlus, MessageCircleMore, Search, Settings } from 'lib/icons';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function TabLayout() {
	const primary = '#FF5A5F';
	const dark = '#262626';

	return (
		<GestureHandlerRootView>
 			<BottomSheetModalProvider>
				<Tabs 
					screenOptions={{ 
						tabBarActiveTintColor: primary, 
						tabBarInactiveTintColor: dark,
						tabBarShowLabel: false,
						tabBarStyle: {
							paddingTop: 8,
						},
					}} 
					initialRouteName="marketplace" 
				>
					<Tabs.Screen
					name="favListings"
					options={{
						title: 'FavListings',
						headerShown: false,
						tabBarIcon: ({ color }) => <Heart size={28} color={color} strokeWidth={1.75}/>,
					}}
					/>
					<Tabs.Screen
					name="userListings"
					options={{
						title: 'User Listings',
						headerShown: false,
						tabBarIcon: ({ color }) => <ListPlus size={28} color={color} strokeWidth={1.75}/>,
					}}
					/>
					<Tabs.Screen
					name="marketplace"
					options={{
						title: 'Marketplace',
						headerShown: false,
						tabBarIcon: ({ color }) => <Search size={28}  color={color} strokeWidth={1.75} />,
					}}
					/>
					<Tabs.Screen
					name="messages"
					options={{
						title: 'Messages',
						headerShown: false,
						tabBarIcon: ({ color }) => <MessageCircleMore size={28} color={color} strokeWidth={1.75}/>,
					}}
					/>
					<Tabs.Screen
					name="settings"
					options={{
						title: 'Settings',
						headerShown: false,
						tabBarIcon: ({ color }) => <Settings size={28} color={color} strokeWidth={1.75}/>,
					}}
					/>
				</Tabs>
 			</BottomSheetModalProvider>
		</GestureHandlerRootView>
	);
}