import { forwardRef, useEffect, useState } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import BottomSheetModalComponent from "./BottomSheetModal";
import { Text, View, TextInput, Button } from "react-native";
import { useFetch } from '@/lib/fetch';
import InputField from "../Form/InputField";
import PriceField from "../Form/PriceField";

type BottomSheetModalComponentProps = {
    listingId: string | null;
};

const EditListing = forwardRef<BottomSheetModal, BottomSheetModalComponentProps>(
    ({ listingId }, ref) => {
        
        const { data: listingData, loading, error } = useFetch<any>(
            `/(api)/user/editListing?listing_id=${listingId}`
        );




        const handleUpdateListing = () => {
            console.log(listingData.title);
            console.log(listingData.description);
        };

        return (
            <BottomSheetModalComponent
                ref={ref}
                snapPoints={['85%']} 
                content={
                    <View>
                        <Text className='text-lg font-PoppinsSemiBold text-neutral-800 mb-4 text-center'>
                            Edit Listing
                        </Text>
                        {loading ? (
                            <Text>Loading...</Text>
                        ) : error ? (
                            <Text>Error loading listing data</Text>
                        ) : listingData ? (
                            <View>
                                {/* Title */}
                                <InputField
                                    label="Title"
                                    placeholder='A descriptive listing title'
                                    maxLength={50}
                                    defaultValue={listingData.title}
                                    onChangeText={(text) => listingData.title = text}
                                    required={true}
                                />
                                {/* Category */}

                                {/* Description */}
                                <InputField 
                                    label='Description' 
                                    placeholder='Detailed listing description' 
                                    maxLength={500} 
                                    multiline={true} 
                                    className='h-24' 
                                    required={true} 
                                    defaultValue={listingData.description} 
                                    onChangeText={(text) => listingData.description = text}
                                />
                                {/* Price */}
                                <PriceField
                                    label="Price"
                                    currency="USD"
                                    defaultValue={listingData.price}
                                    onChangeText={(text) => listingData.price = text}
                                    required={true}
                                />

                                {/*Images  */}
                                {/* Condition */}
                                {/* Trade */}
                                {/* Location */}
                                {/* Boost */}

                                <Button title="Update Listing" onPress={handleUpdateListing} />
                            </View>
                        ) : null}
                    </View>
                }
            />
        );
    }
);

export default EditListing;