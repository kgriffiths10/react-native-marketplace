import { ScrollView, Switch, Text, TextInput, TouchableOpacity, View } from "react-native";
import InputField from "../Form/InputField";
import { Info, Minus, Plus, } from "@/lib/icons";
import ScrollSelect from "../Form/ScrollSelect";
import CustomButton from "../CustomButton";
import { forwardRef, useCallback, useRef, useState } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import BottomSheetModalComponent from "./BottomSheetModal";
import PriceField from "../Form/PriceField";
import { useUser } from "@clerk/clerk-expo";

type BottomSheetModalComponentProps = {
  content?: React.ReactNode;
};

const AddListing = forwardRef<BottomSheetModal, BottomSheetModalComponentProps>(
  ({ content }, ref) => {
    const { user } = useUser();
    const clerkID = user?.id;

    const [form, setForm] = useState({
        clerkId: clerkID,
        title: '',
        category: 'Electronics', // Set default category
        description: '',
        price: '',
        images: '',
        condition: '', // No default condition since it's not required
        isTrade: false,
        location: '',
        coinQuantity: 0,
    });


    const toggleSwitch = () => {
        setForm((prevForm) => ({
            ...prevForm,
            isTrade: !prevForm.isTrade, 
        }));
    };

    
    // Boost coins
    const totalCoins = 12;
    const [coinsRemaining, setCoinsRemaining] = useState(totalCoins);
    const timeInDays = (form.coinQuantity * 12) / 24; // Convert hours to days (1 coin = 0.5 days)
    
    const coinIcrement = () => {
        if (form.coinQuantity < totalCoins) {
            setForm((prevForm) => ({
                ...prevForm,
                coinQuantity: prevForm.coinQuantity + 1,
            }));
            setCoinsRemaining(coinsRemaining - 1);
        }
        else {
            alert('Add more boost coins to increase the time.');
        }
    }
    const coinDecrement = () => {
        if (form.coinQuantity > 0) {
            setForm((prevForm) => ({
                ...prevForm,
                coinQuantity: prevForm.coinQuantity - 1,
            }));
            setCoinsRemaining(coinsRemaining + 1);
        }
    }

    return (
        <BottomSheetModalComponent
            ref={ref}
            content = {
                <View>
                    <Text className='text-lg font-PoppinsSemiBold text-neutral-800 mb-4 text-center'>
                            Add a Product
                    </Text>
                    <View className="flex-1">

                        
                        <InputField label='Title' placeholder='A descriptive listing title' maxLength={50} required={true} defaultValue={form.title} onChangeText={(value) => setForm((prev) => ({ ...prev, title: value }))}></InputField>
                        
                        <ScrollSelect
                            label="Category"
                            options={['Electronics', 'Furniture', 'Clothing', 'Textbooks', 'Vehicles', 'Housing', 'Sports']}
                            selectedValues={form.category}
                            onChange={(value) => setForm({ ...form, category: value as string })}
                            required={true} // Will default to first option and prevent deselection
                        />
                        <InputField label='Description' placeholder='Detailed listing description' maxLength={500} multiline={true} className='h-24' required={true} defaultValue={form.description} onChangeText={(value) => setForm( {...form, description: value})}></InputField>
                        <PriceField label='Price' defaultValue={form.price} currency='USD' required={true} onChangeText={(value) => setForm( {...form, price: value})}/>
                        
                        <Text className='heading-3 mb-2'>Images</Text>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} className='flex flex-row mb-4 gap-4 overflow-visible'>
                            <View className="w-28 h-24 mr-4 rounded-lg bg-neutral-100 items-center justify-center">
                                <Plus className='text-neutral-800' size={32} />
                            </View>
                            <View className="w-28 h-24 mr-4 rounded-lg bg-neutral-100 "></View>
                            <View className="w-28 h-24 mr-4 rounded-lg bg-neutral-100 "></View>
                            <View className="w-28 h-24 mr-4 rounded-lg bg-neutral-100 "></View>
                            <View className="w-28 h-24 rounded-lg bg-neutral-100 "></View>
                        </ScrollView>

                        <ScrollSelect
                            label="Condition"
                            options={['New', 'Used', 'Refurbished']}
                            selectedValues={form.condition}
                            required={false} // Allows no selection
                            onChange={(value) => setForm({ ...form, condition: value as string })}
                        />
                        <View className='flex flex-row items-center justify-between mb-4'>
                            <Text className='heading-3'>Open to trade?</Text>
                            <Switch onValueChange={toggleSwitch} value={form.isTrade}/>    
                        </View>

                        <InputField label='Location' placeholder='Enter listing location' required={true} defaultValue={form.location} onChangeText={(value) => setForm( {...form, location: value})}></InputField>
                        
                        
                        
                        {/* Boost Listing */}
                        <View className='my-4'>
                            <View className='flex flex-row gap-4 items-center'>
                                <TouchableOpacity className='bg-neutral-800 w-12 h-12 rounded-full items-center justify-center' onPress={coinDecrement}>
                                    <Minus className='stroke-neutral-100'/>
                                </TouchableOpacity>
                                <View className='bg-neutral-200 rounded-2xl p-4 items-center flex-1'>
                                    <Text className='heading-2 text-center'>Boost Your Listing</Text>
                                    <Text className='text-base-light text-center'>Get more views and sell faster!</Text>
                                    <Text className='text-2xl font-PoppinsMedium mt-2 mb-2'>{timeInDays} days</Text>
                                    <Text className='text-base-light'>Available Coins: {coinsRemaining}</Text>
                                </View>
                                <TouchableOpacity className='bg-neutral-800 w-12 h-12 rounded-full items-center justify-center' onPress={coinIcrement}>
                                    <Plus className='stroke-neutral-100'/>
                                </TouchableOpacity>
                            </View>
                            <View className='flex flex-row gap-2 items-center justify-center mt-1'>
                                    <Info className='stroke-neutral-500' size={16} />
                                    <Text className='text-sm-light'>Learn More & Add Coins</Text>
                            </View>
                        </View>

                    
                        {/* Buttons */}
                        <View className='flex flex-col gap-4 mt-6'>
                            <CustomButton title='Post Listing' onPress={()=>{ 
                                console.log(form)  
                                setForm({
                                    clerkId: clerkID,
                                    title: '',
                                    category: 'Electronics',
                                    description: '',
                                    price: '',
                                    images: '',
                                    condition: '',
                                    isTrade: false,
                                    location: '',
                                    coinQuantity: 0,
                                })
                            
                            }}>
                                    
                            </CustomButton> 
                            <View className='flex flex-row gap-4'>
                                <CustomButton title='Save Draft' bgVariant='outline' textVariant='secondary' onPress={()=>{}} className='flex-1'></CustomButton>
                                <CustomButton title='Cancel' bgVariant='danger' textVariant='danger' onPress={()=>{}} className='flex-1'></CustomButton>
                            </View>
                        </View>

                    </View> 
                </View>
            }
        />
    )
});

export default AddListing;

// TODO: *** When posting, the coin quantity should be deducted from the user's account and the available coins should update
// TODO: Post images to database
// TODO: Add location picker
// TODO: Add form validation
// TODO: Add form submission
// TODO: Add form reset
// TODO: Add form success message
// TODO: Add form error message
// TODO: make categories dynamic
// TODO: make conditions dynamic?
