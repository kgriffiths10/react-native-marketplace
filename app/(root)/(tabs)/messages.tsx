import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import BottomSheetModalComponent from '@/components/BottomSheetModal';
import { SafeAreaView } from 'react-native-safe-area-context';

const Messages = () => {
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  // renders
  return (
      <SafeAreaView>
          <Text>Messages</Text>
          <Button
            onPress={handlePresentModalPress}
            title="Present Modal"
            color="black"
          />
          <BottomSheetModalComponent
            ref={bottomSheetModalRef}
            content={
              <>
                <Text>Awesome 🎉</Text>
                <Text>Reusable Component</Text>
              </>
            }
          />
    </SafeAreaView>
  );
};


export default Messages;