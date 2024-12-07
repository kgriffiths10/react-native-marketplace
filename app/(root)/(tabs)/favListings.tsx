import { Minus, Plus } from 'lucide-react-native';
import { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

const FavListings = () => {
  const [counter, setCounter] = useState(0);

  const handleIncrement = () => setCounter(prev => prev + 1);
  const handleDecrement = () => setCounter(prev => (prev > 0 ? prev - 1 : 0)); // Prevent going below 0

  // Use useEffect to log when the counter state changes
//   useEffect(() => {
//     console.log(counter);
//   }, [counter]); // Runs only when counter changes

    return (
        <SafeAreaView className='p-4'>
            <View className='flex flex-col'>
                <View className='flex flex-row bg-neutral-400 p-2 rounded-full'>
                    {/* Decrement Button */}
                    <TouchableOpacity
                        className="flex items-center p-1"
                        onPress={handleDecrement}
                    >
                        <Minus className="text-neutral-800" />
                    </TouchableOpacity>

                    {/* Counter Value */}
                    <Text className="text-lg text-neutral-900 font-PoppinsMedium text-center px-4">{counter}</Text>

                    {/* Increment Button */}
                    <TouchableOpacity
                        className="flex items-center p-1"
                        onPress={handleIncrement}
                    >
                        <Plus className="text-neutral-800" />
                    </TouchableOpacity>  
                </View>    
            </View>
            
        
        </SafeAreaView>
    );
};

export default FavListings;
