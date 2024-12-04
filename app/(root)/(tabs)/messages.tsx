import React, { useCallback, useRef, useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

export default function Messages() {
	const bottomSheetRef = useRef<BottomSheet>(null);

	return <GestureHandlerRootView>
		<View className='bg-lime-300'>
			<SafeAreaView className='h-full p-20'>
				<Text>Messages</Text>
				<Button title='Open Bottom Sheet' onPress={() => bottomSheetRef.current?.expand()} />
			</SafeAreaView>
			
			
			<BottomSheet ref={bottomSheetRef} index={-1} enablePanDownToClose={true} enableDynamicSizing={true}>
				<BottomSheetView>
					<View className='p-4'>
						<Text>Bottom Sheet Content</Text>
						<Text>Bottom Sheet Content</Text>
						<Text>Bottom Sheet Content</Text>
						<Text>Bottom Sheet Content</Text>
						<Text>Bottom Sheet Content</Text>
						<Text>Bottom Sheet Content</Text>
						<Text>Bottom Sheet Content</Text>
						<Text>Bottom Sheet Content</Text>
						<Text>Bottom Sheet Content</Text>
					</View>
					<View className='h-32'></View>

				</BottomSheetView>
			</BottomSheet>
		</View>
	</GestureHandlerRootView>
}