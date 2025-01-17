import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import BottomSheetModalComponent from '@/components/BottomSheets/BottomSheetModal';
import { SafeAreaView } from 'react-native-safe-area-context';

const Messages = () => {
    return (
		<SafeAreaView className='p-8'>
			<Text className='heading-2 mb-4'>Select a Category</Text>
			<View className='grid grid-cols-2 gap-4'>
				<TouchableOpacity>
					<View className='border border-neutral-400 p-4 self-start rounded-lg'>
						<Text className='font-PoppinsRegular'>Electronics</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity>
					<View className='border border-neutral-400 p-4 self-start rounded-lg'>
						<Text className='font-PoppinsRegular'>Electronics</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity>
					<View className='border border-neutral-400 p-4 self-start rounded-lg'>
						<Text className='font-PoppinsRegular'>Electronics</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity>
					<View className='border border-neutral-400 p-4 self-start rounded-lg'>
						<Text className='font-PoppinsRegular'>Electronics</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity>
					<View className='border border-neutral-400 p-4 self-start rounded-lg'>
						<Text className='font-PoppinsRegular'>Electronics</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity>
					<View className='border border-neutral-400 p-4 self-start rounded-lg'>
						<Text className='font-PoppinsRegular'>Electronics</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity>
					<View className='border border-neutral-400 p-4 self-start rounded-lg'>
						<Text className='font-PoppinsRegular'>Electronics</Text>
					</View>
				</TouchableOpacity>	
			</View>
			
		</SafeAreaView>
    );
};


export default Messages;