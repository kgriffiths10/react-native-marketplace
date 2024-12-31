import { Dimensions, ScrollView, Switch, Text, TextInput, TouchableOpacity, View } from "react-native";
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
    listing: any;
};

const DetailedListing = forwardRef<BottomSheetModal, BottomSheetModalComponentProps>(
  ({ listing }, ref) => {
    
    const screenWidth = Dimensions.get('window').width;

    const { data: listingData, loading, error } = useFetch<any>(
        `/(api)/marketplace/detailedListing?listing_id=${listing?.listing_id}`
    );

    
    return (
        <BottomSheetModalComponent
            ref  ={ref}
            snapPoints = {['95%']}
            header = "Listing Details" 

            content = {
                <View>
                    <View className='w-full bg-neutral-200 rounded-3xl mb-4' style={{ height: screenWidth - 72 }}></View>
                    <Text className="heading-1">{listingData?.title}</Text>
                    <Text className="heading-3 ">Description</Text>
                    <Text className="text-base-light mb-4">
                        {listingData?.description}
                    </Text>

                    <Text className="heading-3 ">Location</Text>
                    <Text className="text-base-light mb-4">
                        {listingData?.location}
                    </Text>

                    <Text className="heading-3 ">Sold By</Text>
                    <Text className="text-base-light mb-4">
                        {listingData?.first_name} {listingData?.last_name}
                    </Text>    

                    <View className="flex flex-row items-center justify-between gap-4 bg-neutral-200 p-3 rounded-full">
                        <Text className="text-2xl font-PoppinsMedium text-neutral-800">$ {listingData?.price}</Text>
                        <CustomButton title="Message" className="flex-1" />
                    </View>

                </View>
            }
        />
    )
});

export default DetailedListing;

