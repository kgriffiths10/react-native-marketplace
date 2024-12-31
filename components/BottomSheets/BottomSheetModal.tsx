import React, { forwardRef, useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetModal, BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';

type BottomSheetModalComponentProps = {
  content?: React.ReactNode;
  snapPoints?: string[]; // Add snapPoints prop
};

const BottomSheetModalComponent = forwardRef<BottomSheetModal, BottomSheetModalComponentProps>(
  ({ content, snapPoints }, ref) => { // Remove default snapPoints

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
      <BottomSheetModal
        ref={ref}
        enablePanDownToClose={true}
        enableDynamicSizing={true}
        backdropComponent={renderBackdrop}
        backgroundStyle={{ borderTopLeftRadius: 32, borderTopRightRadius: 28 }}
        snapPoints={snapPoints} // Pass snapPoints to BottomSheetModal
      >
        <BottomSheetScrollView>
            <View className='p-8'>
                {content || <Text>No Content Available</Text>}
            </View>
          
        </BottomSheetScrollView>
      </BottomSheetModal>
    );
  }
);



export default BottomSheetModalComponent;
