import React, { forwardRef, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView, BottomSheetBackdropProps } from '@gorhom/bottom-sheet';

interface ReusableBottomSheetProps {
  content: React.ReactNode;
}

const ReusableBottomSheet = forwardRef<BottomSheet, ReusableBottomSheetProps>(({ content }, ref) => {

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={0.5}
      />
    ),
    [] 
  );

  return (
    <BottomSheet
      ref={ref}
      index={-1} // Start with the bottom sheet collapsed
      enablePanDownToClose={true}
      enableDynamicSizing={true}
      backdropComponent={renderBackdrop} 

    >
      <BottomSheetView>
        <View className='p-4'>
          {content}
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
});



export default ReusableBottomSheet;
