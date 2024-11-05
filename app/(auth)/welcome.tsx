import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Swiper from 'react-native-swiper';
import { useRef } from 'react';
import { useState } from 'react';
import { onboarding } from '@/constants';
import CustomButton from '@/components/CustomButton';

const Welcome = () => {
    const swiperRef = useRef<Swiper>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const isLastSlide = activeIndex === onboarding.length - 1;
    
    return (
        <SafeAreaView className='flex h-full items-center justify-between'>
            {/* Skip Button */}
            <TouchableOpacity onPress={() => { router.replace('/(auth)/sign-up'); }} className='w-full flex justify-end items-end p-8'>
                <Text className='text-gray-900 text-md font-PoppinsSemiBold'>Skip</Text>
            </TouchableOpacity>
            {/* Swiper */}
            <Swiper 
                ref={swiperRef} 
                loop={false} 
                dot={<View className='w-[32px] h-[4px] mx-1 bg-gray-300 rounded-full'/>}
                activeDot={<View className='w-[32px] h-[4px] mx-1 bg-primary-400 rounded-full'/>}
                onIndexChanged={(index) => setActiveIndex(index)}
            >
                {onboarding.map((item) => (
                    <View key={item.id} className='flex items-center justify-center p-5 mt-48'>
                        {/* Add image */}
                        <View className='flex items-center justify-center'>
                            <Text className='text-gray-900 text-3xl font-PoppinsSemiBold text-center mx-2'>{item.title}</Text>
                            <Text className='text-md font-PoppinsRegular text-center mt-4 mx-4 text-gray-400'>{item.description}</Text>
                        </View>
                    </View>
                ))}
        
            </Swiper>
            <CustomButton 
                title={isLastSlide ? "Get Started" : "Continue"} 
                onPress={() => isLastSlide ? router.replace('/(auth)/sign-up') : swiperRef.current?.scrollBy(1) }
                className="w-11/12 mt-10 mb-5"
            />
        </SafeAreaView>
    );
}

export default Welcome;