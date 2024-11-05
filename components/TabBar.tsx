import { View, Text, TouchableOpacity } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Heart, ListPlus, MessageCircleMore, Search, Settings } from 'lucide-react-native';

// Define the valid route names
type TabRoutes = 'marketplace' | 'messages' | 'userListings' | 'settings' | 'favListings';

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
    const icon: Record<TabRoutes, (props: any) => JSX.Element> = {
        marketplace: (props: any) => <Search size={24} className=''{...props} />,
        messages: (props: any) => <MessageCircleMore size={24} className='' {...props} />,
        userListings: (props: any) => <ListPlus size={24} className='' {...props} />,
        settings: (props: any) => <Settings size={24} className='' {...props} />,
        favListings: (props: any) => <Heart size={24} className='' {...props} />,
    };

    return (
        <View className='flex flex-row mb-8 bg-gray-900 rounded-full px-2 py-4 mx-4'>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                        ? options.title
                        : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                // Debugging: Log the route name
                // console.log('Route name:', route.name); 

                return (

                    <TouchableOpacity
                        key={route.name}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{ flex: 1 }}
                        className='flex flex-col items-center justify-center'
                    >
                        <View className={`${ isFocused ? 'bg-primary-400 p-3 rounded-full' : ''}`}>
                            {/* Ensure route.name matches one of the defined keys */}
                            {icon[route.name as TabRoutes] ? (
                                icon[route.name as TabRoutes]({
                                    className: `${isFocused ? 'text-gray-100' : 'text-gray-400'}`,
                                })
                            ) : (
                                <Text className="text-red-500">Icon Not Found</Text>
                            )}
                        </View>

                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

export default TabBar;
