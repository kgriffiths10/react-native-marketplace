import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Swiper from 'react-native-swiper';
import { useRef } from 'react';
import { useState } from 'react';
import { onboarding } from '@/constants';
import CustomButton from '@/components/CustomButton';
import React from 'react';
import { Store } from 'lib/icons';

const Welcome = () => {
    
    return (
        <SafeAreaView className='flex h-full items-center justify-between p-8'>

                <View className='flex items-center justify-center p-5 mt-48'>
                    <Store size={72} strokeWidth={1.25} className='text-primary-400 mb-8'/>
                    <View className='flex items-center justify-center'>
                        <Text className='text-neutral-800 text-3xl font-PoppinsMedium text-center mb-2'>Welcome to Your Marketplace</Text>
                        <Text className='text-md font-PoppinsRegular text-center text-neutral-400'>Connect with students and find amazing deals on textbooks, electronics, and more!</Text>
                    </View>
                </View>
 
            <View className='flex flex-row gap-4'>
                <CustomButton 
                    title='Log In'
                    onPress={() => router.replace('/(auth)/sign-in')}
                    className='flex-1 bg-primary-400'
                />
                <CustomButton 
                    title='Sign Up'
                    onPress={() => router.replace('/(auth)/sign-up')}
                    className='flex-1'
                />
            </View>
            
            
        </SafeAreaView>
    );
}

export default Welcome;
