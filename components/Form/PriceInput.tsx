import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";

const PriceInput = () => {
  const [value, setValue] = useState("");

  const handleInputChange = (text: string) => {
    // Remove non-numeric characters except for a single decimal point
    const sanitizedText = text.replace(/[^0-9.]/g, "");
    
    // Ensure only one decimal point and restrict to two decimal places
    const formattedText = sanitizedText.includes(".")
      ? sanitizedText.split(".")[0] + "." + sanitizedText.split(".")[1].substring(0, 2)
      : sanitizedText;
    
    setValue(formattedText);
  };

  const handleBlur = () => {
    // Add .00 if no decimal point is provided
    if (value && !value.includes(".")) {
      setValue(value + ".00");
    }
  };

  return (
    <View className="flex flex-row gap-1 mb-4 items-center">
      <Text className="text-2xl font-PoppinsRegular text-neutral-900">$</Text>
      <TextInput
        placeholder="00.00"
        keyboardType="numeric"
        className="text-2xl font-PoppinsRegular flex-1"
        value={value}
        onChangeText={handleInputChange}
        onBlur={handleBlur}
      />
    </View>
  );
};

export default PriceInput;
