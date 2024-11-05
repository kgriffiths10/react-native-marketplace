import { router } from "expo-router";
import { Alert, Image, Text, View } from "react-native";
import CustomButton from "./CustomButton";
import { icons } from "@/constants";

const OAuth = () => {

  const onGoogleSignIn = () => {
    Alert.alert('Google Sign In');
  }

  return (
    <View>
      <View className="flex flex-row justify-center items-center mt-4 gap-x-3">
        <View className="flex-1 h-[1px] bg-gray-300" />
        <Text className="text-md font-PoppinsRegular text-gray-400">or</Text>
        <View className="flex-1 h-[1px] bg-gray-300" />
      </View>

      <CustomButton
        title='Sign In with Google'
        className="mt-4 w-full"
        IconLeft={() => (<Image source={icons.google} className="w-6 h-6 mx-2"/>)}
        bgVariant="outline"
        textVariant="primary"
        onPress={onGoogleSignIn}
      
      /> 
    </View>
  );
};

export default OAuth;