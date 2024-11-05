import { Stack, Tabs } from 'expo-router';
import TabBar from '@/components/TabBar';
import { Text, View } from 'react-native';
import { Heart, ListPlus, MessageCircleMore, Search, Settings } from 'lucide-react-native';
import React from 'react';


const TabIcon = ({ source, focused} : {source: JSX.Element, focused: boolean}) => {
	return (
		<View className={`w-12 h-12 rounded-full items-center justify-center ${focused ? 'bg-primary-400' : ''}`}>
			{source}
		</View>
	);
}

const TabsLayout = () => {
    return (
		<Tabs 
			initialRouteName='marketplace' 
			screenOptions={{
			tabBarShowLabel: false, 
			tabBarStyle: {
				backgroundColor: '#1f1f1f', 
				borderRadius: 100, 
				paddingBottom: 0, 
				overflow: 'hidden', 
				marginBottom: 24, 
				marginHorizontal: 20,
				height: 78,
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				flexDirection: 'row',
				position: 'absolute',
				zIndex: 10,
				paddingHorizontal: 8,
			},

		}}>
			<Tabs.Screen name="favListings" options={{title: "Favorite Listings", headerShown: false, tabBarIcon: ({ focused}) => <TabIcon focused={focused} source={<Heart size={28} className={focused ? 'text-gray-200' : 'text-gray-400'} />}/>}} />
			<Tabs.Screen name="userListings" options={{title: "Your Listings", headerShown: false, tabBarIcon: ({ focused}) => <TabIcon focused={focused} source={<ListPlus size={28} className={focused ? 'text-gray-200' : 'text-gray-400'} />}/>}} />
			<Tabs.Screen name="marketplace" options={{title: "Marketplace", headerShown: false, tabBarIcon: ({ focused}) => <TabIcon focused={focused} source={<Search size={28} className={focused ? 'text-gray-200' : 'text-gray-400'} />}/>}} /> 
			<Tabs.Screen name="messages" options={{title: "Messages", headerShown: false, tabBarIcon: ({ focused}) => <TabIcon focused={focused} source={<MessageCircleMore size={28} className={focused ? 'text-gray-200' : 'text-gray-400'} />}/>}} />
			<Tabs.Screen name="settings" options={{title: "Settings", headerShown: false, tabBarIcon: ({ focused}) => <TabIcon focused={focused} source={<Settings size={28} className={focused ? 'text-gray-200' : 'text-gray-400'} />}/>}} />
		</Tabs>
        
    );
};

export default TabsLayout;