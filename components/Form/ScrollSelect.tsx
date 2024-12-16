import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { ScrollSelectProps } from '@/types/type';

export const ScrollSelect = ({
  label,
  options,
  selectedValues,
  onChange,
  multiple = false,
  required = false,
}: ScrollSelectProps) => {
  useEffect(() => {
    if (required && options.length > 0) {
      if (multiple && Array.isArray(selectedValues) && selectedValues.length === 0) {
        onChange([options[0]]);
      } else if (!multiple && !selectedValues) {
        onChange(options[0]);
      }
    }
  }, []);

  const isSelected = (option: string) => {
    if (multiple) {
      return (selectedValues as string[]).includes(option);
    }
    return selectedValues === option;
  };

  const handlePress = (option: string) => {
    if (multiple) {
      const currentSelected = selectedValues as string[];
      const newSelected = currentSelected.includes(option)
        ? currentSelected.filter(v => v !== option)
        : [...currentSelected, option];
      
      if (!required || newSelected.length > 0) {
        onChange(newSelected);
      }
    } else {
      if (required) {
        // If required, only allow changing to a new value
        if (selectedValues !== option) {
          onChange(option);
        }
      } else {
        // If not required, allow deselection by clicking the same option
        onChange(selectedValues === option ? '' : option);
      }
    }
  };

  return (
    <>
      <Text className='heading-3 mb-2'>
        {label} {required && <Text className="text-red-500">*</Text>}
      </Text>
      
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} className='flex flex-row mb-4 overflow-visible'>
        <View className='flex flex-row gap-2'>
          {options.map((option) => (
            <TouchableOpacity
              key={option}
              onPress={() => handlePress(option)}
              className={`rounded-full py-2 px-4 ${
                isSelected(option) ? 'bg-neutral-800' : 'bg-neutral-100'
              }`}
            >
              <Text className={`font-PoppinsRegular ${
                isSelected(option) ? 'text-neutral-100' : 'text-neutral-900'
              }`}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default ScrollSelect;