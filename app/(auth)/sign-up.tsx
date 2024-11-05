import InputField from '@/components/InputField';
import { Alert, Image, KeyboardAvoidingView, Platform, Text, TouchableOpacity, View, } from 'react-native';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRef, useState } from 'react';
import { Link, router } from 'expo-router';
import CustomButton from '@/components/CustomButton';
import Swiper from 'react-native-swiper';
import OAuth from '@/components/OAuth';
import { useSignUp } from '@clerk/clerk-expo';
import { error } from 'console';
import { ReactNativeModal } from "react-native-modal";
import { CircleCheck, Lock } from 'lucide-react-native';


const SignUp = () => {
    const { isLoaded, signUp, setActive } = useSignUp();
    const [showSuccessModal, setShowSuccessModal] = useState(false);


    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });

    const [ verification, setVerification ] = useState({
        state: 'default',
        error: '',
        code: '',
    });

    const onSignUpPress = async () => {
        if (!isLoaded) {
          return
        }
        try {
            await signUp.create({ emailAddress: form.email, password: form.password, });
            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
            setVerification({ ...verification, state: 'pending' });

        } catch (err: any) {
            // See https://clerk.com/docs/custom-flows/error-handling
            // for more info on error handling
            Alert.alert('Error', err.errors[0].longMessage);
        }
    }
    
    const onPressVerify = async () => {
        if (!isLoaded) {
          return;
        }
    
        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification({ code: verification.code, })
        
            if (completeSignUp.status === 'complete') {
                // TODO: Create a database user
                await setActive({ session: completeSignUp.createdSessionId })
                setVerification({ ...verification, state: 'success' });
            } else {
                setVerification({ ...verification, state: 'failed', error: 'Verification failed.' });
            }
        } catch (err: any) {
            setVerification({ ...verification, state: 'failed', error: err.errors[0].longMessage });

        }
    }
    

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView>
                <View className='mt-24'>  
                    <View>
                        {/* Add image? */}
                        <Text className='text-2xl text-gray-900 font-PoppinsSemiBold text-center mt-16 mb-8'>Create an Account</Text>
                    </View>
                    {/* Form */}
                
                    <View className='px-4 flex mb-4'>
                        <InputField label='' placeholder='First Name' value={form.firstName} onChangeText={(value) => setForm( {...form, firstName: value})}/>
                        <InputField label='' placeholder='Last Name' value={form.lastName} onChangeText={(value) => setForm( {...form, lastName: value})}/>
                        <InputField label='' placeholder='Email' value={form.email} onChangeText={(value) => setForm( {...form, email: value})}/>
                        <InputField label='' placeholder='Password' value={form.password} onChangeText={(value) => setForm( {...form, password: value})} secureTextEntry={true}/>

                        <CustomButton title='Sign Up' onPress={onSignUpPress} className='mt-4 w-full' />
                        
                        <OAuth />

                        <Link href='/sign-in' className='text-md mt-4 mb-4'>
                            <Text className='text-center text-gray-500 mt-4'>Already have an account? </Text>
                            <Text className='text-center text-primary-400 font-PoppinsSemiBold'>Log In</Text>
                        </Link>
                    </View>

                    {/* Verification Code Model*/}
                    <ReactNativeModal isVisible={verification.state === 'pending'} 
                        onModalHide={() => {
                            if(verification.state === 'success') setShowSuccessModal(true);
                        }}
                    >
                            <View className='bg-gray-100 px-8 py-8 rounded-2xl min-h-[300px] items-center justify-center'>
                                <Text className='text-2xl font-PoppinsSemiBold text-gray-900 mt-4'>Verification Code</Text>
                                <Text className='text-sm font-PoppinsRegular text-gray-400 text-center mb-8'>Please enter the verification code sent to {form.email}.</Text>
                                <InputField label='' icon={Lock} placeholder='12345' value={verification.code} keyboardType='numeric' onChangeText={(code) => setVerification( {...verification, code: code})}/>
                                {verification.error && (
                                    <Text className='text-sm font-PoppinsRegular text-red-500 text-center mt-4'>{verification.error}</Text>
                                )}
                                <CustomButton title='Verify Email' onPress={onPressVerify} className='mt-4 w-full bg-success-500' />

                            </View>
                    </ReactNativeModal>
                    {/* Verified Model*/}
                    <ReactNativeModal isVisible={showSuccessModal}>
                            <View className='bg-gray-100 px-8 py-8 rounded-2xl min-h-[300px] items-center justify-center'>
                                <CircleCheck size={48} className=' text-success-500'/>
                                <Text className='text-2xl font-PoppinsSemiBold text-gray-900 mt-4'>Verified</Text>
                                <Text className='text-sm font-PoppinsRegular text-gray-400 text-center mt-4'>You have successfully verified your account.</Text>
                                <CustomButton title='Continue' onPress={() => {
                                    setShowSuccessModal(false);
                                    router.push('/(root)/(tabs)/marketplace');
                                }} className='mt-4 w-full' />

                            </View>
                    </ReactNativeModal>


                </View>
            </ScrollView>

        </KeyboardAvoidingView>
    );
}

export default SignUp;