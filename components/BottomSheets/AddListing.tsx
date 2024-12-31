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

const AddListing = forwardRef<BottomSheetModal, BottomSheetModalComponentProps>(
  ({ content }, ref) => {
    const { user } = useUser();
    const clerkID = user?.id;

    // Form state
    const [form, setForm] = useState({
        title: '',
        category: '', // Initialize category as empty
        description: '',
        price: '',
        images: '',
        condition: '', // No default condition since it's not required
        isTrade: false,
        location: '',
        coinQuantity: 0,
        longitude: '',
        latitude: '',
    });

    // Fetch categories
    const { data: categoriesData, error: categoriesError } = useFetch<{ category_id: number, category_name: string }[]>('/(api)/categories');
    const categories = categoriesData ? categoriesData.map((category) => ({ id: category.category_id.toString(), name: category.category_name })) : [];

    useEffect(() => {
      if (categoriesError) {
        alert('Unable to fetch categories. Please try again later.');
      }
    }, [categoriesError]);

    // Toggle trade switch
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

    const validateForm = () => {
        const errors: string[] = [];
        if (!form.title) errors.push('Title is required.');
        if (!form.category) errors.push('Category is required.');
        if (!form.description) errors.push('Description is required.');
        if (!form.price) errors.push('Price is required.');
        if (!form.location) errors.push('Location is required.');
        if (!form.longitude) errors.push('Longitude is required.');
        if (!form.latitude) errors.push('Latitude is required.');
        return errors;
    };

    // Post listing
    const onPressPost = async () => {
        console.log('Button pressed');
        const errors = validateForm();
        if (errors.length > 0) {
            alert(errors.join('\n'));
            return;
        }
        try {
            // Test Data for posting listing
            // await fetchAPI('/(api)/listings/postListing', {
            //     method: 'POST',
            //     body: JSON.stringify({
            //         clerkID: clerkID,
            //         title: 'TEST PRODUCT', 
            //         category: '2', 
            //         description: 'THIS IS A TEST DESCRIPTION', 
            //         price: '999.00', 
            //         // images: '',
            //         condition: 'Refurbished', 
            //         isTrade: 'true', 
            //         location: 'TEST LOCATION', 
            //         // coinQuantity: 0,
            //         status: 'Active',
            //         longitude: '-118.243683',
            //         latitude: '34.052235',
            //     }),
            // });

            // Post listing to database
            await fetchAPI('/(api)/user/postListing', {
                method: 'POST',
                body: JSON.stringify({
                    clerkID: clerkID,
                    title: form.title,
                    category: form.category,
                    description: form.description,
                    price: form.price,
                    // images: form.images,
                    condition: form.condition,
                    isTrade: form.isTrade,
                    location: form.location,
                    // coinQuantity: 0,
                    status: 'Active',
                }),
            });
            alert('Listing posted successfully!');

        } catch (err: any) {
            alert('Unable to post listing. Please try again later.');
        }
        // Reset form
        setForm({
            title: '',
            category: '',
            description: '',
            price: '',
            images: '',
            condition: '',
            isTrade: false,
            location: '',
            coinQuantity: 0,
            longitude: '',
            latitude: '',
        });
    }

    // Save listing as draft
    const onPressDraft = async () => {
        const errors = validateForm();
        if (errors.length > 0) {
            alert(errors.join('\n'));
            return;
        }
        try {
            // Post listing to database
            await fetchAPI('/(api)/user/postListing', {
                method: 'POST',
                body: JSON.stringify({
                    clerkID: clerkID,
                    title: form.title,
                    category: form.category,
                    description: form.description,
                    price: form.price,
                    // images: form.images,
                    condition: form.condition,
                    isTrade: form.isTrade,
                    location: form.location,
                    // coinQuantity: 0,
                    status: 'Draft',
                    longitude: form.longitude,
                    latitude: form.latitude,
                }),
            });
            alert('Listing saved as draft successfully!');

        } catch (err: any) {
            alert('Unable to save listing as draft. Please try again later.');
        }
        // Reset form
        setForm({
            title: '',
            category: '',
            description: '',
            price: '',
            images: '',
            condition: '',
            isTrade: false,
            location: '',
            coinQuantity: 0,
            longitude: '',
            latitude: '',
        });
    };

    // Cancel listing
    const onPressCancel = () => {
        // Reset form
        setForm({
            title: '',
            category: '',
            description: '',
            price: '',
            images: '',
            condition: '',
            isTrade: false,
            location: '',
            coinQuantity: 0,
            longitude: '',
            latitude: '',
        });
    };


    return (
        <BottomSheetModalComponent
            ref={ref}
            snapPoints={['85%']} 
            content = {
                <View>
                    <Text className='text-lg font-PoppinsSemiBold text-neutral-800 mb-4 text-center'>
                            Add a Listing
                    </Text>
                    <View className="flex-1">

                        {/* Title */}
                        <InputField 
                            label='Title' 
                            placeholder='A descriptive listing title' 
                            maxLength={50} 
                            required={true} 
                            defaultValue={form.title} 
                            onChangeText={(value) => setForm((prev) => ({ ...prev, title: value }))}
                        />
                        {/* Cateogry */}
                        <ScrollSelect
                            label="Category"
                            options={categories.map(category => category.name)}
                            selectedValues={categories.find(category => category.id === form.category)?.name || ''}
                            onChange={(value) => {
                                const selectedCategory = categories.find(category => category.name === value);
                                setForm({ ...form, category: selectedCategory ? selectedCategory.id : '' });
                            }}
                            required={true} // Will default to first option and prevent deselection
                        />
                        {/* Description */}
                        <InputField 
                            label='Description'     
                            placeholder='Detailed listing description' 
                            maxLength={500} 
                            multiline={true} 
                            className='h-24' 
                            required={true} 
                            defaultValue={form.description} 
                            onChangeText={(value) => setForm( {...form, description: value})}
                        />
                        {/* Price */}
                        <PriceField 
                            label='Price' 
                            defaultValue={form.price} 
                            currency='USD' 
                            required={true} 
                            onChangeText={(value) => setForm( {...form, price: value})}
                        />
                        {/* Images */}
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
                        {/* Condition */}
                        <ScrollSelect
                            label="Condition"
                            options={['New', 'Used', 'Refurbished']}
                            selectedValues={form.condition}
                            required={false} // Allows no selection
                            onChange={(value) => setForm({ ...form, condition: value as string })}
                        />
                        {/* Trade */}
                        <View className='flex flex-row items-center justify-between mb-4'>
                            <Text className='heading-3'>Open to trade?</Text>
                            <Switch 
                                onValueChange={toggleSwitch} 
                                value={form.isTrade}
                            />    
                        </View>
                        
                        
                        {/* Location */}
                        <InputField 
                            label='Location' 
                            placeholder='Enter listing location' 
                            required={true} 
                            defaultValue={form.location}
                             onChangeText={(value) => setForm( {...form, location: value})}
                        />
                        <InputField 
                            label='Long' 
                            placeholder='Enter listing long' 
                            required={true} 
                            defaultValue={form.longitude} 
                            onChangeText={(value) => setForm( {...form, longitude: value})}
                        />
                        <InputField 
                            label='Lat' 
                            placeholder='Enter listing lat' 
                            required={true} 
                            defaultValue={form.latitude} 
                            onChangeText={(value) => setForm( {...form, latitude: value})}
                        />

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
                            <CustomButton 
                                title='Post Listing' 
                                onPress={onPressPost}
                            >       
                            </CustomButton> 
                            <View className='flex flex-row gap-4'>
                                <CustomButton 
                                    title='Save as Draft' 
                                    bgVariant='outline' 
                                    textVariant='secondary' 
                                    onPress={onPressDraft} 
                                    className='flex-1'
                                />
                                <CustomButton 
                                    title='Cancel' 
                                    bgVariant='danger' 
                                    textVariant='danger' 
                                    onPress={onPressCancel} 
                                    className='flex-1'
                                />
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
// TODO: Add form error message
// TODO: make conditions dynamic
