import { ScrollView, Switch, Text, TextInput, TouchableOpacity, View } from "react-native";
import InputField from "../Form/InputField";
import { ArrowBigUpDash, CircleX, Info, Minus, Plus, SquarePen, } from "@/lib/icons";
import ScrollSelect from "../Form/ScrollSelect";
import CustomButton from "../CustomButton";
import { forwardRef, useCallback, useRef, useState, useEffect } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import BottomSheetModalComponent, { BottomSheetModalComponentProps } from "./BottomSheetModal";
import PriceField from "../Form/PriceField";
import { useUser } from "@clerk/clerk-expo";
import { fetchAPI, useFetch } from "@/lib/fetch";
import SelectField from "../Form/SelectField";

const AddListing = forwardRef<BottomSheetModal, BottomSheetModalComponentProps>(
  ({ content, header, footer, snapPoints }, ref) => {
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
            header="Add Listing"
            footer= {
                <View className="bg-neutral-100 shadow-lg rounded-t-2xl px-8 pt-8 pb-8">
                    {/* Buttons */}
                    <View className='flex flex-col gap-4'>
                        <View className="flex flex-row align-center items-center gap-4">
                            <SquarePen className='text-neutral-400' size={32} strokeWidth={1.5} onPress={onPressDraft}/>
                            <CustomButton 
                                title='Create' 
                                onPress={onPressPost}
                                className="flex-1"
                            />  
                            <CircleX className='text-neutral-400' size={32} strokeWidth={1.5} onPress={onPressCancel} />    
                        </View>
                        
                        {/* <View className='flex flex-row gap-4'>
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
                        </View> */}
                    </View>
                </View>
            }
            content = {
                <View>
                    {/* Category */}
                    <View>
                        <SelectField
                            label="Select a Category"
                            options={categories}
                            selectedValues={[form.category]}
                            onChange={(selected) => setForm({ ...form, category: selected[0] })}
                            required={true}
                            multiple={false}
                            wrap={true}
                        />
                    </View>
                    {/* Title */}
                    <View>
                        <InputField 
                            label="Title"
                            required={true}
                            placeholder="2020 Gen 3 Headphones"
                            defaultValue={form.title}
                            onChangeText={(value) => setForm({ ...form, title: value })}
                        />
                    </View>
                    {/* Price */}
                    <View>
                        <PriceField 
                            label="Price"
                            required={true}
                            placeholder="00.00" 
                            currency="USD"
                            defaultValue={form.price}
                            onChangeText={(value) => setForm({ ...form, price: value })}
                        />
                    </View>
                    {/* Description */}
                    <View>
                        <InputField 
                            label="Description"
                            required={true}
                            placeholder="2020 Gen 3 Headphones"
                            defaultValue={form.description}
                            onChangeText={(value) => setForm({ ...form, description: value })}
                        />
                    </View>
                    {/* Condition */}
                    <SelectField
                        label="Condition"
                        options={[
                            { id: 'new', name: 'New' },
                            { id: 'used', name: 'Used' },
                            { id: 'refurbished', name: 'Refurbished' }
                        ]}
                        selectedValues={[form.condition]}
                        onChange={(selected) => setForm({ ...form, condition: selected[0] })}
                        multiple={false}
                        wrap={true}
                    />
                    {/* Location */}
                    <View>
                        <InputField 
                            label="Location"
                            required={true}
                            placeholder="Search listing city"
                            defaultValue={form.location}
                            onChangeText={(value) => setForm({ ...form, location: value })}
                        />
                    </View>
                    {/* Images */}
                    <View className="mb-8">
                        <Text className="label">Images</Text>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} className='flex flex-row mb-4 gap-4 overflow-visible'>
                            <View className="w-28 h-24 mr-4 rounded-lg bg-neutral-200 items-center justify-center">
                                <Plus className='text-neutral-800' size={32} />
                            </View>
                            <View className="w-28 h-24 mr-4 rounded-lg bg-neutral-200 "></View>
                            <View className="w-28 h-24 mr-4 rounded-lg bg-neutral-200 "></View>
                            <View className="w-28 h-24 mr-4 rounded-lg bg-neutral-200 "></View>
                            <View className="w-28 h-24 rounded-lg bg-neutral-200 "></View>
                        </ScrollView>
                    </View>
                    {/* Feature */}
                    <View>
                        <View className="flex flex-row items-center justify-between">
                            <View>
                                <Text className="label">Feature Listing</Text>
                                <Text className="text-base-light mb-4">Get more views and sell faster!</Text>    
                            </View>
                            <TouchableOpacity>
                                <Info className="text-neutral-300" strokeWidth={1.75} />        
                            </TouchableOpacity>
                        </View>
                        <View className="flex gap-4 mb-8">
                            <TouchableOpacity className="flex flex-row items-center justify-between border border-neutral-300 rounded-2xl p-4">
                                <View className="flex flex-row items-center gap-4">
                                    <View className="h-6 w-6 border border-neutral-300 rounded-full"></View>
                                    <Text className="text-lg font-PoppinsMedium">24 hrs</Text>
                                </View>
                                <Text className="text-lg font-PoppinsRegular text-neutral-400">$1.99 USD</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="flex flex-row items-center justify-between border border-neutral-300 rounded-2xl p-4">
                                <View className="flex flex-row items-center gap-4">
                                    <View className="h-6 w-6 border border-neutral-300 rounded-full"></View>
                                    <Text className="text-lg font-PoppinsMedium">7 days</Text>
                                    <View className="bg-neutral-800 self-start py-1 px-3 rounded-full">
                                        <Text className="text-neutral-100 text-sm font-PoppinsRegular">BEST VALUE</Text>
                                    </View>
                                </View>
                                <Text className="text-lg font-PoppinsRegular text-neutral-400">$4.99 USD</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="flex flex-row items-center justify-between border border-neutral-300 rounded-2xl p-4">
                                <View className="flex flex-row items-center gap-4">
                                    <View className="h-6 w-6 border border-neutral-300 rounded-full"></View>
                                    <Text className="text-lg font-PoppinsMedium">14 days</Text>
                                </View>
                                <Text className="text-lg font-PoppinsRegular text-neutral-400">$8.99 USD</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View className="h-32"></View>
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
