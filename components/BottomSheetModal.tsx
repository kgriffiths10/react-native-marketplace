import React, { forwardRef, useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetModal, BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';

type BottomSheetModalComponentProps = {
  content?: React.ReactNode;
};

const BottomSheetModalComponent = forwardRef<BottomSheetModal, BottomSheetModalComponentProps>(
  ({ content }, ref) => {

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
      >
        <BottomSheetScrollView>
            <View className='p-8'>
                {content || <Text>Default Content</Text>}
            </View>
          
        </BottomSheetScrollView>
      </BottomSheetModal>
    );
  }
);



export default BottomSheetModalComponent;
