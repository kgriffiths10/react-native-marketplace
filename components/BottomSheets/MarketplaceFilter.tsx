import { ScrollView, Switch, Text, TextInput, TouchableOpacity, View } from "react-native";
import InputField from "../Form/InputField";
import { Info, Minus, Plus, } from "@/lib/icons";
import ScrollSelect from "../Form/ScrollSelect";
import CustomButton from "../CustomButton";
import { forwardRef, useCallback, useRef, useState, useEffect } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import BottomSheetModalComponent from "./BottomSheetModal";
import PriceField from "../Form/PriceField";
import { useUser } from "@clerk/clerk-expo";
import { fetchAPI, useFetch } from "@/lib/fetch";

type BottomSheetModalComponentProps = {
  content?: React.ReactNode;
};

const MarketplaceFilter = forwardRef<BottomSheetModal, BottomSheetModalComponentProps>(
  ({ content }, ref) => {
    
    return (
        <BottomSheetModalComponent
            ref={ref}
            snapPoints={['85%']} 
            content = {
                <View>
                    <Text className='text-lg font-PoppinsSemiBold text-neutral-800 mb-4 text-center'>
                            Filters
                    </Text>
                    <Text>Set Location</Text>


                    <Text>Sort By</Text>
                    <Text>Location</Text>
                    <Text>Condition</Text>
                    <Text>Price Min</Text>
                    <Text>Price Max</Text>


                </View>
            }
        />
    )
});

export default MarketplaceFilter;

