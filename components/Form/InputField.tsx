import { Image, Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";

import { InputFieldProps } from "@/types/type";
import { Icon } from "lucide-react-native";

const InputField = ({label, labelStyle,  icon: IconComponent, secureTextEntry = false, containerStyle, inputStyle, iconStyle, className, required, ...props}: InputFieldProps) => {
    
    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View className="w-full">
                    {/* Label */}
                    <Text className='heading-3 mb-2'>
                    {   label} {required && <Text className="text-red-500">*</Text>}
                    </Text>

                    {/* Input Container */}
                    <View className={`flex flex-row justify-start items-center relative rounded-xl border border-gray-300 focus:border-primary-400 mb-4 w-full ${containerStyle}`}>
                        {IconComponent && (<IconComponent className={`w-6 h-6 ml-4 ${iconStyle} text-neutral-300`} />)}                     
                        <TextInput className={`rounded-full p-4 font-PoppinsRegular flex-1 ${inputStyle} text-left`} secureTextEntry={secureTextEntry}{...props}/> 
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

export default InputField;