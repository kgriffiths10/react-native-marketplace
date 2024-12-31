import { Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import { useEffect, useState } from "react";
import { PriceFieldProps } from "@/types/type";

const PriceField = ({
    label,
    labelStyle,
    currency = "USD",
    secureTextEntry = false,
    containerStyle,
    inputStyle,
    required,
    defaultValue = "",
    onChangeText,
    ...props
}: PriceFieldProps) => {
    const [value, setValue] = useState(defaultValue);

    useEffect(() => {
        setValue(defaultValue);
    }, [defaultValue]);

    const formatPrice = (input: string) => {
        // Ensure the input is numeric and format to two decimal places
        const numericValue = parseFloat(input || "0").toFixed(2);
        return numericValue;
    };

    const handleBlur = () => {
        const formattedValue = formatPrice(value);
        setValue(formattedValue); // Update the field value
        onChangeText?.(formattedValue); // Notify parent component about the change
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View className="w-full mb-2">
                    {/* Label */}
                    <Text className={`heading-3 mb-2 ${labelStyle}`}>
                        {label} ({currency}) {required && <Text className="text-red-500">* </Text>}
                    </Text>

                    {/* Input Container */}
                    <View className="flex flex-row">
                        <Text className="text-3xl font-PoppinsRegular text-neutral-800">$</Text>
                        <TextInput
                            value={value || ""} // Set the value of the input field
                            onChangeText={(text) => {
                                // Allow only numeric input and update state
                                const sanitizedValue = text.replace(/[^0-9.]/g, "");
                                setValue(sanitizedValue);
                                onChangeText?.(sanitizedValue);
                            }}
                            onBlur={handleBlur} // Format value on blur
                            placeholder="00.00"
                            keyboardType="numeric"
                            secureTextEntry={secureTextEntry}
                            className={`text-3xl font-PoppinsRegular text-neutral-800 ${inputStyle} text-left`}
                            {...props}
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default PriceField;
