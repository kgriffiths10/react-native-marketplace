import { Image, Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";

import { InputFieldProps } from "@/types/type";
import { Icon } from "lucide-react-native";

const InputField = ({label, labelStyle,  icon: IconComponent, secureTextEntry = false, containerStyle, inputStyle, iconStyle, className, ...props}: InputFieldProps) => {
    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View className="w-full">
                    {/* Label */}
                    {label && (
                        <Text className={`text-gray-500 text-md font-PoppinsRegular mb-2 ${labelStyle}`}>
                        {label}
                        </Text>
                    )}

                    {/* Input Container */}
                    <View className={`flex flex-row justify-start items-center relative bg-neutral-100 rounded-xl border border-gray-300 focus:border-primary-400 mb-4 w-full ${containerStyle}`}>
                        {IconComponent && (<IconComponent className={`w-6 h-6 ml-4 ${iconStyle} text-gray-400`} />)}                     
                        <TextInput className={`rounded-full p-4 font-PoppinsRegular flex-1 ${inputStyle} text-left`} secureTextEntry={secureTextEntry}{...props}/> 
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

export default InputField;