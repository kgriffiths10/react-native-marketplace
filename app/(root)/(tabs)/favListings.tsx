import { Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';


import InputField from '@/components/Form/InputField';
import PriceField from '@/components/Form/PriceField';
import CustomButton from '@/components/CustomButton';

const FavListings = () => {

    const [ form, setForm ] = useState({
        title: '',
        price: '',
    });

	return  (
		<SafeAreaView className='flex-1'>
            <Text> This is price field</Text>
            <InputField label='Title' defaultValue={form.title} onChangeText={(value) => setForm( {...form, title: value})}/>
            <PriceField defaultValue={form.price} currency='USD' label='Price' onChangeText={(value) => setForm( {...form, price: value})}/>

            <CustomButton title='Post Listing' onPress={()=>{ console.log(form) }}></CustomButton> 
            </SafeAreaView>
	)
};

export default FavListings;