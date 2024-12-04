import { Stack, Tabs } from 'expo-router';
import { Text, View } from 'react-native';
import { Heart, ListPlus, MessageCircleMore, Search, Settings } from 'lucide-react-native';


const TabIcon = ({ source, focused} : {source: JSX.Element, focused: boolean}) => {
	return (
		<View className={`rounded-full ${focused ? 'bg-primary-400' : ''} w-12 h-12 items-center justify-center`}>
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
				backgroundColor: "#333333",
				position: 'absolute',
				bottom: 24,
				height: 72,
				alignItems: 'center',
				justifyContent: 'center',
				paddingTop: 16,
				marginHorizontal: 16,
				borderRadius: 50,
				borderTopWidth: 0,
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