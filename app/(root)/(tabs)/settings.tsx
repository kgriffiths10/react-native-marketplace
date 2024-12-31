import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dimensions } from 'react-native';
import { Settings2 } from '@/lib/icons';
import { SignOutButton } from "@/components/SignOutButton";

const Settings = () => {
    return (
        <SafeAreaView className="bg-white flex-1 p-4">
            <SignOutButton />
            
        </SafeAreaView>
    );
};

export default Settings;