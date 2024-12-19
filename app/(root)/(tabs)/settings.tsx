import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dimensions } from 'react-native';
import { Settings2 } from '@/lib/icons';

const Settings = () => {
    const screenWidth = Dimensions.get('window').width;
    return (
        <SafeAreaView className="bg-white flex-1 p-4">
            <ScrollView>
                <View className='w-full bg-neutral-200 rounded-3xl mb-4' style={{ height: screenWidth - 16 }}></View>
                <Text className="heading-1">Product Title Here</Text>
                <Text className="heading-3 ">Description</Text>
                <Text className="text-base-light mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec nisl nec. 
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec nisl nec.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec nisl nec.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec nisl nec.
                </Text>

                <Text className="heading-3 ">Location</Text>
                <Text className="text-base-light mb-4">
                    Oregon, USA
                </Text>

                <Text className="heading-3 ">Sold By</Text>
                <Text className="text-base-light mb-4">
                    John Doe
                </Text>    

                <View className="flex flex-row align-center justify-between mb-4">
                    <Text>$ 1245.00</Text>
                    <View className="p-4 bg-neutral-200 rounded-full flex-1 align-center text-center">
                        <Text>Message</Text>
                    </View>
                </View>

                <View className="h-32"></View>
            </ScrollView>
            
            
            
        </SafeAreaView>
    );
};

export default Settings;