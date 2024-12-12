import CustomButton from "@/components/CustomButton";
import InputField from "@/components/Form/InputField";
import OAuth from "@/components/OAuth";
import { useSignIn } from "@clerk/clerk-expo";
import { Link, router, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";

const SignIn = () => {
    
    const { signIn, setActive, isLoaded } = useSignIn();
    const router = useRouter();

    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const onSignInPress = useCallback(async () => {
        if (!isLoaded) {
          return
        }
        try {
          const signInAttempt = await signIn.create({
            identifier: form.email, 
            password: form.password,
          })
    
          if (signInAttempt.status === 'complete') {
            await setActive({ session: signInAttempt.createdSessionId })
            router.replace('/')
          } else {
            // See https://clerk.com/docs/custom-flows/error-handling
            // for more info on error handling
            console.error(JSON.stringify(signInAttempt, null, 2))
          }
        } catch (err: any) {
          console.error(JSON.stringify(err, null, 2))
        }
      }, [isLoaded, form.email, form.password])

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView>
                <View className='mt-24'>  
                    <View>
                        {/* Add image? */}
                        <Text className='text-2xl text-gray-900 font-PoppinsSemiBold text-center mt-16 mb-8'>Welcome Back</Text>
                    </View>
                    {/* Form */}
                
                    <View className='px-4 flex mb-4'>
                        <InputField label='' placeholder='Email' value={form.email} onChangeText={(value) => setForm( {...form, email: value})}/>
                        <InputField label='' placeholder='Password' value={form.password} onChangeText={(value) => setForm( {...form, password: value})} secureTextEntry={true}/>

                        <CustomButton title='Log In' onPress={onSignInPress} className='mt-4 w-full' /> 
                        
                        <OAuth />

                        <Link href='/sign-up' className='text-md mt-4 mb-4'>
                            <Text className='text-center text-gray-500 mt-4'>Don't have an account? </Text>
                            <Text className='text-center text-primary-400 font-PoppinsSemiBold'>Sign Up</Text>
                        </Link>
                    </View>
                </View>
                

            </ScrollView>

        </KeyboardAvoidingView>
    );

}

export default SignIn;